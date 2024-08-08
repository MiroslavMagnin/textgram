package ru.miro.auth_service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.miro.auth_service.client.UsersServiceClient;
import ru.miro.auth_service.dto.UserDTO;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UsersServiceClient usersServiceClient;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        ResponseEntity<UserDTO> response = usersServiceClient.getUserByEmail(username);

        // Логируем статус ответа и его тело
        System.out.println("Response Status: " + response.getStatusCode());
        System.out.println("Response Body: " + response.getBody());

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            return new CustomUserDetails(response.getBody());
        } else {
            // Обработка ошибок (например выброс исключения
            throw new RuntimeException("Failed to fetch user: " + response.getStatusCode());
        }

//        var user = usersServiceClient.getUserByEmail(username).getBody();
//        assert user != null;
//        return new CustomUserDetails(user);
    }
}
