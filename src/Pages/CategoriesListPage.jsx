import React from 'react'
import Footer from '../Components/Footer';
import CategoriesList from '../Components/CategoriesList';
import Navbar from '../Components/Navbar';

const CategoriesListPage = () => {
    return (
        <>
            <Navbar />
            <CategoriesList />
            <Footer />
        </>
    )
}

export default CategoriesListPage;