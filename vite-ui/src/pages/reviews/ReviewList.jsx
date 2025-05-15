import { useList } from "@/contexts/ListContext";
import { ReviewCard } from "./ReviewCard";
import { Rating } from "@smastrom/react-rating";
import { Loading } from "@/components/feedback/Loading";
import { useUI } from "@/contexts/UIContext";
import { PaginationPanel } from "@/components/features/PaginationPanel";
import { useParams } from "react-router";

export const ReviewsList = () => {
  const { content: reviews, isEmpty, message } = useList();
  //   const averageRating =
  //     reviews.length > 0
  //       ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  //       : 0;
  const { isLoading } = useUI();
  const { entityId } = useParams()

//   const pageSizes = [12, 24, 36];
//   const filterFields = [
//     { label: "All", value: "0" },
//     { label: "⭐⭐⭐⭐⭐", value: "5" },
//     { label: "⭐⭐⭐⭐", value: "4" },
//     { label: "⭐⭐⭐", value: "3" },
//     { label: "⭐⭐", value: "2" },
//     { label: "⭐", value: "1" },
//   ];

console.log(reviews);

  return (
    <div className="flex flex-col items-center gap-1 md:gap-1  bg-emerald-200 min-h-screen">
      
      <h1 className="responsive-text-xl font-semibold text-amber-800 pb-1 md:pb-2">
         {"Post ID " + entityId + " Reviews"}
      </h1>
      {/* <div className="animate-gradient bg-[linear-gradient(135deg,_#FFA500,_#ffffff,_#FFA500)] py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 rounded-lg border border-white shadow-md shadow-amber-300 relative">
        <Rating
          value={averageRating}
          readOnly
          style={{ maxWidth: ratingSize }}
        />
        <NavLink to={"/reviews/leaveReview"}>
          <div className="absolute responsive-text-sm left-34 sm:left-40 md:left-46 lg:left-50 bottom-0 w-30 hover:underline text-orange-700 flex items-center font-semibold "><span><ChevronsRight className="w-2 sm:w-3 md:w-4 lg:w-5"/></span>Leave review</div>
        </NavLink>
      </div> */}
      {isLoading ? <Loading /> : ""}
      {isEmpty ? <p>{message}</p> : ""}
      {isLoading || isEmpty ? (
        ""
      ) : (
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8 p-2 sm:p-3 md:p-4">
          {reviews?.filter((review) => review?.postId == entityId).map((review) => (
            <ReviewCard key={review.reviewId} review={review} />
          ))}
        </div>
      )}
      <div>
        <PaginationPanel />
      </div>
    </div>
  );
};
