import CardWrapper from "@/components/auth/CardWrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

function AuthErrorPage() {
  return (
    <CardWrapper
      headerLabel={"Ooops! Something went Wrong"}
      backButtonLabel={"Back to login"}
      backButtonHref={"/auth/login"}
    >
      <div className={"w-full flex items-center justify-center"}>
        <ExclamationTriangleIcon className={"text-destructive "} />
      </div>
    </CardWrapper>
  );
}

export default AuthErrorPage;
