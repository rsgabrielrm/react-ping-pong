import React, { Component } from 'react';
import Select from 'react-select';
import api from '../../../services/api';
import './style.css';
import Menu from '../../Menu';


export default class EditCup extends Component {
  state = {
    players: [],
    users: [],
    name: '',
    erro: '',
  };

  componentDidMount(){
     this.getPlayers();
  }

  registerPlayers = async e => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { name, users} = this.state;
    if (!name || users.length < 0) {
      this.setState({ error: "Nome do campeonato inválido ou não foi informado jogadores" });
    } else {
      try {
        await api.put(`/championships/${id}`, { name, users });
        this.props.history.push("/cups");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema ao inscrever jogadores no campeonato!"
        });
      }
    }
  }

  async getPlayers(){
    const { name } = this.props.match.params;
    this.setState({name});
    const response = await api.get("/users/");
    response.data.map( player => (
      this.setState(prevState => ({
        players: [...prevState.players, {"value":player.id, "label": player.name}]
      }))
    ));
  }

  handleChange = (selectedOption) => {
    const value = selectedOption.map(item => item.value);
    this.setState({ users: value });
  }

  render(){
    const { selectedOption } = this.state;
    return (
      <div className="Panel-Container">
        <Menu />
        <div className="panel">
          <div className="box">
            <form className="formCup" onSubmit={this.registerPlayers}>
              <div className="headerCupForm">
                <h2>Editar - Campeonato</h2>
              </div>
              <div className="campeonato">
                  <input
                    type="text"
                    placeholder="Digite o nome do campeonato para atualizar"
                    onChange={e => this.setState({ name: e.target.value })}
                    value={this.state.name}
                  />
              </div>
              <div>
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    isMulti
                    placeholder={'Selecione os jogadores'}
                    options={this.state.players}
                  />
              </div>
              <div className="boxButtonCup">
                <button type="submit">Atualizar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
