
import { ApolloProvider } from '@apollo/client';
import Interface from './components/Interface';
import { client } from './util/apolloClient';
//contexts
import { PetProvider } from './contexts/PetContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

function App() {
  return (
    
    <div className="flex flex-col">
 
      <ApolloProvider client={client}>
      <PetProvider>
        <Header
        />
        <Interface className="flex flex-row bg-green-100"/>
        <BottomNav />
      </PetProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
