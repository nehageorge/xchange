import React from "react";
import LinkPageContent from "./LinkPageContent";

function ContactPage() {
  const paragraphs = [
    ["", "Contact us through email at uwxchange@gmail.com!"],
    [
      "Feedback?",
      "Do you have feedback on our website, including how we can improve or new features you would like to see?" +
        " We would love to hear from you! Our ultimate goal is to make the exchange process easier, and we are continually" +
        " working to do so. If you have suggestions for us, let us know!",
    ],
    [
      "Questions or Concerns?",
      "If you have any other questions or concerns, please feel free to reach out to us." +
        " For questions or concerns relating specifically to data, privacy and our terms for using the site, please see our Privacy Policy and Terms.",
    ],
  ];

  return (
    <div className="Contact">{LinkPageContent("Contact Us", paragraphs)}</div>
  );
}

export default ContactPage;
