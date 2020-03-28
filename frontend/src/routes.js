import React from 'react';

//Importando a classe de rota
import { BrowserRouter, Route, Switch} from 'react-router-dom';

//Importando  componente
import Logon from './pages/Logon'; // ./pages/Logon/index não precisa colocar index pois ele já busca
import Register from './pages/Register'; // ./pages/Logon/index não precisa colocar index pois ele já busca
import Profile from './pages/Profile'; // ./pages/Logon/index não precisa colocar index pois ele já busca
import NewIncident from './pages/NewIncident'; // ./pages/Logon/index não precisa colocar index pois ele já busca


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    );
}