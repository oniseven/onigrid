import { useState } from "react"
import { paggingItf } from "./Types";

const usePagging = () => {
  const [pagging, setPagging] = useState<paggingItf>({
    index: 0,
    rows: 10,
    size: 1,
    canGoBack: false,
    canGoForward: false,
  });

  return {pagging, setPagging}
}

export default usePagging;