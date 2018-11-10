import React, { Component } from 'react';
import api from '../../services/api';
import './style.css';
import Logo from "../../assets/pingpongclub.png";
import Menu from '../Menu';
import { getUserLocal } from "../../services/auth";

export default class Cups extends Component {
  state = {
    name: '',
    email: '',
    id: '',
  };

  async componentDidMount(){
    const dados = await getUserLocal();
    this.setState({'name': dados.name, 'email': dados.email, 'id': dados.id});
  }

  render(){
    const user = this.state;
    console.log('state', this.state);
    return (
      <div className="Panel-Container">
        <Menu />
        <div className="panel">
          <div className="logo">
            <img src={Logo} alt="Logo Ping-Pong" />
          </div>
          <div className="box">
            <h2>Meu Campeonato</h2>
            <div className="user">
              <p><strong>Nome</strong>: {user.name}</p>
              <p><strong>E-mail</strong>: {user.email}</p>
              <p><strong>Id</strong>: {user.id}</p>
            </div>
          </div>
          <div className="box">
          </div>
        </div>
      </div>
    );
  }
}
