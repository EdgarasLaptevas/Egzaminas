package lt.techin.egzaminas.spring_api.dto.post;

import lt.techin.egzaminas.spring_api.dto.review.ReviewMapper;
import lt.techin.egzaminas.spring_api.dto.user.UserMapper;
import lt.techin.egzaminas.spring_api.model.Post;
import lt.techin.egzaminas.spring_api.model.User;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class, ReviewMapper.class})
public interface PostMapper {

    @Mapping(target = "user", expression = "java(user)")
    Post toEntity(PostRequestDTO dto, @Context User user);

    @Mapping(source = "user", target = "userResponseDTO")
    @Mapping(source = "reviewList", target = "reviewResponseDTOList")
    PostResponseDTO toResponseDto(Post post);

    List<PostResponseDTO> toResponseDtoList(List<Post> postList);

    default PostListResponseDTO toListResponseDto(List<Post> postList) {
        return new PostListResponseDTO(toResponseDtoList(postList));
    }

    default PagedPostsResponseDTO toPageResponse(Page<Post> pagedPosts) {
        return new PagedPostsResponseDTO(
                toResponseDtoList(pagedPosts.getContent()),
                pagedPosts.getTotalPages(),
                (int) pagedPosts.getTotalElements(),
                pagedPosts.getNumber(),
                pagedPosts.getSize()
        );
    }
}
