import { CircleAlertIcon, } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import type { Item } from "@/components/employeeTable";
import { useRefetchContext } from "./refetchProvider";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/state/store";
import { logout } from "@/state/authSlice/authSlice";

export default function AlertDialogDelEmployee({employee, id ,display}: {employee: Item, id: string, display?: 'hidden'}) {
    const {Refetch} = useRefetchContext();
    const token = useSelector<RootState>((state) => state.auth.token);
    const dispatch = useDispatch<AppDispatch>();
    
    const handleDeleteRows = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_api_endpoint}/${employee.id}`,{
                method: "delete",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            if(response.status === 401){
                dispatch(logout());
            }
        }finally {
            Refetch();
        }
    }

    return <AlertDialog>
            <AlertDialogTrigger className={display} id={id}>
            </AlertDialogTrigger>
            <AlertDialogContent>
            <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                <div
                className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
                >
                <CircleAlertIcon className="opacity-80" size={16} />
                </div>
                <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete Employee {" "}
                    <span className="font-bold light:text-black dark:text-white ">{employee.name}</span>.
                </AlertDialogDescription>
                </AlertDialogHeader>
            </div>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteRows}>
                Delete
                </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
        </AlertDialog>
}