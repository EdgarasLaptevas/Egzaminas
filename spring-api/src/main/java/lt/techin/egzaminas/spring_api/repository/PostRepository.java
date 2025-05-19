package lt.techin.egzaminas.spring_api.repository;

import lt.techin.egzaminas.spring_api.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Long> {

    Page<Post> findByPostType(String postType, Pageable pageable);

    @Query(value = """
                SELECT p FROM Post p
                WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(p.postType) LIKE LOWER(CONCAT('%', :search, '%'))
                   OR LOWER(p.content) LIKE LOWER(CONCAT('%', :search, '%'))
                   OR str(p.price) LIKE CONCAT('%', :search, '%')
                   OR LOWER(p.town) LIKE LOWER(CONCAT('%', :search, '%'))
                   OR str(p.createdAt) LIKE CONCAT('%', :search, '%')
                ORDER BY p.createdAt DESC
            """,
            countQuery = """
                        SELECT COUNT(p) FROM Post p
                        WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :search, '%'))
                        OR LOWER(p.postType) LIKE LOWER(CONCAT('%', :search, '%'))
                           OR LOWER(p.content) LIKE LOWER(CONCAT('%', :search, '%'))
                           OR str(p.price) LIKE CONCAT('%', :search, '%')
                           OR LOWER(p.town) LIKE LOWER(CONCAT('%', :search, '%'))
                           OR str(p.createdAt) LIKE CONCAT('%', :search, '%')
                    """
    )
    Page<Post> searchAllFields(@Param("search") String search, Pageable pageable);
}
