-- auth.users에 새 유저가 생성되면 public.user 테이블에 자동 삽입
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public."user" (id, email, nickname, updated_at)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    now()
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
