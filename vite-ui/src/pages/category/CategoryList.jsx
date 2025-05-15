import { CategoryCard } from "./CategoryCard";
import { useList } from "../../contexts/ListContext";
import { Loading } from "../../components/feedback/Loading";
import { useUI } from "../../contexts/UIContext";
import { PaginationPanel } from "../../components/features/PaginationPanel";
import { NavLink } from "react-router";
import { useCheckAdminRole } from "@/hooks/useCheckRoles";

export const CategoryList = () => {
  const { message, content: categories, isEmpty } = useList();

  const { isLoading } =
    useUI();

    const admin = useCheckAdminRole()
 
  return (
    <div className="flex flex-col items-center mt-10 px-5 md:px-10">
      
      {admin && <section className="text-center ">
        <NavLink to={"/categories/register"}>
          <h2 typeof="link" className="responsive-text-xl font-bold text-info-content mb-2 md:mb-4 text-center hover:underline">
            Register Category
          </h2>
        </NavLink>
      </section>}
      {isEmpty ? <p>{message}</p> : ""}
      {isLoading ? <Loading /> : ""}
      {isEmpty || isLoading ? (
        ""
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 w-50 mt-5">
          {categories?.map((category) => (
            <CategoryCard key={category.categoryId} category={category} />
          ))}
        </div>
      )}
      <div className="p-3 flex justify-center">
        <PaginationPanel />
      </div>
    </div>
  );
};
