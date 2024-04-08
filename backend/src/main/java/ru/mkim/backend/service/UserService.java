package ru.mkim.backend.service;

import org.springframework.stereotype.Service;
import ru.mkim.backend.form.UserCredentials;
import ru.mkim.backend.model.User;
import ru.mkim.backend.repository.UserRepository;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByLoginAndPassword(String login, String password) {
        return login == null || password == null ? null : userRepository.findByLoginAndPassword(login, password);
    }

    public User findById(Long id) {
        return id == null ? null : userRepository.findById(id).orElse(null);
    }

    public boolean isLoginVacant(String login) {
        return userRepository.countByLogin(login) == 0;
    }

    public boolean isPhoneNumberVacant(String phoneNumber) {
        return userRepository.countByPhoneNumber(phoneNumber) == 0;
    }

    public void register(UserCredentials credentials) {
        User user = new User();

        user.setName(credentials.getName());
        user.setLogin(credentials.getLogin());
        user.setPhoneNumber(credentials.getPhoneNumber());

        userRepository.save(user);
        userRepository.updatePasswordSha(user.getId(), user.getLogin(), credentials.getPassword());
    }

    public void updateUserSettingsById(long userId, UserCredentials userCredentials) {
        String phoneNumber = userCredentials.getPhoneNumber();
        String name = userCredentials.getName();
        String about = userCredentials.getAbout();

        if (phoneNumber != null && !phoneNumber.isBlank()) {
            userRepository.updatePhoneNumber(userId, phoneNumber);
        }

        if (name != null && !name.isBlank()) {
            userRepository.updateUserName(userId, name);
        }

        if (about != null && !about.isBlank()) {
            userRepository.updateAbout(userId, about);
        }
    }

    public User findUserByLogin(String login) {
        return userRepository.findByLogin(login);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
}
