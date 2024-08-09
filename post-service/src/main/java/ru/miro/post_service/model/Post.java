package ru.miro.post_service.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "posts")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "The text of the post shouldn't be null")
    @NotEmpty(message = "The text of the post shouldn't be empty")
    @Size(max = 1000, message = "The max length of the text is 1000 symbols")
    private String text; // Content of the post

    @NotNull(message = "The author of the post shouldn't be null")
    private Long authorId; // The ID of the user, who wrote the post

    private Long createdAt;
    private Long updatedAt;

}
