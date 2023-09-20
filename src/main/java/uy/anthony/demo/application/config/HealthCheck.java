package uy.anthony.demo.application.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;
import uy.anthony.demo.domain.model.User;
import uy.anthony.demo.domain.repo.UserRepository;

import java.util.List;

@Component("profileHealthCheck")
public class HealthCheck implements HealthIndicator {
    @Autowired
    UserRepository userRepository;

    @Override
    public Health health() {
        List<User> users = userRepository.findAll();
        if(users.isEmpty()){
            return Health.down().withDetail("Can't fetch Users: ", users).build();
        }
        return Health.up().build();
    }
}
