import CardWrapper from "@/components/auth/CardWrapper";

function LoginForm() {
  return (
    <CardWrapper
      headerLabel={"Welcome back"}
      backButtonLabel={"Don't have an account?"}
      backButtonHref={"/auth/register"}
      showSocial
    >
      Login Form
    </CardWrapper>
  );
}

export default LoginForm;
