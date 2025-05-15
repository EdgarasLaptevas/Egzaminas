package lt.techin.egzaminas.spring_api.controller;

import jakarta.validation.Valid;
import lt.techin.egzaminas.spring_api.dto.ApiResponse;
import lt.techin.egzaminas.spring_api.dto.category.*;
import lt.techin.egzaminas.spring_api.dto.review.PagedReviewsResponseDTO;
import lt.techin.egzaminas.spring_api.dto.review.ReviewListResponseDTO;
import lt.techin.egzaminas.spring_api.dto.review.ReviewResponseDTO;
import lt.techin.egzaminas.spring_api.exceptions.ApiErrorException;
import lt.techin.egzaminas.spring_api.model.Category;
import lt.techin.egzaminas.spring_api.model.Review;
import lt.techin.egzaminas.spring_api.service.CategoryService;
import lt.techin.egzaminas.spring_api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController extends BaseController {

    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @Autowired
    public CategoryController(CategoryService categoryService, CategoryMapper categoryMapper, UserService userService) {
        this.categoryService = categoryService;
        this.categoryMapper = categoryMapper;
    }

    @PostMapping("/categories")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<CategoryResponseDTO>> postCategory(@Valid @RequestBody CategoryRequestDTO categoryRequestDTO) {

        if (categoryService.categoryExistsByName(categoryRequestDTO.name())) {
            return badRequest(null, "Category already exists");
        }

        Category category = categoryService.saveCategory(categoryMapper.toEntity(categoryRequestDTO));

        return ok(categoryMapper.toResponseDto(category), "Category created successfully");

    }

    @GetMapping("/categories/pagination")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<PagedCategoryResponseDTO>> getAllReviewsPage(@RequestParam int page,
                                                                                   @RequestParam int size,
                                                                                   @RequestParam(required = false) String sort,
                                                                                   @RequestParam(required = false) String search) {
        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Invalid page or size parameters");
        }

        Page<Category> pagedCategory = categoryService.findAllCategoriesPage(page, size);
        PagedCategoryResponseDTO pagedCategoryResponseDTO = categoryMapper.toPageResponse(pagedCategory);

        return ok(pagedCategoryResponseDTO, pagedCategory.isEmpty() ? "Review list is empty" : null);
    }

    @GetMapping("/categories")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<CategoryListResponseDTO>> getAllReviews() {

        List<Category> categories = categoryService.findAllCategories();
        CategoryListResponseDTO categoryListResponseDTO = categoryMapper.toListResponseDto(categories);

        return ok(categoryListResponseDTO, categories.isEmpty() ? "Reviews List is empty" : null);
    }

    @GetMapping("/categories/{categoryId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<CategoryResponseDTO>> getCategory(@PathVariable long categoryId) {
        Category category = categoryService.findCategoryById(categoryId).orElseThrow(() -> new ApiErrorException("Category not found", HttpStatus.NOT_FOUND));

        return ok(categoryMapper.toResponseDto(category));

    }

    @PutMapping("/categories/{categoryId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<CategoryResponseDTO>> editCategory(@PathVariable long categoryId, @Valid @RequestBody CategoryRequestDTO categoryRequestDTO) {

        Category category = categoryService.findCategoryById(categoryId).orElseThrow(() -> new ApiErrorException("Category not found", HttpStatus.NOT_FOUND));

        Category editedCategory = categoryService.editCategory(category, categoryRequestDTO);

        return ok(categoryMapper.toResponseDto(editedCategory), "Category edited successfully");
    }

    @DeleteMapping("/categories/{categoryId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<CategoryResponseDTO>> editCategory(@PathVariable long categoryId) {

        categoryService.findCategoryById(categoryId).orElseThrow(() -> new ApiErrorException("Category not found", HttpStatus.NOT_FOUND));

        categoryService.deleteCategoryById(categoryId);

        return ok(null, "Category deleted successfully");
    }
}
