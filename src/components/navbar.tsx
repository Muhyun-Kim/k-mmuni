import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/[lang]/login/actions";
import { LocaleSwitcher } from "@/components/locale-switcher";
import type { Locale } from "@/i18n/config";

type NavDict = {
  login: string;
  tutors: string;
  logout: string;
};

export async function Navbar({ lang, dict }: { lang: Locale; dict: NavDict }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b mb-8">
      <nav className="mx-auto flex h-14 max-w-5xl justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href={`/${lang}`} className="text-lg font-bold">
            K-mmuni
          </Link>
          <Link href={`/${lang}/tutors`} className="text-sm">
            {dict.tutors}
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <LocaleSwitcher lang={lang} />
          {user ? (
            <form action={signOut}>
              <input type="hidden" name="lang" value={lang} />
              <button type="submit" className="text-sm hover:underline">
                {dict.logout}
              </button>
            </form>
          ) : (
            <Link href={`/${lang}/login`} className="text-sm hover:underline">
              {dict.login}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
