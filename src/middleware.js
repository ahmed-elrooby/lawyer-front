import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  // ==========================================
  // الصفحة الرئيسية = Login
  // ==========================================

  if (pathname === "/") {
    // مش مسجل دخول
    if (!token) {
      return NextResponse.next();
    }

    // Admin
    if (role === "admin") {
      return NextResponse.redirect(
        new URL("/Admin", request.url)
      );
    }

    // Office Owner
    if (role === "office_owner") {
      return NextResponse.redirect(
        new URL("/Lawyer_Owner", request.url)
      );
    }

    // Lawyer
    if (role === "lawyer") {
      return NextResponse.redirect(
        new URL("/Lawyer", request.url)
      );
    }

    // Token موجود لكن Role غير موجود أو غير صحيح
    const response = NextResponse.next();

    response.cookies.delete("token");
    response.cookies.delete("role");

    return response;
  }

  // ==========================================
  // أي صفحة غير Login لازم يكون فيه Token
  // ==========================================

  if (!token) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  // ==========================================
  // ADMIN
  // ==========================================

  if (pathname.startsWith("/Admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    return NextResponse.next();
  }

  // ==========================================
  // OFFICE OWNER
  // ==========================================

  if (pathname.startsWith("/Lawyer_Owner")) {
    if (role !== "office_owner") {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    return NextResponse.next();
  }

  // ==========================================
  // LAWYER
  // ==========================================

  if (pathname.startsWith("/Lawyer")) {
    if (role !== "lawyer") {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};