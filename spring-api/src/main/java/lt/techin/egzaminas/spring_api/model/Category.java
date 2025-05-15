package lt.techin.egzaminas.spring_api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long categoryId;

    String name;

    @ManyToOne
    @JoinColumn(name = "post_id")
    Post post;

    public Category(String name) {
        this.name = name;
    }
}
