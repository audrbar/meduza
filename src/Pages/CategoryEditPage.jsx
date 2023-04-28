import React from 'react'
import Footer from '../Components/Footer';
import CategoryEdit from '../Components/CategoryEdit';
import Navbar from '../Components/Navbar';

const CategoryEditPage = ({ id }) => {
    return (
        <>
            <Navbar />
            <CategoryEdit id={id} />
            <Footer />
        </>
    )
}

export default CategoryEditPage;