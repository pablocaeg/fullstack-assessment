import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import OrganizationManager from './components/OrganizationManager';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <OrganizationManager />
      </main>
      <Footer />
    </div>
  );
};

export default App;
