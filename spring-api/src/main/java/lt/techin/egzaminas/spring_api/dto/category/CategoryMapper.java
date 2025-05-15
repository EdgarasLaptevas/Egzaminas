package lt.techin.egzaminas.spring_api.dto.category;

import lt.techin.egzaminas.spring_api.dto.review.PagedReviewsResponseDTO;
import lt.techin.egzaminas.spring_api.dto.review.ReviewListResponseDTO;
import lt.techin.egzaminas.spring_api.model.Category;

import lt.techin.egzaminas.spring_api.model.Review;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    Category toEntity(CategoryRequestDTO dto);

    CategoryResponseDTO toResponseDto(Category category);

    List<CategoryResponseDTO> toResponseDtoList(List<Category> roleList);

    default CategoryListResponseDTO toListResponseDto(List<Category> categoryList) {
        return new CategoryListResponseDTO(toResponseDtoList(categoryList));
    }

    default PagedCategoryResponseDTO toPageResponse(Page<Category> pagedCategories) {
        return new PagedCategoryResponseDTO(toResponseDtoList(pagedCategories.getContent()),
                pagedCategories.getTotalPages(),
                (int) pagedCategories.getTotalElements(),
                pagedCategories.getNumber(),
                pagedCategories.getSize());
    }
}
