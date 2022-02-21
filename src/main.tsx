import ReactDOM from "react-dom";
import { initSunmaoUIEditor } from "@sunmao-ui/editor";
import { sunmaoRjsfLib } from "./lib";
import "@sunmao-ui/editor/dist/esm/index.css";
import "./main.css";

const { Editor } = initSunmaoUIEditor({
  libs: [sunmaoRjsfLib],
  defaultApplication: {
    kind: "Application",
    version: "arco/v1",
    metadata: {
      name: "rjsf",
    },
    spec: {
      components: [],
    },
  },
});

ReactDOM.render(<Editor />, document.getElementById("root"));
