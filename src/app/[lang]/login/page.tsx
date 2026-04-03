import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDictionary, hasLocale } from "../dictionaries";
import { signInWithEmail, signUpWithEmail } from "./actions";

export default async function LoginPage({ params }: PageProps<"/[lang]/login">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.login;

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="w-1/4">{t.title}</h1>
      <div className="flex flex-col w-1/4 gap-4">
        <Button asChild className="w-full">
          <Link href="/auth/google">{t.google}</Link>
        </Button>
      </div>
      <hr className="w-1/4" />
      <form action={signInWithEmail} className="flex flex-col w-1/4 gap-4">
        <input type="hidden" name="lang" value={lang} />
        <input type="email" name="email" placeholder={t.email} />
        <input type="password" name="password" placeholder={t.password} />
        <Button className="w-full">{t.submit}</Button>
      </form>
      <form action={signUpWithEmail} className="flex flex-col w-1/4 gap-4">
        <input type="hidden" name="lang" value={lang} />
        <input type="email" name="email" placeholder={t.email} />
        <input type="password" name="password" placeholder={t.password} />
        <Button variant="outline" className="w-full">{t.signup}</Button>
      </form>
    </div>
  );
}
