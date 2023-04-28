import React from 'react'
import Footer from '../Components/Footer';
import CargosList from '../Components/ConcertsList';
import Navbar from '../Components/Navbar';

const ConcertsListPage = () => {
    return (
        <>
            <Navbar />
            <CargosList />
            <Footer />
        </>
    )
}

export default ConcertsListPage;