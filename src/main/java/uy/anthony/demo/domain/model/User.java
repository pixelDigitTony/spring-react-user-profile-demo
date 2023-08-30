package uy.anthony.demo.domain.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String username;
    private String password;
    private String email;
    private String address;
    private String profilePicture;
    private List<Role> role;

    private class Role {
        private String name;
        private String description;
    }
}
