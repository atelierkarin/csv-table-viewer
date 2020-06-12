import React, { Component } from 'react';

import { connect } from 'react-redux'

import MaterialTable from 'material-table';

import CSVReaderService from '../../services/CSVReaderService';

const options = {
  filtering: true,
  sorting: true,
  pageSize: 10,
  exportButton: true
}

class MainTable extends Component {

  state = {
    file: null,
    header: [],
    data: [],
    title: "",
    loading: false
  }

  componentDidUpdate(prevProps){
    if (prevProps.file !== this.props.file && this.state.file !== this.props.file) {
      this.setState({file: this.props.file});
      let service = new CSVReaderService();
      this.setState({loading: true});
      service.read(this.props.file).then(res => {
        this.setState({header: [], data: [], title: ""});
        if (Array.isArray(res.data) && res.data.length > 0) {
          const header = Object.keys(res.data[0]).map(h => {
            return { title: h, field: h };
          });
          this.setState({header, data: [...res.data], title: res.title});
        }
        this.setState({loading: false});
      })

    }
  }

  render() {
    return this.state.file ? <div>
      { this.state.loading ? <div>Loading...</div> : <MaterialTable
        columns={this.state.header}
        data={this.state.data}
        title={this.state.title}
        options={options}
      >
      </MaterialTable> }
    </div> : <div>No file uploaded</div>;
  }
};

export default connect(
  state => ({
    file: state.fileData.file
  })
)(MainTable);