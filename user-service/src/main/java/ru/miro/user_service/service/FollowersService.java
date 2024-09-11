package ru.miro.user_service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import ru.miro.user_service.exception.FollowerNotCreatedException;
import ru.miro.user_service.exception.FollowerNotFoundException;
import ru.miro.user_service.exception.FollowerNotUnfollowed;
import ru.miro.user_service.model.Follower;
import ru.miro.user_service.model.Response;
import ru.miro.user_service.model.User;
import ru.miro.user_service.repository.FollowersRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class FollowersService {

    private final FollowersRepository followersRepository;
    private final UsersService usersService;

    @CacheEvict(cacheNames = "users", allEntries = true)
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

    @Cacheable(cacheNames = "follow", key = "#from")
    public Response isFollower(long from, long to) {
        User fromUser = usersService.findOne(from);
        User toUser = usersService.findOne(to);

        Optional<Follower> getFollower = followersRepository.findByFromAndTo(fromUser, toUser);

        Response response = new Response(getFollower.isEmpty() ? "The user with userId=" +
                from + " doesn't follow to the userId=" + to : "The user with userId=" + from +
                " follows the userId=" + to, System.currentTimeMillis());

        return response;
    }

    @CacheEvict(cacheNames = "users", allEntries = true)
    public void unfollow(long from, long to) {
        User fromUser = usersService.findOne(from);
        User toUser = usersService.findOne(to);

        Optional<Follower> getFollower = followersRepository.findByFromAndTo(fromUser, toUser);
        if (getFollower.isEmpty()) {
            throw new FollowerNotUnfollowed(from, to);
        }

        followersRepository.delete(getFollower.get());
    }

    @CacheEvict(cacheNames = "users", allEntries = true)
    public void unfollow(long followerId) {
        if (followersRepository.findById(followerId).isEmpty()) {
            throw new FollowerNotFoundException(followerId);
        }

        followersRepository.deleteById(followerId);
    }

}
