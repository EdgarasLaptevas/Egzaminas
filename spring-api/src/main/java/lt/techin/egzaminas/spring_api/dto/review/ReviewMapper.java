package lt.techin.egzaminas.spring_api.dto.review;

import lt.techin.egzaminas.spring_api.dto.user.UserMapper;
import lt.techin.egzaminas.spring_api.model.Post;
import lt.techin.egzaminas.spring_api.model.Review;
import lt.techin.egzaminas.spring_api.model.User;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ReviewMapper {

    @Mapping(target = "user", expression = "java(user)")
    @Mapping(target = "post", expression = "java(post)")
    Review toEntity(ReviewRequestDTO reviewRequestDTO, @Context User user, @Context Post post);

    @Mapping(source = "user", target = "userResponseDTO")
    @Mapping(source = "post.postId", target = "postId")
    ReviewResponseDTO toResponseDto(Review review);

    List<ReviewResponseDTO> toResponseDtoList(List<Review> reviewList);

    default ReviewListResponseDTO toListResponseDto(List<Review> reviewList) {
        return new ReviewListResponseDTO(toResponseDtoList(reviewList));
    }

    default PagedReviewsResponseDTO toPageResponse(Page<Review> pagedReviews) {
        return new PagedReviewsResponseDTO(toResponseDtoList(pagedReviews.getContent()),
                pagedReviews.getTotalPages(),
                (int) pagedReviews.getTotalElements(),
                pagedReviews.getNumber(),
                pagedReviews.getSize());
    }
}
