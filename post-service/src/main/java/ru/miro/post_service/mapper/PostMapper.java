package ru.miro.post_service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import ru.miro.post_service.dto.PostDTO;
import ru.miro.post_service.model.Post;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PostMapper extends Mappable<Post, PostDTO> {

    @Mapping(target = "postId", source = "post.id")
    PostDTO toDTO(Post post);

}

