package lt.techin.egzaminas.spring_api.service;

import lt.techin.egzaminas.spring_api.dto.review.ReviewRequestDTO;
import lt.techin.egzaminas.spring_api.model.Review;
import lt.techin.egzaminas.spring_api.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;


    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;

    }

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> findAllReviews() {
        return reviewRepository.findAll();
    }

    public Optional<Review> findReviewById(long id) {
        return reviewRepository.findById(id);
    }

    public Review editReview(Review review, ReviewRequestDTO reviewRequestDTO) {
        review.setRating(reviewRequestDTO.rating());
        review.setComment(reviewRequestDTO.comment());

        return reviewRepository.save(review);
    }

    public void deleteReviewById(long id) {
        reviewRepository.deleteById(id);
    }

    public Page<Review> findAllReviewsPage(int page, int size) {
        String defaultSort = "createdAt";
        Pageable pageable = PageRequest.of(page, size, Sort.by(defaultSort).descending());
        return reviewRepository.findAll(pageable);
    }
}
