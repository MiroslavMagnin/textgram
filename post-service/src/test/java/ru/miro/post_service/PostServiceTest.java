package ru.miro.post_service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import ru.miro.post_service.client.UserClient;
import ru.miro.post_service.dto.PostDTO;
import ru.miro.post_service.exception.PostNotCreatedException;
import ru.miro.post_service.exception.PostNotUpdatedException;
import ru.miro.post_service.model.User;
import ru.miro.post_service.service.PostService;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
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

    @Autowired
    private UserClient userClient;

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

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

    @Test
    public void testUserDeserialization() throws Exception {

        String json = "{ \"userId\": 1, \"name\": \"Mike\", \"birthDate\": \"2006-05-05\", \"email\": \"mike@mail.ru\", \"password\": \"$2a$10$hvEeHwtipTUHtnLSE585..iFkLUXXCvfLVb.Wk/331biA/TlZ.SWu\", \"followers\": [], \"following\": [ { \"followId\": 1, \"from\": { \"userId\": 1, \"name\": \"Mike\", \"email\": \"mike@mail.ru\" }, \"to\": { \"userId\": 2, \"name\": \"Mike\", \"email\": \"mike1234@mail.ru\" } }, { \"followId\": 2, \"from\": { \"userId\": 1, \"name\": \"Mike\", \"email\": \"mike@mail.ru\" }, \"to\": { \"userId\": 3, \"name\": \"Mike 12345\", \"email\": \"mike12345@mail.ru\" } } ], \"role\": \"USER\", \"createdAt\": 1723026174190, \"updatedAt\": 1723026174190 }";

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        User user = objectMapper.readValue(json, User.class);

        assertNotNull(user);
        assertNotNull(user.getBirthDate());
        assertEquals(user.getBirthDate(), LocalDate.of(2006, 5,5));
        assertNotNull(user.getFollowing());
        assertEquals(user.getFollowers(), Collections.emptyList());
        assertEquals(user.getFollowing().get(0).getFrom().getEmail(), "mike@mail.ru");
        assertEquals(user.getFollowing().get(0).getTo().getEmail(), "mike1234@mail.ru");
        assertEquals(user.getFollowing().get(1).getTo().getEmail(), "mike12345@mail.ru");

    }

//    @Test
//    public void testUserClient() throws Exception {
//
//        String json = "{ \"userId\": 1, \"name\": \"Mike\", \"birthDate\": \"2006-05-05\", \"email\": \"mike@mail.ru\", \"password\": \"$2a$10$hvEeHwtipTUHtnLSE585..iFkLUXXCvfLVb.Wk/331biA/TlZ.SWu\", \"followers\": [], \"following\": [ { \"followId\": 1, \"from\": { \"userId\": 1, \"name\": \"Mike\", \"email\": \"mike@mail.ru\" }, \"to\": { \"userId\": 2, \"name\": \"Mike\", \"email\": \"mike1234@mail.ru\" } }, { \"followId\": 2, \"from\": { \"userId\": 1, \"name\": \"Mike\", \"email\": \"mike@mail.ru\" }, \"to\": { \"userId\": 3, \"name\": \"Mike 12345\", \"email\": \"mike12345@mail.ru\" } } ], \"role\": \"USER\", \"createdAt\": 1723026174190, \"updatedAt\": 1723026174190 }";
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.registerModule(new JavaTimeModule());
//        User returnUser = objectMapper.readValue(json, User.class);
//
//        when(userClient.getUserById(1L)).thenReturn(returnUser);
//
//        User user = userClient.getUserById(1L);
//
//        assertNotNull(user);
//        assertNotNull(user.getBirthDate());
//        assertEquals(user.getBirthDate(), LocalDate.of(2006, 5,5));
//        assertNotNull(user.getFollowing());
//        assertEquals(user.getFollowers(), Collections.emptyList());
//        assertEquals(user.getFollowing().get(0).getFrom().getEmail(), "mike@mail.ru");
//        assertEquals(user.getFollowing().get(0).getTo().getEmail(), "mike1234@mail.ru");
//        assertEquals(user.getFollowing().get(1).getTo().getEmail(), "mike12345@mail.ru");
//
//    }


}
