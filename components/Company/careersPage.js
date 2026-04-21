import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Blue from "../../images/Career-images/bluelabs.jpg";
import Mentoring from "../../images/Career-images/mentoring.jpg";
import Core from "../../images/Career-images/coreteam.jpg";
import Certificate from "../../images/Career-images/certificate.jpg";
import Collgerecruiting from "../../images/Career-images/collgerecruiting.jpg";
import Benefits from "../../images/Career-images/Benefitimage.jpg";
import Dice from "../../images/Career-images/Dicejobportalimage.png";


const CareersPage = ({ }) => {
  return (
    <>
      <div className="agency-leftI-area pb-60">
        <div className="container mb-5">
          <div className="row">
            <div className="col-12 col-md-6 mb-4 mb-md-0">
              <h2 className="headingtoparea">How to apply</h2>
              <p className="description-area" ><span>As NITCO continues to grow, we are always seeking innovative</span><br /> and dedicated professionals for challenging positions.</p>
            </div>
            <div className="col-12 col-md-6 text-md-end">
              <img {...Dice} className="img-fluid" alt="Job Portal Image" />
              <Link className="text-decoration-underline custom-margin-job-posting-link" href="https://www.dice.com/jobs">
                See all Dice job postings
              </Link>
            </div>
          </div>
        </div >
      </div >
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 col-md-6 text-md-end">
            <img className="img-fluid" {...Benefits} alt="Team Image" />
          </div>
          {/* <div className="col perks-benefits-section"> */}
            <div className="col-12 col-md-6 mb-4 mb-md-0  perks-benefits-section">
            <h2 className="heading-area">
              <span>PERKS &</span><br />
              <span>BENEFITS</span>
            </h2>
            <br />
            <p className="description-area" ><span>NITCO offers a competitive benefits package to</span><br /><span>improve the health and quality of life for our</span><br />employees and their families.</p>
          </div>
        </div>

        <div className="item">
          <span className="number">01</span>
          <span className="text">COMPETITIVE COMPENSATION</span>
        </div>
        <div className="item">
          <span className="number">02</span>
          <span className="text">FLEXIBLE HEALTH BENEFITS INCLUDING OPTIONS FOR MEDICAL, DENTAL AND VISION</span>
        </div>
        <div className="item">
          <span className="number">03</span>
          <span className="text">LIFE INSURANCE</span>
        </div>
        <div className="item">
          <span className="number">04</span>
          <span className="text">TECHNICAL CERTIFICATION REIMBURSEMENT</span>
        </div>
        <div className="item">
          <span className="number">05</span>
          <span className="text">PAID HOLIDAYS, PAID TIME OFF (PTO)</span>
        </div>
        <div className="item">
          <span className="number">06</span>
          <span className="text">PROFESSIONAL CONFERENCE OPPORTUNITIES</span>
        </div>
        <div className="item">
          <span className="number">07</span>
          <span className="text">CAREER DEVELOPMENT PROGRAM</span>
        </div>
        <div className="item">
          <span className="number">08</span>
          <span className="text">EMPLOYEE REFERRAL AND SALES REFERRAL PROGRAMS</span>
        </div>
        <div className="item">
          <span className="number">09</span>
          <span className="text">EMPLOYEE ACTIVITIES, INCLUDING HOLIDAY PARTIES AND COMPANY SPONSORED EVENTS</span>
        </div>
        <div className="item">
          <span className="number">10</span>
          <span className="text">TRAINING AND DEVELOPMENT OPPORTUNITIES</span>
        </div>
      </div>

      <div className="container">
        <div className="row career-training mb-3 mt-5">
         <div className="col-12 col-md-6 mb-3 mb-md-0">
            <h1>Training</h1>
          </div>
           <div className="col-12 col-md-6">
            <p>At NITCO, we encourage employees to advance their <br />skills so that we continue to be a leader in the <br />technology solutions business.</p>
          </div>
        </div>
        <div className="program">
          <div className="col ps-5 text-center">
            <h2>Blue labs</h2>
            <p>This program forms highly talented members of <br />NITCO's AI teams. Blue Labs allows individuals to <br /> accelerate their skill in the artificial intelligence space.</p>
          </div>
          <div className="col-4">
            <img {...Blue} className="img-fluid custom-img" alt="Blue labs" style={{marginLeft:"0px"}}/>
          </div>
        </div>
        <div className="program">
          <div className="col ps-5 text-center">
            <h2>Mentoring</h2>
            <p>We encourage the mentoring relationships for less <br /> experienced employees, giving them the opportunity <br /> to grow and flourish as professionals.</p>
          </div>
          <div className="col-4">
            <img {...Mentoring} className="img-fluid custom-img" alt="Blue labs" style={{marginLeft:"0px"}}/>
          </div>
        </div>
        <div className="program">
          <div className="col ps-5 text-center">
            <h2>Core Team</h2>
            <p>Our core team designs and builds COE models  to <br /> meet technology implementation challenges. We <br /> encourage our employees to learn from experts about <br />emerging technologies and skills</p>
          </div>
          <div className="col-4">
            <img {...Core} className="img-fluid custom-img" alt="Blue labs" style={{marginLeft:"0px"}}/>
          </div>
        </div>
        <div className="program">
          <div className="col ps-5 text-center">
            <h2>Certificate Reimbursement</h2>
            <p>At NITCO, we encourage our employees to achieve <br /> and maintain technical certifications and other <br /> professional designations. In most cases these fees <br /> are 100% reimbursable.</p>
          </div>
          <div className="col-4">
            <img {...Certificate} className="img-fluid custom-img" alt="Blue labs" style={{marginLeft:"0px"}}/>
          </div>
        </div>
      </div >

      <div className="container mb-5 mt-5">
        <div className="row career-recruiting-and-our-goal mb-3">
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <h1>College Recruiting</h1>
          </div>
           <div className="col-12 col-md-6">
            <p>We have a gratifying career for you no matter whatever degree you pursue. We are willing to make use of your knowledge in designing and implementing the solutions for our well-known clients.</p>
          </div>
        </div>

        <div>
          <img {...Collgerecruiting} style={{marginLeft:"0px"}} className="img-fluid recruiting-image" alt="College Recruiting" />
        </div>
      </div>
    </>
  );
};
export default CareersPage;
