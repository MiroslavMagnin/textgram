package ru.miro.user_service.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "followers")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Follower implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_id")
    private Long followId;

    @ManyToOne()
    @JoinColumn(name = "from_user")
    @JsonIgnoreProperties(value = {"password", "followers", "following", "createdAt", "updatedAt", "role", "birthDate"})
    private User from;

    @ManyToOne()
    @JoinColumn(name = "to_user")
    @JsonIgnoreProperties(value = {"password", "followers", "following", "createdAt", "updatedAt", "role", "birthDate"})
    private User to;

}
