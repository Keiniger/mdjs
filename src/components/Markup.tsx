import { useSelector } from "react-redux";
import { evalMdLines } from "../utils/Markdown";
import { MarkupLanguages, selectMarkup } from "../redux/slices/markupSlice";
import styles from "./Markup.module.scss";
import { VSCodeDropdown, VSCodeOption } from "@vscode/webview-ui-toolkit/react";

export function Markup() {
  const markup = useSelector(selectMarkup);
  const Dropdown = (
    <VSCodeDropdown className={styles.dropdown}>
      {Object.values(MarkupLanguages).map((l, i) => (
        <VSCodeOption key={i}> {l}</VSCodeOption>
      ))}
    </VSCodeDropdown>
  );

  return (
    <div className={styles.output}>
      {evalMdLines(markup)}
      {/*Dropdown*/}
    </div>
  );
}
