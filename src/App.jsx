import { Outlet } from 'react-router-dom';

import { AuthProvider } from './contexts/auth';
import { DadosProvider } from './contexts/dados';
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {

  return (
    <>
      <AuthProvider>
        <DadosProvider>
          <Header />
          <Outlet />
          <Footer />
        </DadosProvider>
      </AuthProvider>
    </>
  );
};

export default App;


