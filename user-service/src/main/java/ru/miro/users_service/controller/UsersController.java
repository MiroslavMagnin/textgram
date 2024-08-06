package ru.miro.users_service.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import ru.miro.users_service.dto.UserDTO;
import ru.miro.users_service.exception.UserNotCreatedException;
import ru.miro.users_service.model.Follower;
import ru.miro.users_service.model.User;
import ru.miro.users_service.service.FollowersService;
import ru.miro.users_service.service.UsersService;
import ru.miro.users_service.util.UserDTOValidator;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UsersController {

    private final UsersService usersService;
    private final UserDTOValidator userDTOValidator;
    private final FollowersService followersService;

    @GetMapping
    @ResponseStatus(HttpStatus.FOUND)
    public List<User> getUsers() {
        return usersService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.FOUND)
    public User getUser(@PathVariable("id") long id) {
        return usersService.findOne(id);
    }

    @GetMapping("/getUserByEmail/{email}")
    @ResponseStatus(HttpStatus.FOUND)
    public User getUser(@PathVariable("email") String email) {
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
    @ResponseStatus(HttpStatus.FOUND)
    public List<Follower> getFollowers(@PathVariable long id) {
        return usersService.findOne(id).getFollowers();
    }

    @GetMapping("/get-following/{id}")
    @ResponseStatus(HttpStatus.FOUND)
    public List<Follower> getFollowing(@PathVariable long id) {
        return usersService.findOne(id).getFollowing();
    }

    @PostMapping("/follow")
    @ResponseStatus(HttpStatus.OK)
    public HttpStatus follow(@RequestParam("from") long from, @RequestParam("to") long to) {
        followersService.save(from, to);
        return HttpStatus.OK;
    }

}
