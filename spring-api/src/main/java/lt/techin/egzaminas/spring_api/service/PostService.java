package lt.techin.egzaminas.spring_api.service;

import lt.techin.egzaminas.spring_api.dto.post.PostRequestDTO;
import lt.techin.egzaminas.spring_api.model.Post;
import lt.techin.egzaminas.spring_api.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> findPostById(long id) {
        return postRepository.findById(id);
    }

    public void deletePostById(long id) {
        postRepository.deleteById(id);
    }

    public Post updatePost(Post post, PostRequestDTO postRequestDTO) {
        post.setTitle(postRequestDTO.title());
        post.setContent(postRequestDTO.content());
        post.setPrice(postRequestDTO.price());
        post.setTown(postRequestDTO.town());
        savePost(post);

        return post;
    }

    public Page<Post> findPagedPosts(int page, int size, String sort, String search) {
        if (sort == null || sort.equalsIgnoreCase("All")) {
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            if (search == null) {
                return postRepository.findAll(pageable);
            }

            return postRepository.searchAllFields(search.toLowerCase(), pageable);
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
        if (search == null) {
            return postRepository.findAll(pageable);
        }
        return postRepository.searchAllFields(search.toLowerCase(), pageable);
    }

    public boolean isNotValidSortField(String sort) {
        List<String> sortFields = List.of("News", "Sale", "Blog");

        return !sortFields.contains(sort);
    }
}
