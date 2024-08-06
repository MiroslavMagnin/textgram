package ru.miro.users_service.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.miro.users_service.model.Follower;
import ru.miro.users_service.model.User;
import ru.miro.users_service.repository.FollowersRepository;

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

        followersRepository.save(follower);
    }

}
