package ru.miro.post_service.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import ru.miro.post_service.client.UserClient;
import ru.miro.post_service.dto.PostDTO;
import ru.miro.post_service.model.User;
import ru.miro.post_service.exception.PostNotCreatedException;
import ru.miro.post_service.exception.PostNotUpdatedException;
import ru.miro.post_service.model.Follower;
import ru.miro.post_service.service.PostService;

import java.util.List;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final UserClient userClient;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<PostDTO> findAll() {
        return postService.findAll();
    }

    @GetMapping("/get-post-by-id/{id}")
    @ResponseStatus(HttpStatus.FOUND)
    public PostDTO findOne(@PathVariable("id") Long postId) {
        return postService.findOne(postId);
    }

    @GetMapping("/get-following-posts/{id}")
    public void findAllFollowingPosts(@PathVariable("id") Long userId) { // return List<PostDTO>
        User user = userClient.getUserById(userId);

        System.out.println(user.toString());
        List<Follower> following = user.getFollowing();
        following.forEach(i -> System.out.println(i.getTo()));

    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public HttpStatus create(@Valid @RequestBody PostDTO postDTO, BindingResult bindingResult) {
        // If the postDTO contains errors, make the error message and throw not created exception
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

            throw new PostNotCreatedException(errorMessage.toString());
        }

        postService.create(postDTO);
        return HttpStatus.CREATED;
    }

    @PatchMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public HttpStatus update(@Valid @RequestBody PostDTO postDTO, BindingResult bindingResult) {
        // If the postDTO contains errors, make the error message and throw not updated exception
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

            throw new PostNotUpdatedException(errorMessage.toString());
        }

        postService.update(postDTO);
        return HttpStatus.OK;
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public HttpStatus delete(@PathVariable("id") Long postId) {
        postService.delete(postId);
        return HttpStatus.OK;
    }

}
