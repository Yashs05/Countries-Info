import React from 'react'
import "./header.css"

export default function Header({theme, setTheme, changeTheme}) {

    return (

        <div className={`navbar d-flex justify-content-between ${theme.currentTheme.navbarTheme}`}>
            <div className="top_heading" >Where in the world?</div>

            <div className="theme_changer d-flex align-items-center" onClick={changeTheme}>
                <i className={theme.imageClassName} id="theme_changer_font">{theme.imagetText}</i>
                <span className = "next_mode">{theme.nextMode}</span>
            </div>
        </div>
    )
}
