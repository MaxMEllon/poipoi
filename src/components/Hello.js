import _ from 'lodash';
import axios from 'axios';
import React from 'react';
import { getfiletype } from '../utils/helper';

export default class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.onUpload = this.onUpload.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onUpload(event) {
    let data = new FormData();
    const file = event.target.files[0];
    file.name
    data.append('file', event.target.files[0]);
    axios
      .post('/upload', data)
      .then(res => {
        const status = _.get(res, 'data.response');
        console.log(status);
      }).catch(err => {
        console.log(err);
      });
  }

  onClick() {
    this.refs.file.click();
  }

  render() {
    return (
      <div>
        <input
          type='file'
          ref='file'
          style={{
            display: 'none',
          }}
          onChange={this.onUpload}
        />
        <div
          onClick={this.onClick}
        >アップロード</div>
      </div>
    );
  }
}
