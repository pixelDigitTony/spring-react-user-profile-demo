package uy.anthony.demo.application.web;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import uy.anthony.demo.application.config.jwt.JwtUtil;
import uy.anthony.demo.domain.model.User;
import uy.anthony.demo.domain.services.UserService;

@RestController
@RequestMapping("/v1/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/fetch-active")
    public ResponseEntity<User> fetchActiveUser(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(user);
    }

    @PostMapping(value = "/login/auth", consumes = "application/json", produces = "application/json")
    public ResponseEntity<User> loginUser(@RequestBody LoginRequest loginRequest){
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginRequest.email, loginRequest.password));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = (User) authentication.getPrincipal();
            String jwt = jwtUtil.createToken(user);
            user.setToken(jwt);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    public record LoginRequest(@NotEmpty @NotNull String email, @NotEmpty @NotNull String password) {
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new RuntimeException("Already Logged out!");// Clear the security context
        }
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out successfully");
    }

    @PostMapping("/register/create")
    public ResponseEntity<?> register(@RequestBody @Valid User user) {
        try {
            userService.register(user);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
//        try {
//            userRepository.deleteById(id);
//            return ResponseEntity.ok("User deleted successfully");
//        } catch (Exception e) {
//            log.error(e.getMessage());
//            return ResponseEntity.notFound().build();
//        }
//    }

}
