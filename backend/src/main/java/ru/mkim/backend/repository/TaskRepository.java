package ru.mkim.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.mkim.backend.model.Task;
import ru.mkim.backend.model.TaskStatus;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Transactional
    @Modifying
    @Query(value = "UPDATE task SET user_id=?2 task_status=?3 WHERE id=?1", nativeQuery = true)
    void update(long taskId, long userId, TaskStatus status);
}
