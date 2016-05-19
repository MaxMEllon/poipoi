'use strict';

import React from 'react';
import assign from 'object-assign';
import { ContextMenu, MenuItem, ContextMenuLayer } from 'react-contextmenu';
import {
  sliceFileName,
  getBackGroundColor,
  getfiletype,
  selectIcon
} from './FileManegerHelper';

class BaseFileIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        border: `2px solid ${getBackGroundColor()}`,
      },
    }
    this.onHover = this.onHover.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onHover() {
    this.setState({
      style: {
        border: '2px solid rgba(191, 255, 255, 0.82)',
      }
    });
  }

  onBlur() {
    this.setState({
      style: {
        border: `2px solid ${getBackGroundColor()}`,
      }
    });
  }

  onClick(event) {
    this.refs[`${this.props.fileName}`].click();
    this.setState({
      style: {
        border: '2px solid rgba(141, 205, 205, 0.82)',
      },
    });
  }

  render() {
    const floatLeft = {float: 'left'};
    const fileName = this.props.fileName;
    const style = assign({}, floatLeft, this.props.style, this.state.style);
    const iconType = selectIcon(getfiletype(this.props.fileName));
    return (
      <div>
        <a
          ref={`${this.props.fileName}`}
          href={`/${this.props.fileName}`}
          style={{display: 'none'}}
        />
        <div
          className='fileIconContainer'
          style={style}
          onMouseEnter={this.onHover}
          onMouseLeave={this.onBlur}
          onMouseDown={this.onClick}
          onMouseUp={this.onHover}
        >
         <i style={floatLeft} className={`fa fa-3x ${iconType}`}></i>
          <ul className='fileDetail' style={floatLeft}>
            <li
              className='fileDetailLavel'
              style={{fontWeight: 'bold'}}
            >{fileName}</li>
            <li
              style={{color: 'gray', fontSize: '7px'}}
              className='fileDetailLabel'
            >更新日 : {this.props.updatedAt}</li>
          </ul>
        </div>
      </div>
    );
  }
}

const FileIcon = ContextMenuLayer('FileMenu')(BaseFileIcon);

export default FileIcon;

// vim: ft=javascript.jsx
