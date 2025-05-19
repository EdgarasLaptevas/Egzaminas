package lt.techin.egzaminas.spring_api.service;

import lt.techin.egzaminas.spring_api.dto.category.CategoryRequestDTO;
import lt.techin.egzaminas.spring_api.model.Category;
import lt.techin.egzaminas.spring_api.model.Review;
import lt.techin.egzaminas.spring_api.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    public final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> findCategoryById(long id) {
        return categoryRepository.findById(id);
    }

    public void deleteCategoryById(long id) {
        categoryRepository.deleteById(id);
    }

    public boolean categoryExistsByName(String name) {
        return categoryRepository.existsByName(name);
    }

    public Category editCategory(Category category, CategoryRequestDTO categoryRequestDTO) {
        category.setName(categoryRequestDTO.name());

        return saveCategory(category);
    }

    public Page<Category> findAllCategoriesPage(int page, int size) {
        String defaultSort = "categoryId";
        Pageable pageable = PageRequest.of(page, size, Sort.by(defaultSort).descending());
        return categoryRepository.findAll(pageable);
    }
}