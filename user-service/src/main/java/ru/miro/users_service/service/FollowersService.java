package ru.miro.users_service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.miro.users_service.exception.FollowerNotCreatedException;
import ru.miro.users_service.exception.FollowerNotFoundException;
import ru.miro.users_service.exception.FollowerNotUnfollowed;
import ru.miro.users_service.model.Follower;
import ru.miro.users_service.model.User;
import ru.miro.users_service.repository.FollowersRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class FollowersService {

    private final FollowersRepository followersRepository;
    private final UsersService usersService;

    public void save(long from, long to) {
        User fromUser = usersService.findOne(from);
        User toUser = usersService.findOne(to);

        Follower follower = Follower.builder()
                .from(fromUser)
                .to(toUser)
                .build();

        Optional<Follower> getFollower = followersRepository.findByFromAndTo(fromUser, toUser);
        if (getFollower.isPresent()) {
            throw new FollowerNotCreatedException(from, to);
        }

        followersRepository.save(follower);
    }

    public void unfollow(long from, long to) {
        User fromUser = usersService.findOne(from);
        User toUser = usersService.findOne(to);

        Optional<Follower> getFollower = followersRepository.findByFromAndTo(fromUser, toUser);
        if (getFollower.isEmpty()) {
            throw new FollowerNotUnfollowed(from, to);
        }

        followersRepository.delete(getFollower.get());
    }

    public void unfollow(long followerId) {
        if (followersRepository.findById(followerId).isEmpty()) {
            throw new FollowerNotFoundException(followerId);
        }

        followersRepository.deleteById(followerId);
    }

}
