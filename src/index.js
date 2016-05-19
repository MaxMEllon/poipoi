'use strict';

import '../assets/style';
import React from 'react';
import ReactDOM from 'react-dom';
import FileManager from './components/FileManeger';

window.onload = function() {
  ReactDOM.render(<FileManager />, document.getElementById('main'));
}

// vim: ft=javascript.jsx

