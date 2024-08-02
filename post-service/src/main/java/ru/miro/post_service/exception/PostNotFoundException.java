package ru.miro.post_service.exception;

public class PostNotFoundException extends RuntimeException {

    public PostNotFoundException(Long id) {
        super("Post with id=" + id + " is not found");
    }

}
