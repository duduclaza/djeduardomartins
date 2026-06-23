"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, getSession } from "next-auth/react";
import { ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("E-mail ou senha inválidos.");
      setLoading(false);
      return;
    }

    const session = await getSession();
    if (session?.user.role !== "ADMIN") {
      await signOut({ redirect: false });
      setError("Esta conta não tem permissão de webmaster.");
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-5 flex items-center justify-center bg-gradient-to-b from-[#07020f] to-[#0c0418]">
      <div className="w-full max-w-md glass-panel glow-border rounded-2xl p-8">
        <p className="uppercase tracking-[0.3em] text-xs text-neon-gold mb-2 text-center">
          Restrito
        </p>
        <h1 className="font-display text-2xl text-white text-center mb-6">
          Acesso Webmaster
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            required
            placeholder="e-mail do webmaster"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg bg-black/30 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-neon-gold"
          />
          <input
            type="password"
            required
            placeholder="senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg bg-black/30 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-neon-gold"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" disabled={loading} className="btn-neon mt-2">
            <ShieldCheck size={18} /> {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
