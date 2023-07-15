import React from "react";
import LinkPageContent from "./LinkPageContent";

function AboutPage() {
    const paragraphs = [
        [
            "Welcome to XChange!", 
            "Going on exchange is a remarkable opportunity, one which a remarkable amount of students consider but do not pursue,"
            + " due to the logistic nightmare, such as finding course equivalencies at a foreign university of interest."
            + "\n\nXChange is a website designed to ease these difficulties with the exchange process by allowing students to"
            + " search for universities and previously approved course equivalencies. The website also offers students the"
            + " opportunity to post and discuss about their living experience during exchange. "
        ],
        [
            "History", 
            "XChange is a Final Year Design Project built by 5 students at the University of Waterloo."
            + " After going though this process themselves, they realized that the scattered information regarding course equivalencies,"
            + " university information, and past exchange term experiences could be delivered on one centralized platform, to make everyone's"
            + " lives easier. \n\nThus, XChange was created, and has now turned into the website you see today."
            + " We hope that our project is a helpful tool for you as you navigate the exchange process, and we wish you luck!"
            + "\n\nSincerely,\n\nThe XChange Team"
        ],
    ];

    return(
        <div className="About">
            {LinkPageContent("About", paragraphs)}
        </div>
    );
}

export default AboutPage;