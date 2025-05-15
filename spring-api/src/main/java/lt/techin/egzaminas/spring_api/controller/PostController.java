package lt.techin.egzaminas.spring_api.controller;

import lt.techin.egzaminas.spring_api.dto.ApiResponse;
import lt.techin.egzaminas.spring_api.dto.post.*;
import lt.techin.egzaminas.spring_api.exceptions.ApiErrorException;
import lt.techin.egzaminas.spring_api.model.Post;
import lt.techin.egzaminas.spring_api.model.User;
import lt.techin.egzaminas.spring_api.service.PostService;
import lt.techin.egzaminas.spring_api.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PostController extends BaseController {

    public final UserService userService;
    public final PostService postService;
    public final PostMapper postMapper;

    @Autowired
    public PostController(UserService userService, PostService postService, PostMapper postMapper) {
        this.userService = userService;
        this.postService = postService;
        this.postMapper = postMapper;
    }

    @PostMapping("/posts")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<PostResponseDTO>> postPost(@Valid @RequestBody PostRequestDTO postRequestDTO, Authentication authentication) {

        User user = userService.findUserByUsername(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Post post = postMapper.toEntity(postRequestDTO, user);
        PostResponseDTO responseDTO = postMapper.toResponseDto(postService.savePost(post));

        return created(responseDTO, "Post created successfully");
    }

    @GetMapping("/posts/pagination")
    public ResponseEntity<ApiResponse<PagedPostsResponseDTO>> getAllPostsPage(@RequestParam int page,
                                                                              @RequestParam int size,
                                                                              @RequestParam(required = false) String sort,
                                                                              @RequestParam(required = false) String search) {

        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Invalid page or size parameters");
        }

        if (sort != null && postService.isNotValidSortField(sort)) {
            throw new IllegalArgumentException("Invalid sort field");
        }

        if (search != null) {
            search = search.trim();
            if (search.length() > 50) {
                throw new IllegalArgumentException("Search query is too long");
            }

            if (search.matches("^[%_]+$")) {
                throw new IllegalArgumentException("Search query cannot contain only % or _");
            }
        }

        Page<Post> pagedPosts = postService.findPagedPosts(page, size, sort, search);
        String message = pagedPosts.isEmpty() ? "Posts list is empty" : null;
        PagedPostsResponseDTO postResponseDTO = postMapper.toPageResponse(pagedPosts);

        return ok(postResponseDTO, message);
    }

    @GetMapping("/posts")
    public ResponseEntity<ApiResponse<PostListResponseDTO>> getAllPosts() {

        List<Post> posts = postService.findAllPosts();
        PostListResponseDTO postListResponseDTO = postMapper.toListResponseDto(posts);

        return ok(postListResponseDTO, posts.isEmpty() ? "Reviews List is empty" : null);
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<ApiResponse<PostResponseDTO>> getPost(@PathVariable long postId) {

        Post post = postService.findPostById(postId).orElseThrow(() -> new ApiErrorException("Post not found", HttpStatus.NOT_FOUND));

        return ok(postMapper.toResponseDto(post), null);
    }


    @PutMapping("/posts/{postId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<PostResponseDTO>> updatePost(@Valid @RequestBody PostRequestDTO postRequestDTO,
                                                                   @PathVariable long postId,
                                                                   Authentication authentication) {

        Post post = postService.findPostById(postId).orElseThrow(() -> new ApiErrorException("Post not found", HttpStatus.NOT_FOUND));

        User user = userService.findUserByUsername(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (post.getUser().getUserId() != user.getUserId()) {
            return forbidden("You cannot edit someone else's Post");
        }


        Post updatedPost = postService.updatePost(post, postRequestDTO);
        return ok(postMapper.toResponseDto(updatedPost), "Post updated successfully");
    }

    @DeleteMapping("/posts/{postId}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<String>> deletePost(@PathVariable long postId, Authentication authentication) {

        Post post = postService.findPostById(postId).orElseThrow(() -> new ApiErrorException("Post not found", HttpStatus.NOT_FOUND));

        User user = userService.findUserByUsername(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (post.getUser().getUserId() != user.getUserId()) {
            return forbidden("You cannot delete someone else's Post");
        }

        postService.deletePostById(postId);
        return ok(null, "Post deleted successfully");

    }
}
