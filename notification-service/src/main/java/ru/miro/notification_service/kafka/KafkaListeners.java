package ru.miro.notification_service.kafka;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import ru.miro.notification_service.dto.PostDTO;

@Component
@RequiredArgsConstructor
@Slf4j
public class KafkaListeners {

    private final Gson gson;

    @KafkaListener(topics = "posts", groupId = "groupId")
    public void createNewPost(String data) {
        PostDTO obj = gson.fromJson(data, PostDTO.class);

        log.info("Listener received: created a new post - " + obj.toString() + " 🎉");
    }
}
