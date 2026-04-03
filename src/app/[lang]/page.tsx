import { Button } from "@/components/ui/button";
import { getDictionary, hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const t = dict.home;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>{t.welcome}</h1>
      <div className="flex gap-4">
        <Link href={`/${lang}/tutors`}>
          <Button>{t.searchTutors}</Button>
        </Link>
        <Link href={`/${lang}/tutors/register`}>
          <Button>{t.registerTutor}</Button>
        </Link>
      </div>
    </div>
  );
}
