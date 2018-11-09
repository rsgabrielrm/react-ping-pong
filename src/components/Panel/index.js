import React, { Component } from 'react';
import api from '../../services/api';
import './style.css';

export default class Panel extends Component {
  state = {
    user: '',
    email: '',
  };

  async componentDidMount(){
  }

  render(){
    return (
      <div className="panel">
        <h1>Meu Painel</h1>
      </div>
    );
  }
}
