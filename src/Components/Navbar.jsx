import { useContext } from 'react';
import { Global } from './GlobalContext';

const Navbar = () => {

    const { route, setRoute, authName, authRole, logOut } = useContext(Global);

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container-fluid col-10">
                <div className="navbar-brand" onClick={_ => setRoute('home')} role="button">MeduzaConc</div>
                <div className="nav-top">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <span onClick={_ => setRoute('home')} role="button" className={
                                'nav-link' + (route === 'home' ? ' active' : '')
                            }>Home</span>
                        </li>
                        {
                            authName ?
                                (
                                    <li className="nav-item">
                                        <span onClick={_ => setRoute('concerts-list-page')} role="button" className={
                                            'nav-link' + (route === 'concerts-list-page' ? ' active' : '')
                                        }>Concerts</span>
                                    </li>
                                ) : null
                        }
                        {
                            authName ?
                                (
                                    <li className="nav-item">
                                        <span onClick={_ => setRoute('categories-list-page')} role="button" className={
                                            'nav-link' + (route === 'categories-list-page' ? ' active' : '')
                                        }>Categories</span>
                                    </li>
                                ) : null
                        }
                        {
                            authName && (authRole === 1) ?
                                (
                                    <li className="nav-item">
                                        <span onClick={_ => setRoute('managers-list-page')} role="button" className={
                                            'nav-link' + (route === 'managers-list-page' ? ' active' : '')
                                        }>Managers</span>
                                    </li>
                                ) : null
                        }
                    </ul>
                </div>
                <ul className="navbar-nav">
                    {
                        authName ?
                            (
                                <>
                                    <li className="nav-item">
                                        <span className="nav-link"><b>{authName}</b></span>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link" role="button" onClick={logOut}>Logout</span>
                                    </li>
                                </>
                            ) :
                            (
                                <>
                                    <li className="nav-item">
                                        <span onClick={_ => setRoute('login')} role="button" className="nav-link">Login</span>
                                    </li>
                                    <li className="nav-item">
                                        <span onClick={_ => setRoute('register')} role="button" className="nav-link">Register</span>
                                    </li>
                                </>
                            )

                    }

                </ul>
            </div>
        </nav>
    )
}

export default Navbar;