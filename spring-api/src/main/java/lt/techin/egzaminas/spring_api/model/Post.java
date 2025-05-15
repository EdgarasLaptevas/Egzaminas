package lt.techin.egzaminas.spring_api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long postId;

    @ManyToOne()
    @JoinColumn(name = "user_id")
    private User user;

    private String title;
    private String postType;
    private String content;
    private BigDecimal price;
    String town;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    List<Review> reviewList = new ArrayList<>();

    public Post(User user, String title, String postType, String content) {
        this.user = user;
        this.title = title;
        this.postType = postType;
        this.content = content;
    }
}
