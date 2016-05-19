'use strict';

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'node-uuid';
import FileIcon from './FileIcon';
import FileMenu from './FileMenu';
import {
  MENU_ACTION_TYPE,
  isMultipleAtoB,
  getFileManagerColumns,
} from './FileManegerHelper';

const searchAsyncByQuery = (tableData, query) => {
  return new Promise(resolve => {
    const reg = new RegExp(_.escapeRegExp(query));
    const beforeTableData = _.flatten(tableData);
    const nextTableData = _.remove(beforeTableData, item => reg.test(item.file));
    resolve(_.chunk(nextTableData, getFileManagerColumns()));
  });
}

export default class FileManagerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
    };
    this.renderTableRow = this.renderTableRow.bind(this);
    this.renderTableColumn = this.renderTableColumn.bind(this);
    this.onSelectMenu = this.onSelectMenu.bind(this);
  }

  componentDidMount() {
    this.setState({tableData: this.props.tableData});
  }

  // resizeするたびにrenderがかかるのを防止
  shouldComponentUpdate(nextProps, nextState) {
    const propsDiff = _.isEqual(nextProps, this.props);
    const stateDiff = _.isEqual(nextState, this.state);
    return !(propsDiff && stateDiff);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query === this.props.query && nextProps.query === '') {
      return this.setState({tableData: nextProps.tableData});
    }
    // view で O(n^2) 以上のループが発生するときはPromise化しておくと安心
    // 逐次処理にすると，クリックしても反応しない原因に
    searcAsynchByQuery(this.props.tableData, nextProps.query).then(newTable => {
      return this.setState({tableData: newTable});
    });
  }

  onSelectMenu(event, data) {
    switch (data.type) {
    case MENU_ACTION_TYPE.remove:
      break;
    case MENU_ACTION_TYPE.download:
      break;
    case MENU_ACTION_TYPE.rename:
      break;
    default:
      break;
    }
  }

  renderTableColumn(columnData) {
    return _.map(columnData, item => {
      return (
        <td key={`${uuid.v4()}`} >
          <FileIcon
            ref={`file-${item.id}`}
            fileId={item.id}
            fileName={item.file}
            updatedAt={item.updatedAt}
          />
          <FileMenu
            fileId={item.id}
            fileName={item.file}
            onClick={this.onSelectMenu}
          />
        </td>
      );
    });
  }

  renderTableRow(tableData) {
    return _.map(tableData, item => {
      return (
        <tr key={`${uuid.v4()}`}>
          {this.renderTableColumn(item)}
        </tr>
      );
    });
  }

  render() {
    return (
      <table style={{marginTop: '2em', width: '100%'}}>
        <tbody>
          {this.renderTableRow(this.state.tableData)}
        </tbody>
      </table>
    );
  }
}

// vim: ft=javascript.jsx foldmethod=marker foldmarker=/*,*/
