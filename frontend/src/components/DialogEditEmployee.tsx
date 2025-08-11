import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Item } from "./employeeTable";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "./ui/select";
import { useRef, useState, type ChangeEvent } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Skeleton } from "./ui/skeleton";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { useRefetchContext } from "./refetchProvider";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/state/store";
import { logout } from "@/state/authSlice/authSlice";

export default function DialogEditEmployee ({id, display, data} : {id: string, display?: "hidden", data: Item}) {
  const [employee, setEmployee] = useState(data);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const btnSaveRef = useRef<null | HTMLButtonElement>(null);

  const {Refetch} = useRefetchContext();

  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async () => {
    try {
      btnSaveRef.current?.setAttribute("disabled", "");
      setIsLoading(true);
      setIsSuccess(false);
      setIsError(false);
      //const res = 
      const response = await fetch(`${import.meta.env.VITE_api_endpoint}/${employee.id}`, {
        method: 'PUT',
        body: JSON.stringify(employee),
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
      });
      if(response.status === 401){
          dispatch(logout());
      }
      if(response.status >= 400) throw new Error();
      //const data = await res.json();
      //setEmployee(data);
      setIsSuccess(true);
      Refetch();
    }catch {
      setIsError(true);
    }finally {
      setIsLoading(false);
      btnSaveRef.current?.removeAttribute("disabled");
    }
  } 

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsError(false);
    setIsSuccess(false);
    setEmployee({...employee, [e.target.name]: e.target.value})
  }


    return <Dialog onOpenChange={() => {setIsError(false); setIsSuccess(false); setIsLoading(false)}}>
      <form>
        <DialogTrigger className={display} id={id}>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit employee</DialogTitle>
            <DialogDescription>
              Make changes here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[50vh] w-full rounded-md">
            {!isLoading && 
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input id="name-1" name="name" value={employee.name} onChange={handleChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email-1">Email</Label>
                <Input id="email-1" name="email" value={employee.email} onChange={handleChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="location-1">Location</Label>
                <Input id="location-1" name="location" value={employee.location} onChange={handleChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="department-1">Department</Label>
                <Input id="department-1" name="department" value={employee.department} onChange={handleChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="status-1">Status</Label>
                <Select value={employee.status} onValueChange={(value: 'Active' | 'Inactive') => setEmployee({...employee ,status : value})}>
                  <SelectTrigger id="status-1">
                    <SelectValue></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem  value={"Active"} >
                        <SelectLabel>Active</SelectLabel>
                      </SelectItem>
                      <SelectSeparator/>
                      <SelectItem value={"Inactive"} >
                        <SelectLabel>Inactive</SelectLabel>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="flag-1">Flag</Label>
                <Input id="flag-1" name="flag" value={employee.flag} onChange={handleChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="balance-1">Balance</Label>
                <Input id="balance-1" name="balance" value={employee.balance} onChange={handleChange} />
              </div>
            </div>}
            {isLoading && 
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[225px] w-[100%] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100%]" />
                <Skeleton className="h-4 w-[50%]" />
              </div>
            </div>}
          </ScrollArea>
            {isError && !isLoading && 
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Failed to save your changes.</AlertTitle>
              <AlertDescription>
                please try again later!
              </AlertDescription>
            </Alert>}
            {isSuccess && !isError &&
              <Alert>
              <CheckCircle2Icon />
              <AlertTitle>Success! Your changes have been saved</AlertTitle>
            </Alert>}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button ref={btnSaveRef} type="submit" onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
}