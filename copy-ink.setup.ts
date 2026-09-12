import {
  GitHubAuthProvider,
  setServices,
  setupCopyInk,
} from "copy-ink/server";

import config from "./copy-ink.config";
import { site } from "@/lib/site";

/**
 * Registers the config once per process. Imported by the root layout so it runs
 * before anything renders.
 */
const runtime = setupCopyInk(config);

/**
 * Pins the OAuth redirect to the site's public origin.
 *
 * copy-ink builds the redirect from `new URL(request.url).origin`, and in a
 * standalone build that origin is the *bind* address, not the host the visitor
 * typed: `.next/standalone/server.js` always passes a hostname to `startServer`
 * (`process.env.HOSTNAME || '0.0.0.0'`), and Next then hardcodes the absolute
 * URL from it rather than reading the Host header — see `fetchHostname` in
 * next/dist/server/next-server.js. Behind Dokploy's proxy that yields
 * `https://0.0.0.0:3000/...`, which GitHub rejects as a redirect_uri mismatch.
 *
 * `experimental.trustHostHeader` is not a way out: it sits in the branch Next
 * only reaches when no hostname was passed, and standalone always passes one.
 * So the origin is fixed here instead, where it is deterministic and matches
 * the callback URL registered on the GitHub App.
 */
function onSiteOrigin(redirectUri: string): string {
  return new URL(new URL(redirectUri).pathname, site.url).toString();
}

class SiteOriginGitHubAuth extends GitHubAuthProvider {
  override authorizeUrl(input: { redirectUri: string; state: string }) {
    return super.authorizeUrl({
      ...input,
      redirectUri: onSiteOrigin(input.redirectUri),
    });
  }

  override exchange(input: { code: string; redirectUri: string }) {
    return super.exchange({
      ...input,
      redirectUri: onSiteOrigin(input.redirectUri),
    });
  }
}

// Left alone without credentials, so `next dev` keeps copy-ink's local auth
// provider and still needs no GitHub App.
const clientId = process.env.COPY_INK_GITHUB_CLIENT_ID;
const clientSecret = process.env.COPY_INK_GITHUB_CLIENT_SECRET;

if (clientId && clientSecret) {
  setServices({ auth: new SiteOriginGitHubAuth({ clientId, clientSecret }) });
}

export default runtime;
