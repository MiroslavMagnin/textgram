package ru.miro.users_service.exception;

public class FollowerNotFoundException extends RuntimeException {

    public FollowerNotFoundException(long followerId) {
        super("The follower with id=" + followerId + " not found");
    }

}