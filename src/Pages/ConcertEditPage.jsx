import React from 'react'
import Footer from '../Components/Footer';
import ConcertEdit from '../Components/ConcertEdit';
import Navbar from '../Components/Navbar';

const CargoEditPage = ({ id }) => {
    return (
        <>
            <Navbar />
            <ConcertEdit id={id} />
            <Footer />
        </>
    )
}

export default CargoEditPage;