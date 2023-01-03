import { initNavigation } from "@noriginmedia/react-spatial-navigation";

import "./styles.css";
import VirtualizedList from "./VirtualizedList";

initNavigation();

export default function App() {
  return (
    <div className="App">
      <VirtualizedList />
    </div>
  );
}
