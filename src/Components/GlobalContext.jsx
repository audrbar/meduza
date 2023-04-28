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
    const [contList, setContList] = useState(null);
    const [managersList, setManagersList] = useState(null);
    const [response, setResponse] = useState();
    const uuid = uuidv4();

    const after = (response) => {
        setResponse(response);
        getConcerts();
        getContainers();
        getManagers();
        setMessages(m => [...m, { ...response.data.message, id: uuid }]);
        setTimeout(() => {
            setMessages(m => m.filter(m => uuid !== m.id));
        }, 4000);
    }

    // ******************* Get, Create, Update, Delete concerts **********************
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
        axios.put('http://localhost:3003/concerts/' + concert.id, concert, { withCredentials: true })
            .then(after);
    };

    const loadConcert = (concert) => {
        axios.put('http://localhost:3003/loadconcert/' + concert.id, concert, { withCredentials: true })
            .then(after);
    };

    // **************** Get, Create, Update, Delete CONTAINERS AND concerts *****************

    const getContainers = () => {
        axios.get('http://localhost:3003/containers', { withCredentials: true })
            .then(res => setContList(res.data));
    };

    useEffect(() => {
        getContainers();
    }, []);

    const createCont = (createC) => {
        axios.post('http://localhost:3003/containers', createC, { withCredentials: true })
            .then(after);
    }

    const editContainer = (container) => {
        axios.put('http://localhost:3003/container/' + container.cont_id, container, { withCredentials: true })
            .then(after);
    };

    const deleteContainer = (cont_id) => {
        axios.delete('http://localhost:3003/container/' + cont_id, { withCredentials: true })
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
                setContList,
                createCont,
                contList,
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
                editContainer,
                deleteContainer,
                login
            }}
        >
            {children}
        </Global.Provider>
    );
};