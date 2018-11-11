import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './style.css';
import Logo from "../../assets/pingpongclub.png";
import Menu from '../Menu';

export default class Cups extends Component {
  state = {
    cups: [],
    name: '',
    erro: '',
  };

  async componentDidMount(){
    const response = await api.get("/championships");
    this.setState({cups: response.data});
  }

  newCup = async e => {
    e.preventDefault();
    const { name } = this.state;
    if (!name) {
      this.setState({ error: "Nome do campeonato inválido!" });
    } else {
      try {
        const response = await api.post("/championships", { name });
        this.setState(prevState => ({
          cups: [...prevState.cups, response.data]
        }));
      } catch (err) {
        this.setState({
          error:
            "Houve um problema ao cadastrar campeonato!"
        });
      }
    }
  }

  render(){
    const ste = this.state;
    return (
      <div className="Panel-Container">
        <Menu />
        <div className="panel">
          <div className="logo">
            <img src={Logo} alt="Logo Ping-Pong" />
          </div>
          <div className="box">
            <div className="header-box">
              <form className="formCup" onSubmit={this.newCup}>
                <div className="box-left">
                  <h2>Campeonatos</h2>
                  <input
                  type="text"
                  placeholder="Digite o nome para cadastrar um novo campeonato"
                  onChange={e => this.setState({ name: e.target.value })}
                  />
                </div>
                <div className="box-right">
                  <button type="submit">Cadastrar</button>
                </div>
              </form>
            </div>
            <div className="errorForm">
              {this.state.error && <p>{this.state.error}</p>}
            </div>
            <div className="cups">
              <table>
                <tbody>
                  <tr>
                    <th>Nome</th>
                    <th>Partidas</th>
                  </tr>
                {this.state.cups.map( cup => (
                  <tr key={cup.id}>
                    <td>{cup.name}</td>
                    <td><Link to={`/cup/${cup.id}/matches`}>Detalhes</Link></td>
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
