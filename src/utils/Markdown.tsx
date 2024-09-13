import Markdown from "markdown-to-jsx";
import { ReactNode } from "react";
import styles from "../components/Markup.module.scss"
import { Endline } from "./Endline";

export function evalMdLines(lines: string): ReactNode[] {
    return lines?.split(Endline).map((line, i) =>
        <Markdown className={styles.line} key={i} options={{ forceBlock: true }}>
            {String(line).toString()}
        </Markdown>
    );
}