package lt.techin.egzaminas.spring_api.dto.category;

import lt.techin.egzaminas.spring_api.dto.review.ReviewResponseDTO;

import java.util.List;

public record PagedCategoryResponseDTO(List<CategoryResponseDTO> content,
                                       int totalPages,
                                       int totalElements,
                                       int currentPage,
                                       int pageSize) {
}
