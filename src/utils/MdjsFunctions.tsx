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
  ol: (a) => a.map((x, i) => `${i + 1}. ${x}`).join("\n"),
  ul: (a) => a.map((x) => `- ${x}`).join("\n"),
  quote: (s) => "> " + s,
};

export { mdjs };
