package ru.miro.post_service.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Follower implements Serializable {

    private Long followId;

    @JsonIgnoreProperties(value = {"password", "followers", "following", "createdAt", "updatedAt", "role", "birthDate"})
    private User from;

    @JsonIgnoreProperties(value = {"password", "followers", "following", "createdAt", "updatedAt", "role", "birthDate"})
    private User to;

}
