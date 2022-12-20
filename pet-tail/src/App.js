
import Interface from './components/Interface';
//contexts
import { PetProvider } from './contexts/PetContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

function App() {
  return (
    
    <div className="flex flex-col">
 
      <PetProvider>
        <Header
        />
        <Interface className="flex flex-row bg-green-100"/>
        <BottomNav />
      </PetProvider>
    </div>
  );
}

export default App;
