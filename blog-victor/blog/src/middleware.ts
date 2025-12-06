import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Opcional: Redireciona para /login se não estiver autenticado
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/post", "/feed", "/dashboard"],
};