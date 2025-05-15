package lt.techin.egzaminas.spring_api.repository;

import lt.techin.egzaminas.spring_api.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByName(String name);
}
