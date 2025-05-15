import React from "react";
import { useNavigate } from "react-router";
import { useSecureDelete } from "@/hooks/useSecureDelete";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Trash2Icon } from "lucide-react";
import { useCurrentPath } from "@/hooks/usePath";
import { useCheckAdminRole } from "@/hooks/useCheckRoles";

export const CategoryCard = (props) => {

const { category } = props
const { categoryId, name} = category
const navigate = useNavigate()
const secureDelete = useSecureDelete()
const currentPath = useCurrentPath()
const admin = useCheckAdminRole()


  return (
    <div className="w-full max-w-xl p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition ">
      <div className=" text-center mb-2 text-sm text-gray-500">
        <span>Category : {name}</span>
      </div>
       {admin && (
          <div className="flex gap-1 justify-end">
            <Button
              onClick={() => {
                navigate(`/categories/edit/${categoryId}`);
              }}
            >
              <Pencil className="w-3 sm:w-3.5 md:w-4 lg:w-4.5 text-amber-700 opacity-70 hover:opacity-100" />
            </Button>
            <Button
              onClick={async () => {
                await secureDelete(currentPath, categoryId);
              }}
            >
              <Trash2Icon className=" w-3 sm:w-3.5 md:w-4 lg:w-4.5 text-red-500 opacity-70 hover:opacity-100" />
            </Button>
          </div>
        )}
    </div>
  );
};
