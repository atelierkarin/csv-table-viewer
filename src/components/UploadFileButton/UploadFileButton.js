import React, { Component } from 'react';

import { connect } from 'react-redux'
import { addFile } from '../../store/actions'

import Button from '@material-ui/core/Button';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

import './UploadFileButton.css';

let createHandlers = function(dispatch) {
  let onAddFile = function(file) {
    dispatch(addFile(file))
  };

  return {
    onAddFile
  };
}

class UploadFileButton extends Component {

  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);
  }

  checkCSVFile = (filename) => {
    let parts = filename.split('.');
    let extension = parts[parts.length - 1];

    return extension === "xls" || extension === "xlsx" || extension === "csv";
  }

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
    console.log(files)
    this.handlers.onAddFile(files[0]);
  }

  render() {
    return (
      <Auxiliary>
        <input
          accept=".csv,.xls,.xlsx"
          id="contained-button-file"
          type="file"
          onChange={this.onFileUpload}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
      </Auxiliary>
    )
  }
}

export default connect()(UploadFileButton);