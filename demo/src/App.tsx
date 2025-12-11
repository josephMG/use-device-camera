import "./App.css";
import { CameraProvider } from "use-device-camera";
import { Camera } from "./components";

function App() {

  return (
    <CameraProvider defaultConstraints={{ video: { width: document?.body?.clientWidth, height: document?.body?.clientHeight, facingMode: 'environment' } }}>
      <Camera />
    </CameraProvider>
  );
}

export default App;
