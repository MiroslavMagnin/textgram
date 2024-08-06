package ru.miro.users_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.miro.users_service.model.Follower;
import ru.miro.users_service.model.User;

import java.util.Optional;

@Repository
public interface FollowersRepository extends JpaRepository<Follower, Long> {

    Optional<Follower> findByFromAndTo(User from, User to);

}
