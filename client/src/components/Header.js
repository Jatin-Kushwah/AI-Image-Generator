import React from "react";
import logo from "../assets/logo.png";

function Header() {
    return (
        <header className="flex items-center gap-2 p-5 bg-white z-50 shadow-md top-0">
            <img
                style={{ height: "30px", width: "30px" }}
                src={logo}
                alt="logo"
            />

            <div>
                <h1 className="font-bold">AI Image Generator</h1>
                <h2 className="text-xs">Powered By DALL-E-2 & Chat GPT</h2>
            </div>
        </header>
    );
}

export default Header;
