import './App.css';
import PathVisualizer from './Pages/PathVisualizer';
import { GridStoreProvider } from './Stores/GridStoreContext';

function App() {
  return (
    <div className="App">
      <GridStoreProvider rows = {30} columns = {50}>
        <PathVisualizer/>
      </GridStoreProvider>  
    </div>
  );
}

export default App;
