package lt.techin.egzaminas.spring_api.dto.review;

import java.util.List;

public record PagedReviewsResponseDTO(List<ReviewResponseDTO> content,
                                      int totalPages,
                                      int totalElements,
                                      int currentPage,
                                      int pageSize) {
}
