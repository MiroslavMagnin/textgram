package ru.miro.post_service.exception;

public class PostNotUpdatedException extends RuntimeException {

    public PostNotUpdatedException() {
        super("Post is not updated");
    }

    public PostNotUpdatedException(String message) {
        super(message);
    }

}
