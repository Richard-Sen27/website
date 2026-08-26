import "server-only";

import { getCopy, type CopyReader } from "copy-ink/server";
import type { CollectionItem, ContentData, ImageNode } from "copy-ink";

/**
 * Helpers on top of copy-ink's server API.
 *
 * `CollectionItem` exposes `data` but no accessors, and copy-ink has no
 * repeatable field type yet — so lists (tags, nav links, timeline entries) live
 * as plain YAML sequences read through `raw()`. These wrap both patterns so
 * pages never index into `data` by hand.
 */

/** Reads a dot path out of any content record. */
function atPath(data: unknown, field: string): unknown {
  return field
    .split(".")
    .reduce<unknown>(
      (node, key) =>
        node && typeof node === "object"
          ? (node as Record<string, unknown>)[key]
          : undefined,
      data,
    );
}

/* -- collection item access ------------------------------------------------ */

/** Scalar field on a collection item, coerced to a string. */
export function field(item: CollectionItem, path: string): string {
  const value = atPath(item.data, path);
  if (value === undefined || value === null || typeof value === "object") {
    return "";
  }
  return String(value);
}

/** Raw node on a collection item — typed nodes, sequences, nested mappings. */
export function raw(item: CollectionItem, path: string): unknown {
  return atPath(item.data, path);
}

export function flag(item: CollectionItem, path: string): boolean {
  return atPath(item.data, path) === true;
}

/* -- sequences ------------------------------------------------------------- */

type RawSource = Pick<CopyReader, "raw"> | CollectionItem;

function rawFrom(source: RawSource, path: string): unknown {
  return "raw" in source && typeof source.raw === "function"
    ? source.raw(path)
    : atPath((source as CollectionItem).data, path);
}

/** A YAML sequence of scalars, e.g. `tags: [Next.js, PostgreSQL]`. */
export function stringList(source: RawSource, path: string): string[] {
  const value = rawFrom(source, path);
  return Array.isArray(value) ? value.map(String) : [];
}

/** A YAML sequence of mappings, e.g. nav links or timeline entries. */
export function objectList<T>(source: RawSource, path: string): T[] {
  const value = rawFrom(source, path);
  return Array.isArray(value) ? (value as T[]) : [];
}

/**
 * Narrows to an image node. copy-ink exports the `ImageNode` type from its root
 * but not its `isImageNode` guard, so the structural check is repeated here.
 */
function isImageNode(value: unknown): value is ImageNode {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as { _type?: unknown })._type === "image"
  );
}

/** An `_type: image` node, or null when absent or malformed. */
export function image(source: RawSource, path: string): ImageNode | null {
  const value = rawFrom(source, path);
  return isImageNode(value) ? value : null;
}

/* -- global scope ---------------------------------------------------------- */

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink extends NavLink {
  handle?: string;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export interface StackEntry {
  name: string;
  /** Filename in public/tech, without extension. Omitted where none exists. */
  icon?: string;
  group: string;
}

export interface Award {
  date: string;
  /** "1st", "2nd", "Award" — rendered as a rank chip. */
  place: string;
  title: string;
  org: string;
  note?: string;
}

/**
 * Site-wide content. copy-ink resolves scope from the current route, so the
 * global scope has to be asked for explicitly.
 */
export function getGlobal(): Promise<CopyReader> {
  return getCopy({ scope: "_global" });
}

export type { CollectionItem, ContentData, CopyReader, ImageNode };
