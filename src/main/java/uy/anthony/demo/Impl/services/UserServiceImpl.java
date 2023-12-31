package uy.anthony.demo.Impl.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uy.anthony.demo.domain.model.User;
import uy.anthony.demo.domain.repo.UserRepository;
import uy.anthony.demo.domain.services.UserService;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }
        user.get().setIsEnabled(true);
        user.get().setIsAccountNonExpired(true);
        user.get().setIsAccountNonLocked(true);
        user.get().setIsCredentialsNonExpired(true);

        return user.get();
    }

    @Override
    public void register(User user) throws Exception {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Optional<User> userOptional = userRepository.findByEmail(user.getEmail());
        user.setIsAccountNonExpired(true);
        user.setIsAccountNonLocked(true);
        user.setIsCredentialsNonExpired(true);
        user.setIsEnabled(true);
        if (userOptional.isPresent()) {
            throw new Exception("User already exists");
        }
        userRepository.save(user);
        Optional<User> registeredUser = userRepository.findByEmail(user.getEmail());
        if (registeredUser.isEmpty()) {
            throw new Exception("User not registered");
        }
    }
}
