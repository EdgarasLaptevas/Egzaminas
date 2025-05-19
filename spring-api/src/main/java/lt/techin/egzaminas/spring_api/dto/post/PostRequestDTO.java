package lt.techin.egzaminas.spring_api.dto.post;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record PostRequestDTO(@NotNull(message = "You must provide title")
                             @NotBlank(message = "Title cannot be empty")
                             @Size(min = 3, max = 100, message = "Title must be at least 3 characters long but not longer than 100 characters")
                             String title,

                             @NotBlank(message = "Post type cannot be empty")
                             @Size(min = 3, max = 100, message = "Post type must be at least 3 characters long but not longer than 100 characters")
                             String postType,

                             @NotNull(message = "You must write content")
                             @NotBlank(message = "Content cannot be empty")
                             @Size(min = 10, max = 20000, message = "Content must be at least 10 characters long but not longer than 2000 characters")
                             String content,

                             @Positive(message = "price must be positive number")
                             BigDecimal price,

                             @NotNull(message = "You must provide town")
                             @NotBlank(message = "Town cannot be empty")
                             @Size(min = 3, max = 100, message = "Town must be at least 3 characters long but not longer than 100 characters")
                             String town
) {
}
