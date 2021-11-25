import NotFound from "../components/NotFound";
import CreatePaciente from "../components/pacientes/CreatePaciente";
import React from "react";
import { Switch, Route } from "react-router-dom";
import ViewPaciente from "../components/pacientes/ViewPaciente";
import ViewsPacientes from "../components/pacientes/ViewsPacientes";
const AdminRouter = () => {
  return (
    <Switch>
      <Route exact path="/admin-pacientes/create" component={CreatePaciente} />
      <Route
        exact
        path="/admin-pacientes/pacientes"
        component={ViewsPacientes}
      />
      <Route
        exact
        path="/admin-pacientes/paciente/:id"
        component={ViewPaciente}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default AdminRouter;
