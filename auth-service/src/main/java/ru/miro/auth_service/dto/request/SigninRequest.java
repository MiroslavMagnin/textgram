package ru.miro.auth_service.dto.request;

import lombok.Getter;

@Getter
public class SigninRequest {

    private String email;

    private String password;

}
