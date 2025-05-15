import { Rating } from "@smastrom/react-rating";
import dayjs from "dayjs";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router";
import { useSecureDelete } from "@/hooks/useSecureDelete";
import { useCurrentPath } from "@/hooks/usePath";

export const ReviewCard = (props) => {
  const { review } = props;
  const { account } = useAuth();
  const navigate = useNavigate();
  const secureDelete = useSecureDelete();
  const currentPath = useCurrentPath();

  if (!review?.userResponseDTO) return;
  const { reviewId, comment, rating, userResponseDTO, createdAt } = review;

  const yourReview =
    account?.scope?.includes("ROLE_USER") &&
    account?.user_id === userResponseDTO?.userId;

  return (
    <div className="bg-amber-50 rounded-xl w-[260px] xs:w-[300px] sm:w-sm md:w-md lg:w-lg pb-1 px-3 sm:pb-1.5 sm:px-4 md:pb-2  md:px-5 lg:pb-2.5 lg:px-6 border pt-2 sm:pt-2.5 md:pt-3 lg:pt-3.5 border-yellow-400 shadow-lg shadow-amber-600">
      <div className="flex justify-between">
        <p className="responsive-text-md text-amber-900 min-h-[30px] xs:min-h-[35] sm:min-h-[40px] md:min-h-[45px] lg:min-h-[50px]">
          {comment}
        </p>
        {yourReview && (
          <div className="flex gap-1">
            <Button
              onClick={() => {
                navigate(`/reviews/edit/${reviewId}`);
              }}
            >
              <Pencil className="w-3 sm:w-3.5 md:w-4 lg:w-4.5 text-amber-700 opacity-70 hover:opacity-100" />
            </Button>
            <Button
              onClick={async () => {
                await secureDelete(currentPath, reviewId);
              }}
            >
              <Trash2Icon className=" w-3 sm:w-3.5 md:w-4 lg:w-4.5 text-red-500 opacity-70 hover:opacity-100" />
            </Button>
          </div>
        )}
      </div>
      <div className="flex justify-between pt-1 sm:pt-2 md:pt-3">
        <span className="responsive-text-sm text-info-content">{`- ${userResponseDTO.username} `}</span>
        <Rating rating value={rating} readOnly style={{ maxWidth: "100px" }} />
      </div>
      <p className="text-end responsive-text-xs p-0.5 md:p-1 text-info-content">
        {dayjs(createdAt).format("YYYY-MM-DD HH:mm")}
      </p>
    </div>
  );
};
