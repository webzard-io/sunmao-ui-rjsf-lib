import ReactDOM from "react-dom";
// @ts-ignore
import { initSunmaoUIEditor } from "@sunmao-ui/editor";
import { sunmaoRjsfLib } from "./lib";

const { Editor } = initSunmaoUIEditor({
  libs: [sunmaoRjsfLib],
  defaultApplication: {
    kind: "Application",
    version: "arco/v1",
    metadata: {
      name: "scf",
    },
    spec: {
      components: [],
    },
  },
});

// @ts-ignore
ReactDOM.render(<Editor />, document.getElementById("root"));
