import React from "react";
import LinkPageContent from "./LinkPageContent";

function PrivacyPolicyPage() {
    const paragraphs = [
        [
            "", 
            "This privacy policy explains the information we collect and how it gets used. If you have further questions regarding"
            + " this page, please feel free to reach out and contact us through email at privacy@xchange.com."
        ],
        [
            "???", 
            "Privacy Information???"
        ],
        [
            "Removal of Data", 
            "To request the removal of your data, please reach out to us through email at privacy@exchange.com."
        ],
        [
            "", 
            "By using our website, you hereby consent to the Privacy Policy outlined above and agree to its Terms and Conditions."
        ],
    ];

    return(
        <div className="PrivacyPolicy">
            {LinkPageContent("Privacy Policy", paragraphs)}
        </div>
    );
}

export default PrivacyPolicyPage;