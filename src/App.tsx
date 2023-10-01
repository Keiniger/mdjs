import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectText, updatedText } from './redux/slices/textSlice';
import { selectCode } from './redux/slices/codeSlices';
import { updatedMarkup } from './redux/slices/markupSlice';
import { Text } from './components/Text';
import { Code } from './components/Code';
import { Markup } from './components/Markup';
import { evalJsLines } from './utils/Javascript';
import styles from './App.module.scss';

function App() {
  const code = useSelector(selectCode);
  const text = useSelector(selectText);
  const dispatch = useDispatch();

  const [seconds, setSeconds] = useState(0);
  const [disableSetSeconds, setDisableSetSeconds] = useState(false);

  useEffect(() => {
    const processLines = async (lines?: string) => {
      if (disableSetSeconds || !lines) return
      const evaluatedJsLines = await evalJsLines(lines)
      dispatch(updatedText(evaluatedJsLines));
    }

    processLines(code);
  }, [code, seconds])

  useEffect(() => {
    dispatch(updatedMarkup(text));
  }, [text])


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSeconds(seconds => seconds + 1);
  //   }, 6000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className={styles.appContainer}>
      <div className={styles.tabs}>
        tabs
      </div >
      <div className={styles.editors}>
        <Code setDisableSetSeconds={setDisableSetSeconds} />
        <Text setDisableSetSeconds={setDisableSetSeconds} />
        <Markup />
      </div>
    </div>
  )
}

export default App
