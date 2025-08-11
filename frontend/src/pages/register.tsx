import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAccount } from "@/state/authSlice/authSlice";
import type { AppDispatch, RootState } from "@/state/store";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8)
})

type RegisterFrom = z.infer<typeof schema>


const Register = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {status, error} = useSelector((state: RootState) => state.auth);

    const { register , handleSubmit, formState: {errors} } = useForm<RegisterFrom>({
        resolver: zodResolver(schema)
    });

    function onSubmit({name ,email, password}: RegisterFrom) {
        dispatch(createAccount({name, email, password}));
    }

    if(status === 'login') return <Navigate to={'/'} />;

    return <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6 relative">
        <ModeToggle className="absolute right-0"/>
        <Card className="">
            <CardHeader className="flex flex-col justify-center items-center">
                <CardTitle className="text-lg">
                    Register form
                </CardTitle>
                <CardDescription>
                    Create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Name :</Label>
                            <Input {...register("name")} id="name" type="text" placeholder="name" />
                            {errors.name && <div className="text-destructive self-center">{errors.name?.message}</div>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email :</Label>
                            <Input {...register("email")} id="email" type="text" placeholder="m@example.com" />
                            {errors.email && <div className="text-destructive self-center">{errors.email?.message}</div>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Password :</Label>
                            <Input {...register("password")} id="password" type="password" placeholder="" />
                            {errors.password && <div className="text-destructive self-center">{errors.password?.message}</div>}
                        </div>
                        {errors.root && <div className="text-destructive self-center">{errors.root?.message}</div>}
                        {error && <div className="text-destructive self-center">{error}</div>}
                        <Button disabled={status === 'loading'} type="submit" className="w-full cursor-pointer">Create</Button>
                    </div>
                    <div className="text-center text-sm mt-2.5">
                        You have an account?{" "}
                        <Link to="/login" className="underline underline-offset-4">
                            Login
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
      </div>
    </div>;
};

export default Register;