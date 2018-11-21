import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './style.css';
import Logo from "../../assets/pingpongclub.png";
import Menu from '../Menu';

export default class Players extends Component {
  state = {
    title: '',
    players: [],
  };

  async componentDidMount(){
    if(this.props.match.path === '/players'){
      const response = await api.get("/users/");
      const result = response.data.sort((a,b) => {
        let rA = parseInt(a.rating);
        let rB = parseInt(b.rating);
        return (rA < rB) ? 1 : ((rB < rA) ? -1 : 0)
      });
      let title = "Jogadores"
      this.setState({players: result, title});
    } else {
      const { id } = this.props.match.params;
      const response = await api.get(`/championships/${id}`);
      const result = response.data.users.sort((a,b) => {
        let rA = parseInt(a.rating);
        let rB = parseInt(b.rating);
        return (rA < rB) ? 1 : ((rB < rA) ? -1 : 0)
      });
      let title = `Jogadores incritos no campeonato: ${response.data.name}`
      this.setState({players: result, title});
    }

  }

  render(){
    const { players, title } = this.state;
    return (
      <div className="Panel-Container">
        <Menu />
        <div className="panel">
          <div className="logo">
            <img src={Logo} alt="Logo Ping-Pong" />
          </div>
          <div className="box">
            <h2>{ title }</h2>
            <div className="users">
              <table>
                <tbody>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Rating</th>
                    <th>Detalhes</th>
                  </tr>
                  {players.map( player => (
                    <tr key={player.id}>
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
