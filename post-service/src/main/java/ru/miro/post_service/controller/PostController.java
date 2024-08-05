package ru.miro.post_service.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import ru.miro.post_service.dto.PostDTO;
import ru.miro.post_service.exception.PostNotCreatedException;
import ru.miro.post_service.exception.PostNotUpdatedException;
import ru.miro.post_service.service.PostService;

import java.util.List;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<PostDTO> findAll() {
        return postService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.FOUND)
    public PostDTO findOne(@PathVariable("id") Long postId) {
        return postService.findOne(postId);
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public HttpStatus create(@RequestBody PostDTO postDTO, BindingResult bindingResult) {
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
        log.info("Created a new post: " + postDTO.toString());
        return HttpStatus.CREATED;
    }

    @PatchMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public HttpStatus update(@RequestBody PostDTO postDTO, BindingResult bindingResult) {
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
        log.info("Updated the post: " + postDTO.toString());
        return HttpStatus.OK;
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public HttpStatus delete(@PathVariable("id") Long postId) {
        postService.delete(postId);
        return HttpStatus.OK;
    }

}
