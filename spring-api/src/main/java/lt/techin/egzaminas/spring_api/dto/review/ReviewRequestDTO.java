package lt.techin.egzaminas.spring_api.dto.review;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record ReviewRequestDTO(@Positive(message = "Post ID must be positive number")
                               long postId,

                               @Max(value = 5, message = "You can rate up to 5 maximum")
                               @Positive(message = "Rating must be positive number")
                               Integer rating,

                               @Size(max = 1000, message = "You can not exceed more than 1000 characters")
                               String comment) {
}
