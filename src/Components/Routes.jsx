import { useContext } from "react";
import { Global } from "./GlobalContext";
import Home from "../Pages/Home";
import Login from "./Login";
import Register from "./Register";
import Auth from "./Auth";
import ConcertsListPage from "../Pages/ConcertsListPage";
// import ContainersListPage from "../Pages/ContainersListPage";
import ManagersListPage from "../Pages/ManagersListPage";
import ConcertEditPage from "../Pages/ConcertEditPage";
// import ConcertLoadPage from "../Pages/ConcertLoadPage";
// import ContainerEditPage from "../Pages/ContainerEditPage";
import ManagerEditPage from "../Pages/ManagerEditPage";
import CreateConcertPage from "../Pages/CreateConcertPage";
// import CreateContainerPage from "../Pages/CreateContainerPage";

function Routes() {

    const { route } = useContext(Global);
    const path = typeof route === 'string' ? route : route.path;
    const data = route?.data;

    switch (path) {
        case 'home': return <Home />
        case 'concerts-list-page': return <Auth role={[0, 1]}><ConcertsListPage /></Auth >
        // case 'containers-list-page': return <Auth role={[0, 1]}><ContainersListPage /></Auth >
        case 'managers-list-page': return <Auth role={[1]}><ManagersListPage /></Auth>
        case 'concert-edit-page': return <Auth role={[1]}><ConcertEditPage id={data.id} /></Auth>
        // case 'concert-load-page': return <ConcertLoadPage id={data.id} />
        // case 'container-edit-page': return <ContainerEditPage id={data.id} />
        case 'manager-edit-page': return <ManagerEditPage id={data.id} />
        case 'create-concert-page': return <Auth role={[0, 1]}><CreateConcertPage /></Auth >
        // case 'create-container-page': return <Auth role={[0, 1]}><CreateContainerPage /></Auth >
        case 'login': return <Login />
        case 'register': return <Register />
        default: return null
    }
}

export default Routes;