import React from "react";
import LinkPageContent from "./LinkPageContent";

function PrivacyPolicyPage() {
  const paragraphs = [
    [
      "",
      "This privacy policy explains the information we collect and how it gets used. It also outlines terms regarding our site. If you have further questions regarding" +
        " this page, please feel free to reach out and contact us through email at uwxchange@gmail.com.",
    ],
    [
      "Data Storage",
      "We store information that you provide to us, including but not limited to your name, your email, course equivalencies you add, and your reviews.",
    ],
    [
      "Removal of Data",
      "To request the removal of your data, please reach out to us through email at uwxchange@gmail.com.",
    ],
    [
      "Terms and Conditions",
      "The information from the site is sourced from multiple data sources and is accurate for the year specified on the site. XChange at the moment is not regularly updating the information on the site, so we are not responsible for any outdated information. Information shown is valid for the year specified and may no longer be applicable if viewing the site in a different year. Part of the website data is sourced from users and XChange is not liable for any inaccuracies caused by user input. XChange is not responsible for the inability to get a course approved if it is specified on a our course page list as each student's situation is unique.",
    ],
    [
      "",
      "By using our website, you hereby consent to the Privacy Policy outlined above and agree to its Terms and Conditions.",
    ],
  ];

  return (
    <div className="PrivacyPolicy">
      {LinkPageContent("Privacy Policy and Terms", paragraphs)}
    </div>
  );
}

export default PrivacyPolicyPage;
