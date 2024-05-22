import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrganizationManager from './components/Organization/OrganizationsManager';
import UserManager from './components/User/UsersManager';

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<OrganizationManager />} />
            <Route path="/organization/:id/users" element={<UserManager />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
