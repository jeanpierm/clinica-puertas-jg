package com.jm.clinica_puertas_jg_api.user;

import com.jm.clinica_puertas_jg_api.exception.ConflictException;
import com.jm.clinica_puertas_jg_api.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User with id '" + id + "' not found"));
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User with username '" + username + "' not found"));
    }

    /**
     * Create a new user.
     * The password is encrypted.
     *
     * @throws ConflictException if the username or email is already in use
     */
    public User create(User user) {
        validateUsernameIsNotRegistered(user.getUsername());
        validateEmailIsNotRegistered(user.getEmail());

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User createdUser = userRepository.save(user);
        log.info("Created user with username {}", createdUser.getUsername());
        return createdUser;
    }

    @Transactional
    public void updateById(Long id, User user) {
        User userEntity = findById(id);
        if (StringUtils.hasText(user.getName()))
            userEntity.setName(user.getName());
        if (StringUtils.hasText(user.getSurname()))
            userEntity.setSurname(user.getSurname());
        if (StringUtils.hasText(user.getEmail()))
            userEntity.setEmail(user.getEmail());
        if (StringUtils.hasText(user.getPassword()))
            userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        if (!user.getRoles().isEmpty())
            userEntity.setRoles(user.getRoles());

        log.info("Updated user with username {}", userEntity.getUsername());
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
        log.info("Deleted user with id '{}'", id);
    }

    public void validateEmailIsNotRegistered(String email) {
        if (userRepository.existsByEmail(email))
            throw new ConflictException("Email is already in use");
    }

    public void validateUsernameIsNotRegistered(String username) {
        if (userRepository.existsByUsername(username))
            throw new ConflictException("Username is already in use");
    }
}
