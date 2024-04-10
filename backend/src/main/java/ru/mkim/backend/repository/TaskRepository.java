package ru.mkim.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.mkim.backend.model.Task;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Transactional
    @Modifying
    @Query(value = "UPDATE task SET user_id = ?2, status = ?3 WHERE id = ?1", nativeQuery = true)
    void updateUserAndStatusById(Long taskId, long userId, String taskStatus);

    @Query(value = "SELECT * FROM task WHERE user_id=?1", nativeQuery = true)
    List<Task> findAllByUserId(Long userId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE task SET status = ?2 WHERE id = ?1", nativeQuery = true)
    void updateStatusById(Long taskId, String status);
}
