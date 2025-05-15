package lt.techin.egzaminas.spring_api.dto.post;

import lt.techin.egzaminas.spring_api.dto.review.ReviewResponseDTO;
import lt.techin.egzaminas.spring_api.dto.user.UserResponseDTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record PostResponseDTO(long postId,
                              String title,
                              String postType,
                              String content,
                              UserResponseDTO userResponseDTO,
                              BigDecimal price,
                              String town,
                              LocalDateTime createdAt,
                              List<ReviewResponseDTO> reviewResponseDTOList
) {
}
