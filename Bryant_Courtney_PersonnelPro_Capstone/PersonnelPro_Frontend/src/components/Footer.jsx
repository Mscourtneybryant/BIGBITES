import React from 'react';

function Footer() {
    return (
        <div className="main-footer bg-secondary text-black main"> 
            <div className="footer">
                <div className="row">
                    <div className="row-md">
                        <div className=" bg-gray-800 pt-2 pb-2 text-white d-flex flex-wrap justify-content-space-between items-center">
                            <a href="www.webdev.com" className="hover:text-hoverClr">About Us</a>
                            <a href="www.personnelpro.com" className="hover:text-hoverClr mx-2">Privacy Policy</a>
                            <a href="www.webdev.com" className="hover:text-hoverClr mx-2">Terms of Service</a>
                            <a href="www.webdev.com" className="hover:text-hoverClr mx-2">Contact Us</a>
                            <a href="www.webdev.com" className="hover:text-hoverClr mx-2">FAQs</a>
                            <a href="www.webdev.com" className="hover:text-hoverClr mx-2">Career Opportunities</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;