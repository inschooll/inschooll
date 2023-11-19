import Link from "next/link";
import Button from "../_components/buttons/button";
import { FcGoogle } from "react-icons/fc";

export default function AuthGoogleButton() {
  return (
    <Link href={"/api/auth/signin"}>
      <Button variant={"outlineFull"} size={"md"}>
        <div className="flex items-center justify-center gap-2">
          <FcGoogle size={18} />
          <span>Continue with Google</span>
        </div>
      </Button>
    </Link>
  );
}