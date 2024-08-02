package ru.miro.post_service.exception;

public class PostNotCreatedException extends RuntimeException {

    public PostNotCreatedException() {
        super("Post is not created");
    }

    public PostNotCreatedException(String message) {
        super(message);
    }

}
