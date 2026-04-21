import React, { useState } from "react";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import Banner_image from "../../images/contactus/Contactus-banner.jpg";
import USA_Location from "../../images/contactus/US-location.jpg";
import India_Location from "../../images/contactus/India-location.jpg";
import styles from "./contactForm.module.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    interests: [],
    message: "",
  });

  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => setCaptchaValue(value);

  const interestMapping = {
    "Artificial Intelligence": "AI",
    Integration: "Integration",
    Automation: "Automation",
    Data: "Data",
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleCheckboxChange = (value) => {
    if (formData.interests.includes(value)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter((v) => v !== value),
      });
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, value],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      alert("Please complete the CAPTCHA.");
      return;
    }
  
    // ✅ HubSpot API endpoint (use your portal + form GUID)
    const HUBSPOT_URL =
      "https://api.hsforms.com/submissions/v3/integration/submit/8158070/591b39dd-a13c-4a1b-a1e4-c941be318797";

    // Convert interests array into comma-separated string
    const interestString = formData.interests.join(", ");

    const body = {
      fields: [
        { name: "firstname", value: formData.firstName },
        { name: "lastname", value: formData.lastName },
        { name: "email", value: formData.email },
        { name: "message", value: formData.message },
        { name: "interest", value: interestString },
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
        alert(
          `Error submitting the form: ${
            errorDetails.message || response.statusText
          }`
        );
      } else {
        alert("✅ Form submitted successfully!");
        // Reset form after success
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          interests: [],
          message: "",
        });
        setCaptchaValue(null);
      }
    } catch (error) {
      alert("❌ There was an error submitting the form.");
    }
  };

  return (
    <>
    <div className={styles.main}>      
      <div className={styles.pagebannerContainer}>
                <Image
                    src={Banner_image}
                    alt="bannerImage"
                    className={styles.pageBannerImg}
                    priority
                />
                <div className={styles.pagebannerText}>
                   
                    <h1 className={styles.pagebannerdescription}>
                      Let’s Build Scalable, Future-Ready Solutions for Your Business
                    </h1>
                </div>
            </div>     
      <div className={styles.contactSection}>
        <h3 className={styles.heading}>We would love to hear from you!</h3> 
          <h6 className={styles.subText}>
            Got an idea we can help with? Want to join our team? <br />
            Here’s how to reach us.
          </h6>
        <div className={styles.contactWrapper}>
          <div className={styles.formContainer}>
            <form className={styles.formBox} onSubmit={handleSubmit}>
              <label>First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name*"
                value={formData.firstName}
                onChange={handleChange}
                required
              />

              <label>Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name*"
                value={formData.lastName}
                onChange={handleChange}
                required
              />

              <label>Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label>
                Interests <span className={styles.required}>*</span>
              </label>
              <div className={styles.checkboxGrid}>
                {Object.keys(interestMapping).map((interest, i) => {
                  const value = interestMapping[interest];
                  return (
                    <div key={i} className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        id={`interest-${i}`}
                        checked={formData.interests.includes(value)}
                        onChange={() => handleCheckboxChange(value)}
                        className={styles.customCheckbox}
                      />
                      <label htmlFor={`interest-${i}`}>{interest}</label>
                    </div>
                  );
                })}
              </div>

              <label>Message</label>
              <textarea
                id="message"
                placeholder="Message*"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <div className={styles.captcha}>
                <ReCAPTCHA
                  sitekey="6LfHFtYrAAAAAGQaYMpcr962Jg-GYf3sHLgFNyT3"
                  onChange={handleCaptchaChange}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Submit
              </button>
            </form>
          </div>
          <div className={styles.officeContainer}>
            <div className={styles.officeBox}>
              <h1>USA</h1>
              <Image src={USA_Location} alt="USA Office" className={styles.officeImage} />
              <p>📞 281-503-7002</p>
              <p>📍 440 Cobia Dr., Suite 1701 Katy, Texas 77494</p>
            </div>

            <div className={styles.officeBox}>
              <h1>INDIA</h1>
              <Image src={India_Location} alt="India Office" className={styles.officeImage} />
              <p>📞 040-45437549</p>
              <p>📍 514-515, 5th Floor DSL Abacus IT Park, IDA Uppal, Hyderabad, Telangana 500013</p>
              <hr />
              <p>📞 040-45437626</p>
              <p>📍 Gachibowli, Hyderabad, Telangana 500032</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ContactForm;
