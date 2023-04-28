import { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const Global = createContext();

export const GlobalProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [route, setRoute] = useState('home');
    const [logged, setLogged] = useState(null);
    const [authName, setAuthName] = useState(null);
    const [authRole, setAuthRole] = useState(3);
    const [list, setList] = useState(null);
    const [categoriesList, setCategoriesList] = useState(null);
    const [managersList, setManagersList] = useState(null);
    const [response, setResponse] = useState();
    const uuid = uuidv4();

    const after = (response) => {
        setResponse(response);
        getConcerts();
        getCategories();
        getManagers();
        setMessages(m => [...m, { ...response.data.message, id: uuid }]);
        setTimeout(() => {
            setMessages(m => m.filter(m => uuid !== m.id));
        }, 4000);
    }

    // ******************* Get, Create, Update, Delete CONCERTS **********************
    const getConcerts = () => {
        axios.get('http://localhost:3003/concerts', { withCredentials: true })
            .then(res => setList(res.data));
    };

    useEffect(() => {
        getConcerts();
    }, []);

    const createConcert = (create) => {
        axios.post('http://localhost:3003/concerts', create, { withCredentials: true })
            .then(after);
    }

    const deleteConcert = (id) => {
        axios.delete('http://localhost:3003/concerts/' + id, { withCredentials: true })
            .then(after);
    };

    const editConcert = (concert) => {
        axios.put('http://localhost:3003/concert/' + concert.id, concert, { withCredentials: true })
            .then(after);
    };

    const loadConcert = (concert) => {
        axios.put('http://localhost:3003/loadconcert/' + concert.id, concert, { withCredentials: true })
            .then(after);
    };

    // **************** Get, Create, Update, Delete CATEGORIES *****************

    const getCategories = () => {
        axios.get('http://localhost:3003/categories', { withCredentials: true })
            .then(res => setCategoriesList(res.data));
    };

    useEffect(() => {
        getCategories();
    }, []);

    const createCategory = (createC) => {
        axios.post('http://localhost:3003/categories', createC, { withCredentials: true })
            .then(after);
    }

    const editCategory = (category) => {
        axios.put('http://localhost:3003/category/' + category.cont_id, category, { withCredentials: true })
            .then(after);
    };

    const deletecategory = (id) => {
        axios.delete('http://localhost:3003/category/' + id, { withCredentials: true })
            .then(after);
    };

    // ******************* Get, Create, Update, Delete MANAGERS **********************

    const getManagers = () => {
        axios.get('http://localhost:3003/managers', { withCredentials: true })
            .then(res => setManagersList(res.data));
    };

    const editManager = (manager) => {
        axios.put('http://localhost:3003/manager/' + manager.id, manager, { withCredentials: true })
            .then(after);
    };

    useEffect(() => {
        getManagers();
    }, []);

    const deleteManager = (id) => {
        axios.delete('http://localhost:3003/manager/' + id, { withCredentials: true })
            .then(after);
    };

    // ******************* Post, Get Loged User, Logout User **********************
    // getting loged user
    const getUser = () => {
        axios
            .get('http://localhost:3003/login', { withCredentials: true })
            .then((res) => {
                if (res.data.status === 'ok') {
                    setRoute('home');
                    setLogged(true);
                    setAuthName(res.data.name);
                    setAuthRole(res.data.role);
                } else {
                    setLogged(false);
                }
            });
    }

    const login = (name, psw) => {
        return axios.post('http://localhost:3003/login', { name, psw }, { withCredentials: true })
            .then((res) => {
                getUser();
                return res;
            })
    };

    const logOut = (_) => {
        axios.post('http://localhost:3003/logout', {}, { withCredentials: true })
            .then((_) => {
                setAuthName(false);
                setLogged(2);
                setRoute('home');
            });
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Global.Provider
            value={{
                list,
                loadConcert,
                editConcert,
                deleteConcert,
                createConcert,
                managersList,
                setManagersList,
                getManagers,
                editManager,
                deleteManager,
                messages,
                response,
                route,
                setRoute,
                getUser,
                authName,
                authRole,
                setAuthName,
                logOut,
                logged,
                setLogged,
                deletecategory,
                login,
                categoriesList,
                createCategory,
                editCategory
            }}
        >
            {children}
        </Global.Provider>
    );
};