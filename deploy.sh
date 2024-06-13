#!/usr/bin/bash

PROJECT_DIR=~/URS
LOG_DIR=$PROJECT_DIR/logs
LOG_FILE=$LOG_DIR/deploy.log

mkdir -p $LOG_DIR
: > $LOG_FILE  # Очищаем лог-файл перед началом

log() {
    local message=$1
    echo "========== $(date +'%Y-%m-%d %H:%M:%S') - $message ==========" | tee -a $LOG_FILE
}

rebuild_backend() {
    log "Starting backend build"
    cd $PROJECT_DIR/backend || { log "Failed to navigate to backend directory"; exit 1; }

    log "Removing target directory"
    rm -rf target

    log "Running Maven clean package"
    mvn clean package 2>&1 | tee -a $LOG_FILE

    if [ ${PIPESTATUS[0]} -eq 0 ]; then
        log "Backend build completed successfully"
    else
        log "Backend build failed" >&2
        exit 1
    fi
}

copy_frontend_to_nginx() {
    log "Starting frontend deployment"
    cd $PROJECT_DIR/frontend || { log "Failed to navigate to frontend directory"; exit 1; }

    log "Copying build to /usr/share/nginx/html"
    sudo cp -r build/ /usr/share/nginx/html/ 2>&1 | tee -a $LOG_FILE

    if [ ${PIPESTATUS[0]} -eq 0 ]; then
        log "Frontend copied successfully"
    else
        log "Failed to copy frontend" >&2
        exit 1
    fi

    log "Restarting nginx service"
    sudo service nginx restart 2>&1 | tee -a $LOG_FILE

    if [ ${PIPESTATUS[0]} -eq 0 ]; then
        log "Nginx restarted successfully"
    else
        log "Failed to restart nginx" >&2
        exit 1
    fi
}

rebuild_docker() {
    log "Starting Docker deployment"
    cd $PROJECT_DIR/docker || { log "Failed to navigate to docker directory"; exit 1; }

    log "Stopping existing Docker containers"
    docker-compose down 2>&1 | tee -a $LOG_FILE

    log "Rebuilding and starting Docker containers"
    docker-compose up --build -d 2>&1 | tee -a $LOG_FILE

    if [ ${PIPESTATUS[0]} -eq 0 ]; then
        log "Docker containers deployed successfully"
    else
        log "Failed to deploy Docker containers" >&2
        exit 1
    fi
}

deploy() {
    log "Deployment started"
    rebuild_backend
    copy_frontend_to_nginx
    rebuild_docker
    log "Deployment completed successfully"
}

deploy
