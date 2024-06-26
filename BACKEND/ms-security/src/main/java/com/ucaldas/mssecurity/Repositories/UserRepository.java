package com.ucaldas.mssecurity.Repositories;

import com.ucaldas.mssecurity.Models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository <User, String> {

    @Query ("{'email': ?0}")
    public User getUsersByEmail(String email);

    @Query ("{'_id': ?0}")
    public User getUsersById(String idUser);
}
