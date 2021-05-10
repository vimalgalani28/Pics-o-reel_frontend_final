import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="instructions" id="header">
      <section className="section timeline">
        <div className="section-title">
          <h2>Guidelines</h2>
          <div className="underline"></div>
        </div>
        <div className="section-center timeline-center">
          <article className="timeline-item">
            <h3>Sections</h3>
            <p> 
            <ol style={{marginLeft: '15px', marginTop: '7px', lineHeight: 1.7}}>
              <li>Paintings/Sketches</li>
              <li>Photographs</li>
              <li>Calligraphies</li>
            </ol>
            </p>
            <span className="number">1</span>
          </article>
          <article className="timeline-item" style={{textAlign: "right"}}>
            <h3>Maximum Submissions</h3>
            <p>
              You can submit upto 2 entries in each category.
            </p>
            <span className="number">2</span>
          </article>
          <article className="timeline-item">
            <h3>Prizes</h3>
            <p>
            Top 3 Paintings/Sketches and top 3 photographs will be awarded and featured in our Annual “Pictoreal magazine”.
            </p>
            <span className="number">3</span>
          </article>
          <article className="timeline-item" style={{textAlign: "right"}}>
            <h3>Deadline</h3>
            <p>
            Last date of submission of entries: 17 May 2021
            </p>
            <span className="number">4</span>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Header;
