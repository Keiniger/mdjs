import { Endline } from "./Endline";

const mdjs = {
  h1: (s) => "# " + s,
  h2: (s) => "## " + s,
  h3: (s) => "### " + s,
  h4: (s) => "#### " + s,
  h5: (s) => "##### " + s,
  h6: (s) => "###### " + s,

  b: (s) => "**" + s + "**",
  em: (s) => "__" + s + "__",

  line: () => "---",
  ol: (a) => a.map((x, i) => `${i + 1}. ${x}`).join(Endline),
  ul: (a) => a.map((x) => `- ${x}`).join(Endline),
  quote: (s) => "> " + s,
};

(window as any).mdjs = mdjs

export { mdjs };
