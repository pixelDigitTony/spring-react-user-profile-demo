package uy.anthony.demo.domain.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import uy.anthony.demo.domain.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
}
