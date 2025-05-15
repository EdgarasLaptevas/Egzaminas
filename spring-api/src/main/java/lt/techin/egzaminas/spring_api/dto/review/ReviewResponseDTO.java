package lt.techin.egzaminas.spring_api.dto.review;

import lt.techin.egzaminas.spring_api.dto.user.UserResponseDTO;

import java.time.LocalDateTime;

public record ReviewResponseDTO(long reviewId,
                                long postId,
                                UserResponseDTO userResponseDTO,
                                int rating,
                                String comment,
                                LocalDateTime createdAt) {
}
