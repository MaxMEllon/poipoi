'use strict';

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { MENU_ACTION_TYPE } from './FileManegerHelper';

export default class FileMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ContextMenu identifier='FileMenu' currentItem={this.currentItem}>
        <MenuItem data={{type: MENU_ACTION_TYPE.download}} onClick={this.props.onClick}>
          ファイルをダウンロードする
        </MenuItem>
        <MenuItem data={{type: MENU_ACTION_TYPE.rename}} onClick={this.props.onClick}>
          名前を変更する
        </MenuItem>
        <hr />
        <MenuItem
          data={{type: MENU_ACTION_TYPE.remove}}
          onClick={this.props.onClick}
        >
          削除する
        </MenuItem>
      </ContextMenu>
    );
  }
}
