import { createCopyInkHandler } from "copy-ink/server";

import copyInk from "~/copy-ink.setup";

export const { GET, POST } = createCopyInkHandler(copyInk);
export const runtime = "nodejs";
