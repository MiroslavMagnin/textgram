package ru.miro.post_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import ru.miro.post_service.config.BeanConfig;
import ru.miro.post_service.config.FeignConfig;
import ru.miro.post_service.model.User;

@FeignClient(name = "user-service", url = "http://user:8091/user", configuration = FeignConfig.class)
public interface UserClient {

    @GetMapping("/get-user-by-id/{id}")
    User getUserById(@PathVariable("id") Long userId);

}
