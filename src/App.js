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
import {NovoFuncionario} from './pages/clientes/NovoFuncionario';

// import funcionarios
import {EditarFuncionario} from './pages/funcionarios/EditarFuncionario';
import {BeneficiosFuncionario} from './pages/funcionarios/BeneficiosFuncionario';




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
          <Route exact path="/novoFuncionario/:id" element={<NovoFuncionario />} />

          <Route exact path="/editarFuncionario/:id" element={<EditarFuncionario />} />
          <Route exact path="/beneficiosFuncionario/:id" element={<BeneficiosFuncionario />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
