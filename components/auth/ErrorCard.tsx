import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Header from "@/components/auth/Header";
import BackButton from "@/components/auth/BackButton";

function ErrorCard() {
  return (
    <Card className={"w-[400px] shadow-md"}>
      <CardHeader>
        <Header label={"Oops! Something went wrong!"} />
      </CardHeader>
      <CardFooter>
        <BackButton label={"Back to login"} href={"/auth/login"} />
      </CardFooter>
    </Card>
  );
}

export default ErrorCard;
