import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b mb-8">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold">
          K-mmuni
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm hover:underline">
            ログイン
          </Link>
        </div>
      </nav>
    </header>
  );
}
