/**
 * Structured data emitter. Kept as a component so the serialisation and the
 * XSS guard live in one place rather than at every call site.
 */
export default function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // `<` is escaped so a stray "</script>" inside content cannot close the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
