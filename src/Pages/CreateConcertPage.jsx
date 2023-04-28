import React from 'react';
import ConcertCreate from '../Components/ConcertCreate';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const ConcertCreatePage = () => {
    return (
        <>
            <Navbar />
            <ConcertCreate />
            <Footer />
        </>
    )
}

export default ConcertCreatePage;