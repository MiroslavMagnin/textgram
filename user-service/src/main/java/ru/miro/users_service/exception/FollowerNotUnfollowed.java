package ru.miro.users_service.exception;

public class FollowerNotUnfollowed extends RuntimeException {

    public FollowerNotUnfollowed(long fromUser, long toUser) {
        super("The user with id=" + fromUser + "hasn't unfollowed user with id=" + toUser +
                ". Maybe he hasn't followed him yet");
    }

}
