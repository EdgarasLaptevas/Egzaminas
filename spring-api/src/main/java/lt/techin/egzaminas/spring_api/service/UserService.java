package lt.techin.egzaminas.spring_api.service;

import lt.techin.egzaminas.spring_api.exceptions.ApiErrorException;
import lt.techin.egzaminas.spring_api.model.Role;
import lt.techin.egzaminas.spring_api.model.User;
import lt.techin.egzaminas.spring_api.repository.RoleRepository;
import lt.techin.egzaminas.spring_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    public final UserRepository userRepository;
    public final RoleRepository roleRepository;
    public final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User saveUser(User user) {
        Role defaultRole = roleRepository.findByName("ROLE_USER").orElseThrow(() -> new ApiErrorException("Role not found", HttpStatus.NOT_FOUND));

        user.getRoles().add(defaultRole);

        return userRepository.save(user);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findUserById(long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void deleteUserById(long id) {
        userRepository.deleteById(id);
    }

    public boolean userExistsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean verifyAccountPassword(User user, String password) {
        return passwordEncoder.matches(password, user.getPassword());
    }
}
