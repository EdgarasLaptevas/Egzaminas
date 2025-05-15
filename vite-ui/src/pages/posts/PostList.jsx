import { PostCard } from "./PostCard";
import { useList } from "../../contexts/ListContext";
import { Loading } from "../../components/feedback/Loading";
import { useUI } from "../../contexts/UIContext";
import { PaginationPanel } from "../../components/features/PaginationPanel";
import { SortPanel } from "@/components/features/SortPanel";
import { SearchBarPanel } from "@/components/features/SearchBarPanel";
import { NavLink } from "react-router";
import { useCheckAdminRole } from "@/hooks/useCheckRoles";

export const PostList = () => {
  const { message, content: posts, isEmpty } = useList();

  const { isLoading } =
    useUI();

    const admin = useCheckAdminRole()
 
  const SortFields = [
    { label: "All Posts", value: "All" },
    { label: "News", value: "News" },
    { label: "Blog", value: "Blog" },
  ];

  return (
    <div className="flex flex-col items-center mt-1 px-5 md:px-10">
      <div className="w-full flex gap-5 justify-center py-1 md:py-2 px-2 md:px-10" >
        <SearchBarPanel />
          <SortPanel SortFields={SortFields} />
      </div>
      {admin && <section className="text-center ">
        <NavLink to={"/posts/register"}>
          <h2 typeof="link" className="responsive-text-xl font-bold text-info-content mb-2 md:mb-4 text-center hover:underline">
            Register Post
          </h2>
        </NavLink>
      </section>}
      {isEmpty ? <p>{message}</p> : ""}
      {isLoading ? <Loading /> : ""}
      {isEmpty || isLoading ? (
        ""
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 w-full mt-5">
          {posts?.map((post) => (
            <PostCard key={post.postId} post={post} />
          ))}
        </div>
      )}
      <div className="p-3 flex justify-center">
        <PaginationPanel />
      </div>
    </div>
  );
};
