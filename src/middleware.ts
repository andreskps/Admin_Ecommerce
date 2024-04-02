import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    
    if (!req.nextauth.token?.roles?.includes("admin")) {
      return NextResponse.rewrite(
        new URL("/denied", req.url)
      )
    }

    if (req.nextauth.token?.roles?.includes("usuario")) {
      return NextResponse.rewrite(
        new URL("/", req.url)
      )
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = { matcher: ["/admin/:path*"] }