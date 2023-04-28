import React from 'react';
import CategoryCreate from '../Components/CategoryCreate';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const CreateCategoryPage = () => {
    return (
        <>
            <Navbar />
            <CategoryCreate />
            <Footer />
        </>
    )
}

export default CreateCategoryPage;