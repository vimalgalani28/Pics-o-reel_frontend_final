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
            <h3>How to vote?</h3>
            <p>
              <ol
                style={{
                  marginLeft: "15px",
                  marginTop: "7px",
                  lineHeight: 1.7,
                }}
              >
                <li>Add entries to the wishlist which please you.</li>
                <li>
                  Once added, you can start voting section wise in the wishlist.
                </li>
              </ol>
            </p>
            <span className="number">1</span>
          </article>
          <article className="timeline-item" style={{ textAlign: "right" }}>
            <h3>Vote Limits</h3>
            <p>
              Top 3 Paintings/Sketches and top 3 Photographs will be awarded and
              featured in our annual magazine: <b>“Pictoreal”</b>.
            </p>
            <span className="number">2</span>
          </article>
          <article className="timeline-item">
            <h3>Prizes</h3>
            <p>
              <li>
                <b>For Photography or Sketching & Painting Category:</b> You can
                accord 3 votes per section.
              </li>
              <br />
              <li>
                <b> For Independence Day Category:</b> You can accord only 1
                vote.
              </li>
            </p>
            <span className="number">3</span>
          </article>
          <article className="timeline-item" style={{ textAlign: "right" }}>
            <h3>Deadline</h3>
            <p>
              Voting closes today at <b>6 pm.</b>
            </p>
            <span className="number">4</span>
          </article>
          <article className="timeline-item">
            <h3>Note</h3>
            <p>
              <b>Avoid refreshing the page while voting.</b>
            </p>
            <span className="number">5</span>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Header;
