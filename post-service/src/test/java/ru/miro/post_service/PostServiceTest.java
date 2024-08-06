package ru.miro.post_service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import ru.miro.post_service.dto.PostDTO;
import ru.miro.post_service.exception.PostNotCreatedException;
import ru.miro.post_service.exception.PostNotUpdatedException;
import ru.miro.post_service.service.PostService;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class PostServiceTest {

    @MockBean
    private PostService postService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void findPosts() throws Exception {

        mockMvc.perform(get("/post"))
                .andExpect(status().isOk());

        verify(postService, times(1)).findAll();

    }

    @Test
    void findOnePostById() throws Exception {

        PostDTO postDTO = PostDTO.builder()
                .postId(10L)
                .text("This is the some text. I don't know what to write :))")
                .author(125L)
                .createdAt(System.currentTimeMillis())
                .updatedAt(System.currentTimeMillis())
                .build();

        when(postService.findOne(10L)).thenReturn(postDTO);

        mockMvc.perform(get("/post/{id}", 10L))
                .andExpect(status().isFound())
                .andExpect(jsonPath("$.postId").value(10L))
                .andExpect(jsonPath("$.text").value("This is the some text. I don't know what to write :))"))
                .andExpect(jsonPath("$.author").value(125L));

        verify(postService, times(1)).findOne(10L);

    }

    @Test
    void createNormalPost() throws Exception {

        PostDTO postDTO = PostDTO.builder()
                .postId(10L)
                .text("This is the some text. I don't know what to write :))")
                .author(125L)
                .createdAt(System.currentTimeMillis())
                .updatedAt(System.currentTimeMillis())
                .build();


        String postDTOJSON = objectMapper.writeValueAsString(postDTO);

        mockMvc.perform(post("/post/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(postDTOJSON))
                .andExpect(status().isCreated());

        verify(postService, times(1)).create(postDTO);

    }

    @Test
    void createWrongPost() throws Exception {

        PostDTO postDTO = PostDTO.builder()
                .text("")
                .author(125L)
                .build();

        String postDTOJSON = objectMapper.writeValueAsString(postDTO);

        mockMvc.perform(post("/post/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(postDTOJSON))
                .andExpect(status().isNotAcceptable())
                .andExpect(result -> assertInstanceOf(PostNotCreatedException.class, result.getResolvedException()))
                .andExpect(result ->
                                assertEquals("text - The text of the post shouldn't be empty; ",
                                        Objects.requireNonNull(result.getResolvedException()).getMessage()));
        ;

        verify(postService, times(0)).create(postDTO);

    }

    @Test
    void updateNormalPost() throws Exception {

        PostDTO postDTO= PostDTO.builder()
                .postId(20L)
                .text("This is the some text. Bla bla bla...")
                .author(10L)
                .createdAt(System.currentTimeMillis())
                .updatedAt(System.currentTimeMillis())
                .build();

        when(postService.findOne(20L)).thenReturn(postDTO);

        PostDTO updatedPostDTO= PostDTO.builder()
                .postId(20L)
                .text("This is the some text #2. NOT Bla bla bla...")
                .author(10L)
                .build();

        String postDTOJSON = objectMapper.writeValueAsString(updatedPostDTO);

        mockMvc.perform(patch("/post/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(postDTOJSON))
                .andExpect(status().isOk());

        verify(postService, times(1)).update(updatedPostDTO);

    }

    @Test
    void updateWrongPost() throws Exception {

        PostDTO postDTO= PostDTO.builder()
                .postId(20L)
                .text("This is the some text. Bla bla bla...")
                .author(10L)
                .createdAt(System.currentTimeMillis())
                .updatedAt(System.currentTimeMillis())
                .build();

        when(postService.findOne(20L)).thenReturn(postDTO);

        PostDTO updatedPostDTO= PostDTO.builder()
                .postId(20L)
                .text("")
                .author(10L)
                .build();

        String postDTOJSON = objectMapper.writeValueAsString(updatedPostDTO);

        mockMvc.perform(patch("/post/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(postDTOJSON))
                .andExpect(status().isNotAcceptable())
                .andExpect(result -> assertInstanceOf(PostNotUpdatedException.class, result.getResolvedException()))
                .andExpect(result ->
                        assertEquals("text - The text of the post shouldn't be empty; ",
                                Objects.requireNonNull(result.getResolvedException()).getMessage()));
        ;

        verify(postService, times(0)).update(updatedPostDTO);

    }

}
