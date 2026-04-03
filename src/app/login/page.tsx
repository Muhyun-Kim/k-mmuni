import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signInWithEmail, signUpWithEmail } from "./actions";

export default function LoginMain() {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="w-1/4">ログイン</h1>
      <div className="flex flex-col w-1/4 gap-4">
        <Button asChild className="w-full">
          <Link href="/auth/google">googleでログイン</Link>
        </Button>
      </div>
      <hr className="w-1/4" />
      <form action={signInWithEmail} className="flex flex-col w-1/4 gap-4">
        <input type="email" name="email" placeholder="メールアドレス" />
        <input type="password" name="password" placeholder="パスワード" />
        <Button className="w-full">ログイン</Button>
      </form>
      <form action={signUpWithEmail} className="flex flex-col w-1/4 gap-4">
        <input type="email" name="email" placeholder="メールアドレス" />
        <input type="password" name="password" placeholder="パスワード" />
        <Button variant="outline" className="w-full">新規登録</Button>
      </form>
    </div>
  );
}
