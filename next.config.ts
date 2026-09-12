import type { NextConfig } from "next";

/**
 * How many workers `next build` may fork to collect page data and prerender.
 *
 * Next forks one static worker per CPU minus one, and inside a container
 * `os.cpus()` reports the *host's* core count, not the container's quota. Every
 * worker loads the whole server bundle, and this app drags Shiki's grammars and
 * a resvg WASM instance per OG route in with it, so the fan-out is what spikes
 * memory the instant Next dispatches workers. On a build host that is also
 * running other things, the OOM killer takes the host down rather than the
 * build. Next strips `--max-old-space-size` from these workers on purpose
 * (`isolatedMemory` in build/index.ts), so NODE_OPTIONS cannot cap them either:
 * the worker count is the only lever there is.
 *
 * The site is ~33 routes, which one worker prerenders in about a second. Raise
 * NEXT_BUILD_CPUS on a machine with memory to spare.
 */
const cpus = Number(process.env.NEXT_BUILD_CPUS) || 1;

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    cpus,
    // Pages in flight per worker. The default of 8 means eight concurrent
    // renders, and the OG routes hold a WASM instance for the length of one.
    staticGenerationMaxConcurrency: 4,
  },
};

export default nextConfig;
