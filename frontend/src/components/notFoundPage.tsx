import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

const NotFoundPage = () => {
    return <>
        <ModeToggle/>
        <div className="flex flex-col justify-center items-center m-[10%]">
            <h1 className="font-bold text-6xl mb-0">404</h1>
            <h1 className="font-medium mb-5">Page Not Found</h1>
            <Link to={"/"}>
                <Button>Return to homepage</Button>
            </Link>
        </div>
    </>
}

export default NotFoundPage;