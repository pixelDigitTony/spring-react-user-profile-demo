package uy.anthony.demo.domain.repo;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import uy.anthony.demo.SpringBaseTest;
import uy.anthony.demo.domain.model.User;

import static org.junit.jupiter.api.Assertions.*;

class UserRepositoryTest extends SpringBaseTest {

    @Autowired
    UserRepository userRepository;
    User user;

    @BeforeAll
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
        userRepository.addUser(user);
    }
}