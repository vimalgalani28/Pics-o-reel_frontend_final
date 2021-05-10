import React from "react";
import Form from "../components/Form/Form";
import { connect } from "react-redux";

const AddEntryPage = (props) => {
  return (
    <div className="form-page">
      <Form />
    </div>
  );
};

const mapStateToProps = (state) => ({
  myEntries: state.myEntry,
});

export default connect(mapStateToProps)(AddEntryPage);
