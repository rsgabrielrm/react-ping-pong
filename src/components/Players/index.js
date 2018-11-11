import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './style.css';
import Logo from "../../assets/pingpongclub.png";
import Menu from '../Menu';
import { getUserLocal } from "../../services/auth";

export default class Players extends Component {
  state = {
    players: [],
  };

  async componentDidMount(){
    const response = await api.get("/users/");
    this.setState({players: response.data});
  }

  render(){
    const players = this.state;
    console.log('state', this.state);
    return (
      <div className="Panel-Container">
        <Menu />
        <div className="panel">
          <div className="logo">
            <img src={Logo} alt="Logo Ping-Pong" />
          </div>
          <div className="box">
            <h2>Jogadores</h2>
            <div className="users">
              <table>
                <tbody>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Rating</th>
                    <th>Detalhes</th>
                  </tr>
                  {this.state.players.map( player => (
                    <tr key={player._id}>
                      <td>{player.name}</td>
                      <td>{player.email}</td>
                      <td>{player.rating}</td>
                      <td><Link to={`/player/${player.id}/`}>Detalhes</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
