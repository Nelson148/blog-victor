"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ShoppingBag, 
  Sparkles, 
  Loader2,
  User,
  MessageCircle,
  LayoutGrid,
  LogOut,
  ArrowRight,
  Home,
  Calendar
} from "lucide-react";

import { listPosts, getSiteStats } from "@/app/actions"; 

interface Post {
  _id: string;
  title: string;
  content: string;
  // A interface agora aceita um objeto User ou o ID (string) caso não seja populado
  author: {
    name: string;
    email: string;
  } | string | null; // Adicionado 'null' para refletir que pode vir nulo do backend
  createdAt: string;
  comments?: any[];
  imageUrl?: string;
}

export default function HomePage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalUsers: 0,
    totalComments: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, statsData] = await Promise.all([
          listPosts(),
          getSiteStats()
        ]);
        
        if (postsData) {
          const recentPosts = postsData.slice(0, 3); 
          setPosts(recentPosts);
        }

        if (statsData) {
          setStats({
            totalPosts: statsData.totalPosts,
            totalUsers: statsData.totalUsers,
            totalComments: statsData.totalComments,
          });
        }

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-blue-500/30">
      
      {/* Navbar */}
      <nav className="fixed w-full z-40 top-0 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-700 to-indigo-900 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/50">
                <span className="text-white font-bold">F1</span>
                </div>
                <span className="font-bold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Blog
                </span>
            </Link>
          </div>
          
          <nav className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-white hover:bg-white/10 hidden md:flex">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Home className="h-4 w-4" />
                Início
              </Link>
            </Button>

            <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-white hover:bg-white/10">
              <Link href="/post" className="flex items-center gap-2 font-semibold">
                <LayoutGrid className="h-4 w-4" />
                Posts
              </Link>
            </Button>

            {session ? (
              <div className="flex items-center gap-4 border-l border-white/10 pl-4">
                {/* Avatar na Navbar (Opcional - Adicionado para completar o visual) */}
                {session.user?.image ? (
                    <Link href="/perfil" title="Ir para o Perfil">
                        <img 
                            src={session.user.image} 
                            alt="Avatar" 
                            className="w-8 h-8 rounded-full border border-gray-600 object-cover hover:ring-2 ring-blue-500 transition-shadow" 
                        />
                    </Link>
                ) : (
                    <Link href="/perfil" title="Ir para o Perfil">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white border border-gray-600">
                            {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                    </Link>
                )}


                <span className="text-sm text-gray-400 hidden lg:block">
                  Olá, <span className="text-white font-medium">{session.user?.name}</span>
                </span>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => signOut()}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Sair</span>
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-white hover:bg-white/10">
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" asChild className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white hover:shadow-blue-500/20 border-0">
                  <Link href="/registrar">Registrar</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/20 border border-blue-500/30 text-blue-400 backdrop-blur-md">
              <Sparkles className="h-3 w-3" />
              <span className="text-xs font-bold tracking-wide uppercase">Bem-vindo à comunidade</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Descubra e Compartilhe <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400">
                Conteúdo Incrível
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Uma plataforma moderna para criar, compartilhar e descobrir posts interessantes.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button size="lg" asChild className="h-12 px-8 bg-white text-black font-bold rounded-full hover:scale-105 hover:shadow-[0_0_30px_-10px_rgba(37,99,235,0.4)] transition-all">
                <Link href="/post" className="flex items-center gap-2">
                  Ver todos os posts recentes
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              
              {!session && (
                  <Button size="lg" variant="outline" asChild className="h-12 px-8 rounded-full border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white hover:border-gray-500 bg-transparent">
                    <Link href="/registrar">Criar Conta</Link>
                  </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 border-y border-white/5 bg-black/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="pt-6 flex justify-between items-center">
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Posts</p>
                        <p className="text-3xl font-bold text-white mt-1">
                          {loading ? <Loader2 className="animate-spin h-6 w-6"/> : stats.totalPosts}
                        </p>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                        <LayoutGrid className="h-6 w-6" />
                    </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="pt-6 flex justify-between items-center">
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Usuários</p>
                        <p className="text-3xl font-bold text-white mt-1">
                          {loading ? <Loader2 className="animate-spin h-6 w-6"/> : stats.totalUsers}
                        </p>
                    </div>
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                        <User className="h-6 w-6" />
                    </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="pt-6 flex justify-between items-center">
                    <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Comentários</p>
                        <p className="text-3xl font-bold text-white mt-1">
                          {loading ? <Loader2 className="animate-spin h-6 w-6"/> : stats.totalComments}
                        </p>
                    </div>
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                        <MessageCircle className="h-6 w-6" />
                    </div>
                </CardContent>
              </Card>
          </div>
        </div>
      </section>

      {/* Posts Section (Preview) */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                Destaques
              </h2>
              <p className="text-gray-400">
                Veja o que está acontecendo agora.
              </p>
            </div>
            
            <Button variant="ghost" asChild className="hidden md:flex text-blue-400 hover:text-blue-300 hover:bg-blue-900/20">
                <Link href="/post" className="flex items-center gap-2">
                    Ver todos os posts <ArrowRight className="h-4 w-4" />
                </Link>
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post._id} className="group overflow-hidden bg-gray-900 border-gray-800 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 flex flex-col">
                  
                  {/* --- IMAGEM --- */}
                  <div className="relative w-full h-48 overflow-hidden bg-gray-800">
                    <img 
                      src={post.imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"} 
                      alt={post.title} 
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
                  </div>
                  {/* ----------------- */}

                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-xl text-white group-hover:text-blue-400 transition-colors">
                        {post.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <User className="h-3 w-3" />
                      
                      {/* --- CORREÇÃO DO ERRO Cannot read properties of null (reading 'name') --- */}
                      <span>{(post.author as any)?.name ?? 'Autor Desconhecido'}</span> 
                      
                      <span>•</span>
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.createdAt).toLocaleDateString("pt-BR")}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">{post.content}</p>
                  </CardContent>
                  <CardFooter className="mt-auto">
                      <Button variant="link" size="sm" className="p-0 text-blue-400 hover:text-blue-300 group-hover:translate-x-1 transition-transform" asChild>
                          <Link href={`/post/${post._id}`}>Ler mais <ArrowRight className="h-3 w-3 ml-1" /></Link>
                      </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {!loading && posts.length === 0 && (
              <div className="text-center py-16 bg-gray-900/30 border border-gray-800 border-dashed rounded-2xl">
                <Sparkles className="h-10 w-10 text-gray-600 mx-auto mb-3 opacity-50"/>
                <p className="text-gray-500">Nenhum destaque no momento.</p>
              </div>
          )}

          <div className="mt-12 text-center md:hidden">
            <Button size="lg" className="w-full bg-gradient-to-r from-blue-700 to-indigo-600 text-white font-bold" asChild>
                <Link href="/post">Ver todos os posts</Link>
            </Button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 py-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
            <ShoppingBag className="h-5 w-5 text-gray-400" />
            <span className="font-bold text-gray-300">F1 BLOG</span>
        </div>
        <p className="text-gray-600 text-sm">© 2024 F1 BLOG. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}