const TutorialText = `
\`
# Welcome to MDJS!

---

MDJS is a Javascript playground that
formats each line evaluation to Markdown
You can test this out by running
this on the left panel:
\`

const a = "hello world!"

a

\`
1. Use **bold** and _italic_ styling just like in Markdown
2. Use require(package) to install packages
3. Create async functions and await them easily
- You can also create unordered lists

> and multi-line
> quotes!


There are also some functions to make things easier
e.g.:
\`
mdjs.h5\`this is an h5\`
mdjs.line()

mdjs.b("this is a bold text")

const listOfFoods = ["pizza", "spaghetti"]
mdjs.ol(listOfFoods)

// Comments are ignored 

/*
And multi line comments are also ignored. 
Try uncommenting this:
require("lodash")
console.log(_.chunk(['a', 'b', 'c', 'd'], 2))
*/

\`
Objects are shown like this:
\`
const obj = {a: 1, b:2, c:3}
obj

// Only the last error will be shown,
// And it will appear like this:
null.something`

export {TutorialText}