package ru.miro.users_service.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import ru.miro.users_service.service.CustomUserDetails;
import ru.miro.users_service.service.UsersService;

@Configuration
@RequiredArgsConstructor
public class AppConfig {

    private final UsersService usersService;

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> new CustomUserDetails(usersService.findOne(username));
    }

}