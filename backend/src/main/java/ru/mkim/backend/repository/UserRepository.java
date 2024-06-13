package ru.mkim.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.mkim.backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Transactional
    @Modifying
    @Query(value = "UPDATE user SET password_sha=SHA1(CONCAT('10D567885A29697BB402EBD176FB5910CB2293C000C9B2F08935A90A75B9FCF5', ?2, ?3)) WHERE id=?1", nativeQuery = true)
    void updatePasswordSha(long id, String login, String password);

    @Query(value = "SELECT * FROM user WHERE login=?1 AND password_sha=SHA1(CONCAT('10D567885A29697BB402EBD176FB5910CB2293C000C9B2F08935A90A75B9FCF5', ?1, ?2))", nativeQuery = true)
    User findByLoginAndPassword(String login, String password);

    int countByLogin(String login);

    int countByPhoneNumber(String phoneNumber);

    User findByLogin(String login);

    @Transactional
    @Modifying
    @Query(value = "UPDATE user SET phone_number=?2 WHERE id=?1", nativeQuery = true)
    void updatePhoneNumber(long id, String phoneNumber);

    @Transactional
    @Modifying
    @Query(value = "UPDATE user SET name=?2 WHERE id=?1", nativeQuery = true)
    void updateUserName(long userId, String name);

    @Transactional
    @Modifying
    @Query(value = "UPDATE user SET certificates=?2 WHERE id=?1", nativeQuery = true)
    void updateCertificates(long userId, String certificates);
}
