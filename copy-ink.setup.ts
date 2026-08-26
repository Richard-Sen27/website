import { setupCopyInk } from "copy-ink/server";

import config from "./copy-ink.config";

/**
 * Registers the config once per process. Imported by the root layout so it runs
 * before anything renders.
 */
export default setupCopyInk(config);
