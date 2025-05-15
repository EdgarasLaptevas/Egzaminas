package lt.techin.egzaminas.spring_api.dto.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CategoryRequestDTO(@NotNull(message = "You must provide category")
                                 @NotBlank(message = "Category cannot be empty")
                                 @Size(min = 3, max = 100, message = "Category must be at least 3 characters long but not longer than 100 characters")
                                 String name) {
}
