package ru.miro.users_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.miro.users_service.model.Token;

import java.util.Optional;

@FeignClient(name = "auth-service", url = "http://auth:8090")
public interface TokenClient {

    @GetMapping("/auth/token")
    Optional<Token> getToken(@RequestParam String token);

}
