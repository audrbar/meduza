import { useContext } from "react";
import { Global } from "./GlobalContext";
import Home from "../Pages/Home";
import Login from "./Login";
import Register from "./Register";
import Auth from "./Auth";
import ConcertsListPage from "../Pages/ConcertsListPage";
import CategoriesListPage from "../Pages/CategoriesListPage";
import ManagersListPage from "../Pages/ManagersListPage";
import ConcertEditPage from "../Pages/ConcertEditPage";
import CategoryEditPage from "../Pages/CategoryEditPage";
import ManagerEditPage from "../Pages/ManagerEditPage";
import CreateConcertPage from "../Pages/CreateConcertPage";
import CategoryCreatePage from "../Pages/CategoryCreatePage";

function Routes() {

    const { route } = useContext(Global);
    const path = typeof route === 'string' ? route : route.path;
    const data = route?.data;

    switch (path) {
        case 'home': return <Home />
        case 'concerts-list-page': return <Auth role={[0, 1]}><ConcertsListPage /></Auth >
        case 'categories-list-page': return <Auth role={[0, 1]}><CategoriesListPage /></Auth >
        case 'managers-list-page': return <Auth role={[1]}><ManagersListPage /></Auth>
        case 'concert-edit-page': return <Auth role={[1]}><ConcertEditPage id={data.id} /></Auth>
        case 'category-edit-page': return <CategoryEditPage id={data.id} />
        case 'manager-edit-page': return <ManagerEditPage id={data.id} />
        case 'create-concert-page': return <Auth role={[0, 1]}><CreateConcertPage /></Auth >
        case 'create-category-page': return <Auth role={[0, 1]}><CategoryCreatePage /></Auth >
        case 'login': return <Login />
        case 'register': return <Register />
        default: return null
    }
}

export default Routes;