import CreatePaciente from "../components/pacientes/CreatePaciente";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ViewPaciente from "../components/pacientes/ViewPaciente";
import ViewsPacientes from "../components/pacientes/ViewsPacientes";
import NotFound from "../components/NotFound";
import ViewsEnfermedades from "../components/pacientes/AllSintomas";
const AdminRouter = () => {
  return (
    <Switch>
      <Route exact path="/home/admin-pacientes" component={CreatePaciente} />
      <Route
        exact
        path="/home/admin-pacientes/pacientes"
        component={ViewsPacientes}
      />
      <Route 
        exact 
        path="/home/admin-pacientes/sintomas" 
        component={ViewsEnfermedades} />
      <Route
        exact
        path="/home/admin-pacientes/paciente/:id"
        component={ViewPaciente}
      />
      <Route path="/*" component={NotFound}>
        <Redirect to="/page-not-found" />
      </Route>
    </Switch>
  );
};

export default AdminRouter;
