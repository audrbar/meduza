import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-5">
            <p className="text-center">&#169; Meduza concerts, {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer;