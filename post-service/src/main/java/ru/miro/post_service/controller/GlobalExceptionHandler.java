package ru.miro.post_service.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.miro.post_service.exception.ExceptionResponse;
import ru.miro.post_service.exception.PostNotCreatedException;
import ru.miro.post_service.exception.PostNotFoundException;
import ru.miro.post_service.exception.PostNotUpdatedException;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ExceptionResponse> catchPostNotFoundException(PostNotFoundException e) {
        log.error(e.getMessage());
        return new ResponseEntity<>(new ExceptionResponse(e.getMessage(), System.currentTimeMillis()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionResponse> catchPostNotCreatedException(PostNotCreatedException e) {
        log.error(e.getMessage());
        return new ResponseEntity<>(new ExceptionResponse(e.getMessage(), System.currentTimeMillis()), HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler
    public ResponseEntity<ExceptionResponse> catchPostNotUpdatedException(PostNotUpdatedException e) {
        log.error(e.getMessage());
        return new ResponseEntity<>(new ExceptionResponse(e.getMessage(), System.currentTimeMillis()), HttpStatus.NOT_ACCEPTABLE);
    }

}
