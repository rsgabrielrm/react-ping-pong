import React, { Component } from 'react';
import api from '../../../services/api';
import './style.css';
import Logo from "../../../assets/pingpongclub.png";
import Menu from '../../Menu';


export default class Details extends Component {
  state = {
    player: {},
  };

  async componentDidMount(){
    const { id } = this.props.match.params;
    const response = await api.get(`/users/${id}`);
    this.setState({player: response.data});
  }

  render(){
    const dados = this.state;
    return (
      <div className="Panel-Container">
        <Menu />
        <div className="panel">
          <div className="logo">
            <img src={Logo} alt="Logo Ping-Pong" />
          </div>
          <div className="box">
            <h2>Dados do Jogador</h2>
            <div className="user">
              <p><strong>Id</strong>: {dados.player.id}</p>
              <p><strong>Nome</strong>: {dados.player.name}</p>
              <p><strong>E-mail</strong>: {dados.player.email}</p>
              <p><strong>Rating</strong>: {dados.player.rating}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
