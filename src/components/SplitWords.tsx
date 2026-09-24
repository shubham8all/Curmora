import { Fragment, type CSSProperties } from "react";

/** Renders text word by word so each word can rise out of its own mask (see `.word` in globals.css). */
export function SplitWords({ text, offset = 0 }: { text: string; offset?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="word">
            <span style={{ "--i": i + offset } as CSSProperties}>{word}</span>
          </span>
          {/* The space sits between masks: inside an inline-block it would collapse. */}
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}
