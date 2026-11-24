/**
 * MeetingGhost — Absurd Micro-Startup Pitch-Off
 *
 * A tiny program that writes exactly one sentence — the pitch for
 * MeetingGhost, a micro-startup for lazy AI agents — to
 * /output/entry.txt, the path the make.fun gate reads.
 *
 * The pitch itself is stored as structured data (name, customer,
 * moment, service, price, payer) and rendered to a single sentence,
 * so the sentence the gate sees is assembled from its business
 * parts rather than pasted as an opaque string. The program then
 * validates the rendered sentence against the competition gate
 * (UTF-8 text, 1-200 characters, not only whitespace) before it
 * writes anything, and refuses to write an invalid entry.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const DEFAULT_OUTPUT_PATH = "/output/entry.txt";
const MIN_CHARS = 1;
const MAX_CHARS = 200;

/**
 * Resolve the output path. The grader runs `node main.ts` with no
 * arguments, so the default is always /output/entry.txt; an
 * explicit --output <path> is accepted only for local testing,
 * and any other argument is rejected rather than ignored, so a
 * typo can never silently change where the entry lands.
 */
function resolveOutputPath(argv: string[]): string {
  const flag = argv.indexOf("--output");
  if (flag === -1) {
    if (argv.length > 0) {
      throw new Error(`unexpected argument(s): ${argv.join(" ")}`);
    }
    return DEFAULT_OUTPUT_PATH;
  }
  const value = argv[flag + 1];
  if (value === undefined || value.startsWith("--")) {
    throw new Error("--output needs a path");
  }
  if (argv.length > flag + 2) {
    throw new Error(`unexpected argument(s): ${argv.slice(flag + 2).join(" ")}`);
  }
  return value;
}

interface Pitch {
  /** The startup's name. */
  name: string;
  /** The exact moment the service covers. */
  moment: string;
  /** What the service does in that moment. */
  service: string;
  /** The catchphrase it delivers on camera. */
  catchphrase: string;
  /** Who pays for it. */
  payer: string;
  /** What it costs, per unit. */
  price: string;
}

const PITCH: Pitch = {
  name: "MeetingGhost",
  moment: "the 7 a.m. standup your lazy agent slept through",
  service: "nods on camera and says \"sounds good\" at the right moment",
  catchphrase: "sounds good",
  payer: "its owner",
  price: "$2 a meeting",
};

function renderPitch(pitch: Pitch): string {
  // One sentence: name + moment + service + payer + price.
  // The catchphrase lives inside the service clause, so the
  // sentence stays a single sentence with a single full stop.
  return (
    `${pitch.name} attends ${pitch.moment}, ` +
    `${pitch.service}, billing ${pitch.payer} ${pitch.price}.`
  );
}

function validateEntry(text: string): void {
  if (typeof text !== "string") {
    throw new Error("entry must be a string");
  }
  const chars = [...text];
  if (chars.length < MIN_CHARS || chars.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  // Must be exactly one sentence: a single trailing full stop,
  // and no other sentence-ending punctuation inside it. The
  // abbreviation in "7 a.m." holds periods that are not sentence
  // ends, so it is blanked out before the check runs.
  const body = text.slice(0, -1).replace(/\ba\.m\./gi, "").replace(/\bp\.m\./gi, "");
  if (!text.endsWith(".")) {
    throw new Error("entry must end with a single full stop");
  }
  if (/[.!?]/.test(body)) {
    throw new Error("entry must be exactly one sentence");
  }
  // Round-trip through UTF-8: the gate reads UTF-8 text, so any
  // character that does not survive the round trip is rejected.
  const roundTripped = Buffer.from(text, "utf8").toString("utf8");
  if (roundTripped !== text) {
    throw new Error("entry must be valid UTF-8 text");
  }
}

function main(): void {
  const outputPath = resolveOutputPath(process.argv.slice(2));
  const entry = renderPitch(PITCH);
  validateEntry(entry);
  mkdirSync(dirname(outputPath), { recursive: true });
  // No trailing newline: the file holds exactly the pitch, so its
  // byte count equals the pitch's character count.
  writeFileSync(outputPath, entry, "utf8");
  const bytes = Buffer.byteLength(entry, "utf8");
  console.log(`Wrote ${entry.length} chars (${bytes} bytes) to ${outputPath}`);
}

main();
