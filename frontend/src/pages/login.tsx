import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/state/authSlice/authSlice";
import type { AppDispatch, RootState } from "@/state/store";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

type LoginFrom = z.infer<typeof schema>


const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {status, error} = useSelector((state: RootState) => state.auth);

    const { register , handleSubmit, formState: {errors} } = useForm<LoginFrom>({
        defaultValues: {
            email: 'admin@admin.com',
            password: 'password'
        },
        resolver: zodResolver(schema)
    });

    function onSubmit({email, password}: {email: string, password: string}) {
        dispatch(login({email, password}));
    }

    if(status === 'login') return <Navigate to={'/'} />;

    return <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6 relative">
        <ModeToggle className="absolute right-0"/>
        <Card className="">
            <CardHeader className="flex flex-col justify-center items-center">
                <CardTitle className="text-lg">
                    Welcome back
                </CardTitle>
                <CardDescription>
                    Login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5">
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
                        <Button disabled={status === 'loading'} type="submit" className="w-full cursor-pointer">Login</Button>
                    </div>
                    <div className="text-center text-sm mt-2.5">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className="underline underline-offset-4">
                            Sign up
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
      </div>
    </div>;
};

export default Login;