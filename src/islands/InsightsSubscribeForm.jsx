import React, { useState } from "react";
import styles from './subscribe.module.css';

const interestMapping = {
  "AI (Artificial Intelligence)": "AI (Artificial Intelligence)",
  "Chatbot/Intelligent Virtual Assistants (IVA)": "Chatbot/Intelligent Virtual Assistants (IVA)",
  "Intelligent Automation": "Intelligent Automation",
  "Middleware (Cloud Integration)": "Middleware (Cloud Integration)",
  "RPA (Robotic Process Automation)": "RPA (Robotic Process Automation)",
};

const HUBSPOT_URL =
  "https://api.hsforms.com/submissions/v3/integration/submit/8158070/d0f017e3-30cf-4cf7-98ea-b2b1fce2eec8";

export default function InsightsSubscribeForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    company: "",
    email: "",
    interests: [],
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleInterestClick = (value) => {
    setFormData((prev) => {
      const selected = prev.interests.includes(value)
        ? prev.interests.filter((i) => i !== value)
        : [...prev.interests, value];
      return { ...prev, interests: selected };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorDetails = await response.json();
        alert(`Error submitting the form: ${errorDetails.message || response.statusText}`);
      } else {
        alert("Form submitted successfully!");
        setFormData({ firstname: "", company: "", email: "", interests: [] });
      }
    } catch {
      alert("There was an error submitting the form.");
    }
  };

  return (
    <div className={styles.Main}>
      <h4>Stay Updated</h4>
      <p>Subscribe for the latest insights delivered to your inbox.</p>

      <form onSubmit={handleSubmit}>
        <label className={styles.labels} htmlFor="email">
          Email <span style={{ color: "#53eafd" }}>*</span>
        </label>
        <input
          type="email"
          className={styles.inputfield}
          id="email"
          placeholder="you@company.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className={styles.labels} htmlFor="firstname">
          Name <span style={{ color: "#53eafd" }}>*</span>
        </label>
        <input
          type="text"
          className={styles.inputfield}
          id="firstname"
          placeholder="Your name"
          value={formData.firstname}
          onChange={handleChange}
          required
        />

        <label className={styles.labels} htmlFor="company">
          Company <span style={{ color: "#53eafd" }}>*</span>
        </label>
        <input
          type="text"
          className={styles.inputfield}
          id="company"
          placeholder="Company name"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <hr className={styles.divider} />

        <label className={styles.labels}>Interests</label>
        <div className={styles.interestList}>
          {Object.keys(interestMapping).map((displayName, index) => {
            const hubSpotValue = interestMapping[displayName];
            const isChecked = formData.interests.includes(hubSpotValue);
            return (
              <div key={index} className={styles.interestItem}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleInterestClick(hubSpotValue)}
                  id={`interest-${index}`}
                />
                <label htmlFor={`interest-${index}`} className={styles.courses}>
                  {displayName}
                </label>
              </div>
            );
          })}
        </div>

        <button type="submit" className={styles.btn}>
          Subscribe
        </button>
      </form>
    </div>
  );
}
