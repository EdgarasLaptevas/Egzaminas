package lt.techin.egzaminas.spring_api.dto.post;

import java.util.List;

public record PagedPostsResponseDTO(
        List<PostResponseDTO> content,
        int totalPages,
        int totalElements,
        int currentPage,
        int pageSize
) {
}