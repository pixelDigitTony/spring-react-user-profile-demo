package uy.anthony.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class SpringReactUserProfileDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringReactUserProfileDemoApplication.class, args);
    }

}
