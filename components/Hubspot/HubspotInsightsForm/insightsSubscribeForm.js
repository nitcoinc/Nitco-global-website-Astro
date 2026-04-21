import React, { useState } from "react";
import styles from "./subscribe.module.css"

const InsightsSubscribeForm = ({ }) => {

  const [formData, setFormData] = useState({
    firstname: "",
    company: "",
    email: "",
    interests: [],
  });


  const interestMapping = {
    "AI (Artificial Intelligence)": "AI (Artificial Intelligence)",
    "Chatbot/Intelligent Virtual Assistants (IVA)": "Chatbot/Intelligent Virtual Assistants (IVA)",
    "Intelligent Automation": "Intelligent Automation",
    "Middleware (Cloud Integration)": "Middleware (Cloud Integration)",
    "RPA (Robotic Process Automation)": "RPA (Robotic Process Automation)",
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleInterestClick = (value) => {
    setFormData((prevState) => {
      const selected = prevState.interests.includes(value)
        ? prevState.interests.filter((i) => i !== value)
        : [...prevState.interests, value];
      return { ...prevState, interests: selected };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    // HubSpot API URL
    const HUBSPOT_URL = "https://api.hsforms.com/submissions/v3/integration/submit/8158070/d0f017e3-30cf-4cf7-98ea-b2b1fce2eec8";
    const body = {
      fields: [
        { name: "email", value: formData.email },
        { name: "firstname", value: formData.firstname },
        { name: "company", value: formData.company },
        { name: "interests", value: formData.interests.join("; ") },
      ],
    };

    try {
      const response = await fetch(HUBSPOT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorDetails = await response.json(); // Get the error details
        alert(`Error submitting the form: ${errorDetails.message || response.statusText}`);
      } else {
        alert("Form submitted successfully!");
        setFormData({
          firstname: "",
          company: "",
          email: "",
          interests: [],
        });
      }
    } catch (error) {
      alert("There was an error submitting the form.");
    }
  };
  return (
    <div className={styles.Main}>
      <h4>Subscribe</h4>

      <form id="contactForm" onSubmit={handleSubmit}>
        <div >
          <label className={styles.labels} htmlFor="email">E-mail<span style={{ color: "#ed1651" }}>*</span></label>
          <br />
          <input
            type="email"
            className={styles.inputfield}
            id="email"
            placeholder="  *Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div >
          <label className={styles.labels} htmlFor="firstname">Name<span style={{ color: "#ed1651" }}>*</span></label>
          <br />
          <input
            type="text"
            className={styles.inputfield}
            id="firstname"
            placeholder="  *Name"
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>
        <div >
          <label className={styles.labels} htmlFor="company">Company<span style={{ color: "#ed1651" }}>*</span></label>
          <br />
          <input
            type="text"
            className={styles.inputfield}
            id="company"
            placeholder="  *Company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-md-11">
          <label htmlFor="interest" className={styles.labels}>Interests</label>
          <div className="d-flex flex-wrap">
            {Object.keys(interestMapping).map((displayName, index) => {
              const hubSpotValue = interestMapping[displayName];
              const isChecked = formData.interests.includes(hubSpotValue);

              return (
                <div
                  key={index}
                  style={{ minWidth: "200px", display: "flex", alignItems: "flex-start", color: "#fff", marginTop: "5px" }}
                >
                  <input
                    className="me-2"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleInterestClick(hubSpotValue)}
                  />
                  <label className={styles.courses}>
                    {displayName}
                  </label>

                </div>
              );
            })}
          </div>
        </div>
        <button type="submit" className={styles.btn}>Submit</button>
      </form>
    </div>
  );
};

export default InsightsSubscribeForm;
