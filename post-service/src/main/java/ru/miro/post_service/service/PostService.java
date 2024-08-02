package ru.miro.post_service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.miro.post_service.dto.PostDTO;
import ru.miro.post_service.exception.PostNotFoundException;
import ru.miro.post_service.exception.PostNotUpdatedException;
import ru.miro.post_service.mapper.PostMapper;
import ru.miro.post_service.model.Post;
import ru.miro.post_service.repository.PostRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final PostMapper postMapper;

    public List<PostDTO> findAll() {
        return postRepository.findAll().stream().map(postMapper::toDTO).collect(Collectors.toList());
    }

    public PostDTO findOne(Long postId) {
        return postRepository.findById(postId).map(postMapper::toDTO).orElseThrow(() -> new PostNotFoundException(postId));
    }

    @Transactional
    public void create(PostDTO postDTO) {
        // Get postDTO, map to entity Post, add createdAt and updatedAt timestamp
        postRepository.save(enrichCreatedPost(postMapper.toEntity(postDTO)));
    }

    @Transactional
    public void update(PostDTO postDTO) {
        if (postDTO.getPostId() == null)
            throw new PostNotUpdatedException("There isn't the post ID in the request");

        Optional<Post> post = postRepository.findById(postDTO.getPostId());
        if (post.isEmpty())
            throw new PostNotUpdatedException("Not found the post with id=" + postDTO.getPostId());

        // Update post, in which only the text is refresh and updatedAt, all else taken from the found post
        Post updatedPost = Post.builder()
                .id(post.get().getId())
                .text(postDTO.getText())
                .author(post.get().getAuthor())
                .createdAt(post.get().getCreatedAt())
                .updatedAt(System.currentTimeMillis())
                .build();

        postRepository.save(updatedPost);
    }

    @Transactional
    public void delete(Long postId) {
        postRepository.deleteById(postId);
    }

    // Add createdAt and updatedAt timestamp for a post, which is being created
    private Post enrichCreatedPost(Post post) {
        post.setCreatedAt(System.currentTimeMillis());
        post.setUpdatedAt(System.currentTimeMillis());
        return post;
    }

}
