export type AnsiSegment = { color: string | null; text: string };

// SGR (Select Graphic Rendition) sequences only, e.g. "\x1b[38;2;244;194;0m", "\x1b[0m"
const SGR_PATTERN = /\x1b\[([\d;]*)m/g;

const toHex = (n: number) => n.toString(16).padStart(2, "0");

/**
 * Parse ANSI art that uses 24-bit foreground colors (38;2;R;G;B) and resets (0)
 * into color segments. Adjacent segments with the same color are merged, and
 * whitespace-only text is folded into the previous segment to keep the span count low.
 */
export const parseAnsi = (src: string): AnsiSegment[] => {
  const segments: AnsiSegment[] = [];
  let color: string | null = null;
  let lastIndex = 0;

  const push = (text: string) => {
    if (!text) return;
    const prev = segments.at(-1);
    if (prev && (prev.color === color || /^\s+$/.test(text))) {
      prev.text += text;
    } else {
      segments.push({ color, text });
    }
  };

  for (const match of src.matchAll(SGR_PATTERN)) {
    push(src.slice(lastIndex, match.index));
    lastIndex = match.index + match[0].length;

    const params = match[1].split(";").map(Number);
    if (params[0] === 38 && params[1] === 2) {
      color = `#${params.slice(2, 5).map(toHex).join("")}`;
    } else if (match[1] === "" || params[0] === 0) {
      color = null;
    }
  }
  push(src.slice(lastIndex));

  return segments;
};
