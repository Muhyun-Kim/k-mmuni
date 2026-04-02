import { Button } from "@/components/ui/button";

export default function LoginMain() {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="w-1/4">ログイン</h1>
      <div className="flex flex-col w-1/4 gap-4">
        <Button className="w-full">googleでログイン</Button>
      </div>
      <hr className="w-1/4" />
      <form className="flex flex-col w-1/4 gap-4">
        <input type="email" placeholder="メールアドレス" />
        <input type="password" placeholder="パスワード" />
        <Button className="w-full">ログイン</Button>
      </form>
    </div>
  );
}
