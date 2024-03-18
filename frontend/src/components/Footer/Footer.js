import React from 'react';
import "./Footer.css"
import LogoIMS from "../Assets/LogoIMS.png"
import cloud from "../Assets/cloud.jpeg"
import clipboard from "../Assets/clipboard.png"
import lapi from "../Assets/lapi.jpeg"

function Footer() {
    return (
    <div className="footer__Icons">
        <img  src={LogoIMS} alt="LogoIMS icon"/>
        <img  src={cloud} alt="census icon"/>
        <img  src={lapi} alt="knbs icon"/>
        <img  src={clipboard} alt="census2 icon"/>
    </div>
    )
}

export default Footer;
