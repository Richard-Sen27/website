/**
 * Stamps the request pathname onto a header so Server Components can resolve
 * the current copy-ink scope.
 *
 * Next 16 renamed `middleware.ts` to `proxy.ts` and the export to `proxy`; the
 * handler itself is unchanged. copy-ink's docs still show the `middleware.ts`
 * form, which works but is deprecated.
 * @see https://nextjs.org/docs/messages/middleware-to-proxy
 */
export { copyInkMiddleware as proxy } from "copy-ink/middleware";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|webp|svg|ico|xml|txt)$).*)"],
};
