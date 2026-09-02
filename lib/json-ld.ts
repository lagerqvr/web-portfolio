/**
 * Serialise a server-built object for embedding in a `<script type="application/ld+json">`.
 *
 * This is the one place the codebase uses `dangerouslySetInnerHTML`: React
 * escapes text children of `<script>`, which would corrupt the JSON. Some values
 * originate in admin-editable content, so the payload is escaped rather than
 * trusted — `<` can no longer form `</script>` or `<!--`, and U+2028/U+2029 are
 * neutralised because they are literal line terminators in JavaScript source
 * while being legal inside a JSON string.
 */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
