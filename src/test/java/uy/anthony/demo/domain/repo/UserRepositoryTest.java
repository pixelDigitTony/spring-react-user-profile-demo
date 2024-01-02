package uy.anthony.demo.domain.repo;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import uy.anthony.demo.SpringBaseTest;
import uy.anthony.demo.domain.model.User;

class UserRepositoryTest extends SpringBaseTest {

    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    User user;

    @BeforeEach
     void setUp() {
        user = new User();
    }

    @Test
    void findByUsernameAndPassword() {
    }

    @Test
    void findByUsername() {
    }

    @Test
    void addUser() {
        user.setEmail("raushanah_luomamt@voice.oh");
        user.setAddress("Bottles Road 3942, Kentville, Australia, 586691");
        user.setUsername("Peggy");
        user.setPassword(passwordEncoder.encode("lvG5wVN7z8Q8nMdzx"));
        userRepository.save(user);
    }
}