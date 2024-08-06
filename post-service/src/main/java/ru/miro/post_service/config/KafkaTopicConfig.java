package ru.miro.post_service.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    @Bean
    public NewTopic postsTopic() {
        return TopicBuilder.name("posts")
                .build();
    }

    @Bean
    public NewTopic updatedPostsTopic() {
        return TopicBuilder.name("updated-posts")
                .build();
    }

    @Bean
    public NewTopic deletedPostsTopic() {
        return TopicBuilder.name("deleted-posts")
                .build();
    }

}
