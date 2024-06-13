#!/bin/bash

PROJECT_DIR=~/URS

rebuild_backend() {
    echo "Starting backend build..."
    cd $PROJECT_DIR/backend || { echo "Failed to navigate to backend directory"; exit 1; }
    
    echo "Removing target directory..."
    rm -rf target
    
    echo "Running Maven clean package..."
    mvn clean package
    
    if [ $? -eq 0 ]; then
        echo "Backend build completed successfully."
    else
        echo "Backend build failed." >&2
        exit 1
    fi
}

copy_frontend_to_nginx() {
    echo "Starting frontend deployment..."
    cd $PROJECT_DIR/frontend || { echo "Failed to navigate to frontend directory"; exit 1; }
    
    echo "Copying build to /usr/share/nginx/html/..."
    sudo cp -r build/ /usr/share/nginx/html/
    
    if [ $? -eq 0 ]; then
        echo "Frontend copied successfully."
    else
        echo "Failed to copy frontend." >&2
        exit 1
    fi
    
    echo "Restarting nginx service..."
    sudo service nginx restart
    
    if [ $? -eq 0 ]; then
        echo "Nginx restarted successfully."
    else
        echo "Failed to restart nginx." >&2
        exit 1
    fi
}

rebuild_docker() {
    echo "Starting Docker deployment..."
    cd $PROJECT_DIR/docker || { echo "Failed to navigate to docker directory"; exit 1; }
    
    echo "Stopping existing Docker containers..."
    docker-compose down
    
    echo "Rebuilding and starting Docker containers..."
    docker-compose up --build -d
    
    if [ $? -eq 0 ]; then
        echo "Docker containers deployed successfully."
    else
        echo "Failed to deploy Docker containers." >&2
        exit 1
    fi
}

deploy() {
    echo "Deployment started..."
    rebuild_backend
    copy_frontend_to_nginx
    rebuild_docker
    echo "Deployment completed successfully."
}

deploy
