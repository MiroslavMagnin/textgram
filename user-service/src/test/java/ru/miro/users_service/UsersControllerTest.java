package ru.miro.users_service;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import ru.miro.users_service.dto.UserDTO;
import ru.miro.users_service.exception.UserNotCreatedException;
import ru.miro.users_service.model.User;
import ru.miro.users_service.service.UsersService;
import ru.miro.users_service.util.UserDTOValidator;

import java.time.LocalDate;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = UserServiceApplication.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class UsersControllerTest {

    @MockBean
    private UsersService usersService;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @MockBean
    private UserDTOValidator userDTOValidator;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getUsers() throws Exception {

        mockMvc.perform(get("/user"))
                .andExpect(status().isOk());

        verify(usersService, times(1)).findAll();

    }

    @Test
    void getUserById() throws Exception {

        User user = User.builder()
                .userId(15L)
                .name("Ivan")
                .birthDate(LocalDate.of(2005,7,8))
                .email("test@mail.ru")
                .password("test")
                .build();

        when(usersService.findOne(15L)).thenReturn(user);

        mockMvc.perform(get("/user/{id}", 15L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(15L))
                .andExpect(jsonPath("$.name").value("Ivan"))
                .andExpect(jsonPath("$.birthDate").value("2005-07-08"))
                .andExpect(jsonPath("$.email").value("test@mail.ru"))
                .andExpect(jsonPath("$.password").value("test"));

        verify(usersService, times(1)).findOne(15L);

    }

    @Test
    void addNormalUser() throws Exception {

        UserDTO userDTO = UserDTO.builder()
                .name("Ivan")
                .birthDate(LocalDate.of(2005,7,8))
                .email("test@mail.ru")
                .password("test")
                .build();

        String userDTOJSON = objectMapper.writeValueAsString(userDTO);

        mockMvc.perform(post("/user/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userDTOJSON))
                .andExpect(status().isCreated());

        verify(usersService, times(1)).save(userDTO);

    }

    @Test
    void addWrongUser() throws Exception {

        UserDTO userDTO = UserDTO.builder()
                .name("I")
                .birthDate(LocalDate.of(2005,7,8))
                .email("MAIL")
                .password("0")
                .build();

        String userDTOJSON = objectMapper.writeValueAsString(userDTO);

        mockMvc.perform(post("/user/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userDTOJSON))
                .andExpect(status().isNotAcceptable())
                .andExpect(result -> assertInstanceOf(UserNotCreatedException.class, result.getResolvedException()));

        verify(usersService, times(0)).save(userDTO);

    }

    @Test
    void addUserWithWrongName() throws Exception {

        UserDTO userDTO = UserDTO.builder()
                .name("I")
                .birthDate(LocalDate.of(2005,7,8))
                .email("test@mail.ru")
                .password("test")
                .build();

        String userDTOJSON = objectMapper.writeValueAsString(userDTO);

        mockMvc.perform(post("/user/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userDTOJSON))
                .andExpect(status().isNotAcceptable())
                .andExpect(result -> assertInstanceOf(UserNotCreatedException.class, result.getResolvedException()))
                .andExpect(result ->
                        assertEquals("name - The length of the name should be from 2 to 100 characters; ",
                        Objects.requireNonNull(result.getResolvedException()).getMessage()));

        verify(usersService, times(0)).save(userDTO);

    }

    @Test
    void addUserWithWrongEmail() throws Exception {

        UserDTO userDTO = UserDTO.builder()
                .name("Ivan")
                .birthDate(LocalDate.of(2005,7,8))
                .email("wrong")
                .password("test")
                .build();

        String userDTOJSON = objectMapper.writeValueAsString(userDTO);

        mockMvc.perform(post("/user/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userDTOJSON))
                .andExpect(status().isNotAcceptable())
                .andExpect(result -> assertInstanceOf(UserNotCreatedException.class, result.getResolvedException()))
                .andExpect(result ->
                        assertEquals("email - The email should be match the format (example: ivan_ivanov@gmail.com); ",
                        Objects.requireNonNull(result.getResolvedException()).getMessage()));

        verify(usersService, times(0)).save(userDTO);

    }

}
