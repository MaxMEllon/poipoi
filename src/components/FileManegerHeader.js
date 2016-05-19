'use strict';

import _ from 'lodash';
import axios from 'axios';
import React from 'react';
import {getFileManagerColumns} from './FileManegerHelper';

export default class FileManagerHeader extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }

  onClick() {
    this.refs.file.click();
  }

  onUpload(event) {
    const file = event.target.files[0];
    // if (filetype(file.name) !== 'csv') return;
    let data = new FormData();
    data.append('file', file);
    axios
      .post('/upload', data)
      .then(res => {
        console.log(_.get(res, 'data.response'));
        this.props.onUploadEnd();
      })
  }

  render() {
    return (
      <div>
        <div className='fileManegerHeader'>
          <div style={{margin: '4px 1em', fontSize: '0.8em', width: '70%'}}>
            <input
              type='file'
              ref='file'
              style={{display: 'none', width: 0, height: 0}}
              onChange={this.onUpload}
            />
            <button
              className='fileUploadButton'
              onClick={this.onClick}
            > <span>
                ファイルをアップロードする
              </span>
            </button>
            <input
              value={this.props.query}
              onChange={this.props.onChange}
              className='fileSearchForm'
              placeholder='検索'
            />
          </div>
        </div>
      </div>
    );
  }

}

// vim: ft=javascript.jsx
