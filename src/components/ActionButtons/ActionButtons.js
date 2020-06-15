import React, { Component } from "react";

import { connect } from "react-redux";
import { addFiles, clearFiles } from "../../store/actions";

import Button from "@material-ui/core/Button";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

import "./ActionButtons.css";

let createHandlers = function (dispatch) {
  let onAddFiles = (files) => {
    dispatch(addFiles(files));
  };

  let onClearFiles = () => {
    dispatch(clearFiles());
  };

  return {
    onAddFiles,
    onClearFiles,
  };
};

class ActionButtons extends Component {
  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);
  }

  checkCSVFile = (filename) => {
    let parts = filename.split(".");
    let extension = parts[parts.length - 1];

    return extension === "xls" || extension === "xlsx" || extension === "csv";
  };

  onFileUpload = (ev) => {
    let input = ev.target;
    let files = [];

    if (input.files.length <= 0) {
      // Cancelled
      return;
    }

    for (let index = 0; index < input.files.length; index++) {
      if (this.checkCSVFile(input.files[index].name)) {
        files.push(input.files[index]);
      }
    }
    this.handlers.onAddFiles(files);
  };

  onClearFiles = () => {
    this.handlers.onClearFiles();
  };

  render() {
    return (
      <Auxiliary>
        <Button variant='contained' onClick={this.onClearFiles}>
          Clear
        </Button>
        <input
          accept='.csv,.xls,.xlsx'
          id='contained-button-file'
          type='file'
          multiple
          onChange={this.onFileUpload}
        />
        <label htmlFor='contained-button-file'>
          <Button variant='contained' color='primary' component='span'>
            Upload ( {this.props.files.length} )
          </Button>
        </label>
      </Auxiliary>
    );
  }
}

export default connect((state) => ({
  files: state.fileData.files,
}))(ActionButtons);
