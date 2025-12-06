"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Mail, Lock, AlertCircle, Loader2 } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou senha incorretos");
        setLoading(false);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    // Fundo Preto/Cinza Profundo (Igual ao resto do site)
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 relative font-sans selection:bg-blue-500/30">
      
      {/* Background Effect (Blob Azul) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <Card className="bg-gray-900 border border-gray-800 shadow-2xl shadow-blue-900/10 rounded-2xl backdrop-blur-xl">
          <CardHeader className="space-y-4 text-center pb-8">
            
            {/* Logo F1 */}
            <div className="flex justify-center mb-2">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-700 to-indigo-900 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50">
                 <span className="text-white font-bold text-xl">F1</span>
              </div>
            </div>

            <CardTitle className="text-3xl font-bold text-white tracking-tight">
              Bem-vindo de volta
            </CardTitle>
            <CardDescription className="text-gray-400">
              Entre na sua conta para continuar
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-900/20 border border-red-800/50 text-red-300 text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wide ml-1">
                  Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="pl-10 bg-gray-950 border-gray-800 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all rounded-xl h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-xs font-bold text-gray-400 uppercase tracking-wide ml-1">
                    Senha
                    </label>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="pl-10 bg-gray-950 border-gray-800 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all rounded-xl h-12"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white font-bold py-6 text-base rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all transform hover:scale-[1.02]"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Entrando...
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2" />
                    Entrar
                  </>
                )}
              </Button>
            </CardContent>
          </form>

          <CardFooter className="flex flex-col space-y-6 pt-2">
            <div className="w-full border-t border-gray-800"></div>
            
            <div className="flex flex-col items-center gap-3">
                <Link
                href="/"
                className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                ← Voltar para a página inicial
                </Link>
                
                <p className="text-sm text-gray-500">
                    Ainda não tem conta?{' '}
                    <Link href="/registrar" className="text-blue-400 hover:text-blue-300 font-semibold hover:underline">
                        Registre-se
                    </Link>
                </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}