import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Dashboard from './pages/Dashboard';
import DashboardBeneficios from './pages/beneficios/Dashboard';
import {EditarBeneficio} from './pages/beneficios/EditarBeneficio';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/beneficios" element={<DashboardBeneficios />} />
          <Route exact path="/editarBeneficio/:id" element={<EditarBeneficio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
