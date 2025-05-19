import React from "react";
import dayjs from "dayjs";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { useSecureDelete } from "@/hooks/useSecureDelete";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Trash2Icon } from "lucide-react";
import { useCurrentPath } from "@/hooks/usePath";
import { useCheckAdminRole } from "@/hooks/useCheckRoles";

export const PostCard = (props) => {

const { post } = props
const { postId, title,  content, price, town, postType, createdAt} = post
const navigate = useNavigate()
const secureDelete = useSecureDelete()
const currentPath = useCurrentPath()
const admin = useCheckAdminRole()


  return (
    <div className="w-full max-w-xl p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
        <span>Post ID: {postId}</span><span>Category: {postType}</span>
        <NavLink to={`/posts/${postId}/reviews`}><span className="text-sm text-blue-600 hover:underline cursor-pointer relative top-[-10px]">Read All Reviews</span></NavLink>
        <div className="flex flex-col items-end"><span>{dayjs(createdAt).format("YYYY-MM-DD HH:mm")}</span>
        <span>{town}</span>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>

      <p className="text-gray-700 text-sm mb-4 line-clamp-4">
        {content}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">Price: {price}</span>
        <NavLink to={`/posts/${postId}/leaveReview`}><button className="text-sm text-blue-600 hover:underline cursor-pointer">Leave Review</button></NavLink>
      </div>
       {admin && (
          <div className="flex gap-1 justify-end">
            <Button
              onClick={() => {
                navigate(`/posts/edit/${postId}`);
              }}
            >
              <Pencil className="w-3 sm:w-3.5 md:w-4 lg:w-4.5 text-amber-700 opacity-70 hover:opacity-100" />
            </Button>
            <Button
              onClick={async () => {
                await secureDelete(currentPath, postId);
              }}
            >
              <Trash2Icon className=" w-3 sm:w-3.5 md:w-4 lg:w-4.5 text-red-500 opacity-70 hover:opacity-100" />
            </Button>
          </div>
        )}
    </div>
  );
};
