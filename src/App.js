import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import Dashboard from './pages/Dashboard';

// imports benefícios
import DashboardBeneficios from './pages/beneficios/Dashboard';
import {EditarBeneficio} from './pages/beneficios/EditarBeneficio';

// imports clientes
import DashboardClientes from './pages/clientes/Dashboard';
import {EditarCliente} from './pages/clientes/EditarCliente';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/beneficios" element={<DashboardBeneficios />} />
          <Route exact path="/editarBeneficio/:id" element={<EditarBeneficio />} />

          <Route exact path="/clientes" element={<DashboardClientes />} />
          <Route exact path="/editarCliente/:id" element={<EditarCliente />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
