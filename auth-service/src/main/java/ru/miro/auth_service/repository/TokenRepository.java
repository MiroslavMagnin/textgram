package ru.miro.auth_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.miro.auth_service.model.Token;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {


    List<Token> findTokenByUserId(Long id);

    Optional<Token> findByToken(String token);

}