import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { locales, defaultLocale } from "@/i18n/config";

function getLocale(request: NextRequest): string {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  const languages = new Negotiator({ headers }).languages();
  return match(languages, [...locales], defaultLocale);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip locale redirect for auth routes, static files, etc.
  const isIgnored =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    /\.(?:svg|png|jpg|jpeg|gif|webp)$/.test(pathname);

  if (isIgnored) {
    const { response } = await handleSupabaseAuth(request);
    return response;
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Handle Supabase auth and get user
  const { response, user } = await handleSupabaseAuth(request);

  // locale을 제외한 경로 (e.g. /ja/login → /login, /ja → /)
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";

  // Redirect logged-in users away from login page
  if (user && pathWithoutLocale === "/login") {
    const locale = pathname.split("/")[1];
    request.nextUrl.pathname = `/${locale}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Public pages that don't require login
  const publicPaths = ["/", "/login", "/tutors"];
  const privatePaths = ["/tutors/register"];
  const isPrivate = privatePaths.some(
    (p) => pathWithoutLocale === p || pathWithoutLocale.startsWith(p + "/"),
  );
  const isPublic =
    !isPrivate &&
    publicPaths.some(
      (p) => pathWithoutLocale === p || pathWithoutLocale.startsWith(p + "/"),
    );

  // Redirect unauthenticated users to login
  if (!user && !isPublic) {
    const locale = pathname.split("/")[1];
    request.nextUrl.pathname = `/${locale}/login`;
    return NextResponse.redirect(request.nextUrl);
  }

  return response;
}

async function handleSupabaseAuth(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          supabaseResponse = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            supabaseResponse.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();

  return { response: supabaseResponse, user };
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
