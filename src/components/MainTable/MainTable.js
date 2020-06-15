import React, { Component } from "react";

import { connect } from "react-redux";

import MaterialTable from "material-table";

import CSVReaderService from "../../services/CSVReaderService";

const options = {
  filtering: true,
  sorting: true,
  pageSize: 10,
  exportButton: true,
};

class MainTable extends Component {
  state = {
    files: null,
    header: [],
    data: [],
    title: "",
    loading: false,
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.files !== this.props.files &&
      this.state.files !== this.props.files
    ) {
      this.setState({ files: this.props.files });
      this.setState({ loading: true });

      let service = new CSVReaderService();
      const files = this.props.files;

      if (Array.isArray(files) && files.length > 0) {
        this.setState({ header: [], data: [], title: "" });
        Promise.all(files.map(f => service.read(f)))
          .then((results) => {
            let header = []
            let data = []
            let title = []

            results.forEach(res => {
              if (Array.isArray(res.data) && res.data.length > 0) {
                const currentHeader = Object.keys(res.data[0]).map((h) => {
                  return { title: h, field: h };
                });
                header = [...header, ...currentHeader];
                data = [...data, ...res.data];
                title.push(res.title);
              }
            })

            this.setState({ header, data, title: title.join(' / ') });
            this.setState({ loading: false });
          })
      } else {
        this.setState({ files: null, header: [], data: [], title: "" });
        this.setState({ loading: false });
      }
    }
  }

  render() {
    return this.state.files ? (
      <div>
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
          <MaterialTable
            columns={this.state.header}
            data={this.state.data}
            title={this.state.title}
            options={options}></MaterialTable>
        )}
      </div>
    ) : (
      <div>No file uploaded</div>
    );
  }
}

export default connect((state) => ({
  files: state.fileData.files,
}))(MainTable);
