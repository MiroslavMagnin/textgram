package ru.miro.user_service.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import ru.miro.user_service.dto.UserDTO;
import ru.miro.user_service.exception.UserNotCreatedException;
import ru.miro.user_service.model.Follower;
import ru.miro.user_service.model.Response;
import ru.miro.user_service.model.User;
import ru.miro.user_service.service.FollowersService;
import ru.miro.user_service.service.UsersService;
import ru.miro.user_service.util.UserDTOValidator;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UsersController {

    private final UsersService usersService;
    private final UserDTOValidator userDTOValidator;
    private final FollowersService followersService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<User> getUsers() {
        return usersService.findAll();
    }

    @GetMapping("/get-user-by-id/{id}")
    @ResponseStatus(HttpStatus.OK)
    public User getUser(@PathVariable("id") long id) {
        return usersService.findOne(id);
    }

    @GetMapping("/get-user-by-email/{email}")
    @ResponseStatus(HttpStatus.OK)
    public User getUserByEmail(@PathVariable("email") String email) {
        return usersService.findOne(email);
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public HttpStatus createUser(@RequestBody @Valid UserDTO userDTO, BindingResult bindingResult) {
        userDTOValidator.validate(userDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            StringBuilder errorMessage = new StringBuilder();
            List<FieldError> errors = bindingResult.getFieldErrors();
            for (FieldError error : errors) {
                errorMessage
                        .append(error.getField())
                        .append(" - ")
                        .append(error.getDefaultMessage())
                        .append("; ");
            }

            throw new UserNotCreatedException(errorMessage.toString());
        }

        usersService.save(userDTO);
        return HttpStatus.CREATED;
    }

    @PatchMapping("/{id}/update")
    @ResponseStatus(HttpStatus.OK)
    public HttpStatus updateUser(@PathVariable("id") long id,
                                 @RequestBody UserDTO userDTO) {
        usersService.update(id, userDTO);
        return HttpStatus.OK;
    }

    @DeleteMapping("/{id}/delete")
    @ResponseStatus(HttpStatus.OK)
    public HttpStatus deleteUser(@PathVariable("id") long id) {
        usersService.delete(id);
        return HttpStatus.OK;
    }

    @GetMapping("/get-followers/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<Follower> getFollowers(@PathVariable long id) {
        return usersService.findOne(id).getFollowers();
    }

    @GetMapping("/get-following/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<Follower> getFollowing(@PathVariable long id) {
        return usersService.findOne(id).getFollowing();
    }

    @GetMapping("/is-follower")
    @ResponseStatus(HttpStatus.OK)
    public Response isFollower(@RequestParam("from") long from, @RequestParam("to") long to) {
        return followersService.isFollower(from, to);
    }

    @PostMapping("/follow")
    @ResponseStatus(HttpStatus.OK)
    public HttpStatus follow(@RequestParam("from") long from, @RequestParam("to") long to) {
        followersService.save(from, to);
        return HttpStatus.OK;
    }

    @DeleteMapping("/unfollow")
    @ResponseStatus(HttpStatus.OK)
    public HttpStatus unfollow(@RequestParam("from") long from, @RequestParam("to") long to) {
        followersService.unfollow(from, to);
        return HttpStatus.OK;
    }

    @DeleteMapping("/unfollow-by-follower-id")
    @ResponseStatus(HttpStatus.OK)
    public HttpStatus unfollowByFollowerId(@RequestParam("followerId") long followerId) {
        followersService.unfollow(followerId);
        return HttpStatus.OK;
    }

}
