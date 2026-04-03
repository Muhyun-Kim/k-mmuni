import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/login/actions";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b mb-8">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold">
          K-mmuni
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <form action={signOut}>
              <button type="submit" className="text-sm hover:underline">
                ログアウト
              </button>
            </form>
          ) : (
            <Link href="/login" className="text-sm hover:underline">
              ログイン
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
