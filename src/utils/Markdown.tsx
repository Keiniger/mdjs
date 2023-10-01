import Markdown from "markdown-to-jsx";
import { ReactNode } from "react";
import styles from "../components/Markup.module.scss"
export function evalMdLines(lines: string): ReactNode[] {
    return lines?.split('\n').map((line, i) =>
        <Markdown className={styles.line} key={i} options={{ forceBlock: true }}>
            {String(line).toString()}
        </Markdown>
    );
}