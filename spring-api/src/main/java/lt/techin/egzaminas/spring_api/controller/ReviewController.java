package lt.techin.egzaminas.spring_api.controller;

import lt.techin.egzaminas.spring_api.dto.ApiResponse;
import lt.techin.egzaminas.spring_api.dto.review.*;
import lt.techin.egzaminas.spring_api.exceptions.ApiErrorException;
import lt.techin.egzaminas.spring_api.model.Post;
import lt.techin.egzaminas.spring_api.model.Review;
import lt.techin.egzaminas.spring_api.model.User;
import lt.techin.egzaminas.spring_api.service.PostService;
import lt.techin.egzaminas.spring_api.service.ReviewService;
import jakarta.validation.Valid;
import lt.techin.egzaminas.spring_api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ReviewController extends BaseController {

    public final ReviewService reviewService;
    public final UserService userService;
    public final ReviewMapper reviewMapper;
    public final PostService postService;

    @Autowired
    public ReviewController(ReviewService reviewService, UserService userService, ReviewMapper reviewMapper, PostService postService) {
        this.reviewService = reviewService;
        this.userService = userService;
        this.reviewMapper = reviewMapper;
        this.postService = postService;
    }

    @PostMapping("/reviews")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
    public ResponseEntity<ApiResponse<ReviewResponseDTO>> leaveReview(@Valid @RequestBody ReviewRequestDTO reviewRequestDTO, Authentication authentication) {

        User user = userService.findUserByUsername(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Post post = postService.findPostById(reviewRequestDTO.postId()).orElseThrow(() -> new ApiErrorException("Post not found", HttpStatus.NOT_FOUND));

        Review savedReview = reviewService.addReview(reviewMapper.toEntity(reviewRequestDTO, user, post));
        ReviewResponseDTO reviewResponseDTO = reviewMapper.toResponseDto(savedReview);

        return ok(reviewResponseDTO, "Review submitted");
    }

    @GetMapping("/reviews/pagination")
    public ResponseEntity<ApiResponse<PagedReviewsResponseDTO>> getAllReviewsPage(@RequestParam int page,
                                                                                  @RequestParam int size,
                                                                                  @RequestParam(required = false) String sort,
                                                                                  @RequestParam(required = false) String search) {
        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Invalid page or size parameters");
        }

        Page<Review> pagedReview = reviewService.findAllReviewsPage(page, size);
        PagedReviewsResponseDTO pagedReviewsResponseDTO = reviewMapper.toPageResponse(pagedReview);

        return ok(pagedReviewsResponseDTO, pagedReview.isEmpty() ? "Review list is empty" : null);
    }

    @GetMapping("/reviews")
    public ResponseEntity<ApiResponse<ReviewListResponseDTO>> getAllReviews() {

        List<Review> reviews = reviewService.findAllReviews();
        ReviewListResponseDTO reviewResponseListDTO = reviewMapper.toListResponseDto(reviews);

        return ok(reviewResponseListDTO, reviews.isEmpty() ? "Reviews List is empty" : null);
    }

    @GetMapping("/reviews/{reviewId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
    public ResponseEntity<ApiResponse<ReviewResponseDTO>> getReview(@PathVariable long reviewId) {
        Review review = reviewService.findReviewById(reviewId).orElseThrow(() -> new ApiErrorException("Review not found", HttpStatus.NOT_FOUND));

        return ok(reviewMapper.toResponseDto(review));

    }

    @PutMapping("/reviews/{reviewId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
    public ResponseEntity<ApiResponse<ReviewResponseDTO>> editReview(@PathVariable long reviewId, @Valid @RequestBody ReviewRequestDTO reviewRequestDTO, Authentication authentication) {

        Review review = reviewService.findReviewById(reviewId).orElseThrow(() -> new ApiErrorException("Review not found", HttpStatus.NOT_FOUND));

        User user = userService.findUserByUsername(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (review.getUser().getUserId() != user.getUserId()) {
            return forbidden("You cannot edit someone else's Review");
        }

        Review updatedReview = reviewService.editReview(review, reviewRequestDTO);
        ReviewResponseDTO reviewResponseDTO = reviewMapper.toResponseDto(updatedReview);

        return ok(reviewResponseDTO, "Review updated successfully");
    }

    @DeleteMapping("/reviews/{reviewId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
    public ResponseEntity<ApiResponse<String>> deleteReview(@PathVariable long reviewId, Authentication authentication) {
        Review review = reviewService.findReviewById(reviewId).orElseThrow(() -> new ApiErrorException("Review not found", HttpStatus.NOT_FOUND));

        User user = userService.findUserByUsername(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (review.getUser().getUserId() != user.getUserId()) {
            return forbidden("You cannot delete someone else's Review");
        }

        reviewService.deleteReviewById(reviewId);

        return ok(null, "Review deleted successfully");
    }
}
