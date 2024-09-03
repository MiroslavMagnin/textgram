package ru.miro.user_service.exception;

public class FollowerNotCreatedException extends RuntimeException {

    public FollowerNotCreatedException(long fromUser, long toUser) {
        super("The user with id=" + fromUser + " hasn't followed user with id=" + toUser +
                ". Maybe he already follows him");
    }

}
