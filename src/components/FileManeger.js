'use strict';

import _ from 'lodash';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import FileManagerHeader from './FileManegerHeader';
import FileManagerTable from './FileManagerTable';
import { getFileManagerColumns } from './FileManegerHelper';


export default class FileManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      tableData: [],
      columns: getFileManagerColumns(),
    };
    this.onChange = this.onChange.bind(this);
    this.onResize = this.onResize.bind(this);
    this.formatTableData = this.formatTableData.bind(this);
    this.onUploadEnd = this.onUploadEnd.bind(this);
  }

  componentWillMount() {
    const disableclick = (event) => event.preventDefault();
    const body = document.getElementsByTagName('body')[0];
    body.addEventListener('contextmenu', disableclick, false)
    window.addEventListener('resize', this.onResize);
    axios.get('/logs')
      .then(res => {
        this.setState({tableData: _.get(res, 'data.files')});
      });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    this.setState({columns: getFileManagerColumns()});
  }

  onChange(event) {
    this.setState({query: event.target.value});
  }

  onUploadEnd() {
    axios.get('/logs')
      .then(res => {
        this.setState({tableData: _.get(res, 'data.files')});
      });
  }

  formatTableData() {
    // [1, 2, 3, 4, 5, 6] => [[1, 2, 3], [4, 5, 6]]
    return _.chunk(this.state.tableData, this.state.columns);
  }

  render() {
    const tableData = this.formatTableData();
    console.log(tableData);
    return (
      <div>
        <FileManagerHeader
          query={this.state.query}
          onChange={this.onChange}
          onUploadEnd={this.onUploadEnd}
        />
        <FileManagerTable
          columns={this.state.columns}
          query={this.state.query}
          tableData={tableData}
        />
      </div>
    );
  }
}

// vim: ft=javascript.jsx
