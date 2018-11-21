import React, { Component } from 'react';
import api from '../../../services/api';
import './style.css';
import Logo from "../../../assets/pingpongclub.png";
import Menu from '../../Menu';


export default class EditMatche extends Component {
  state = {
    matche: {},
    playerOneName: '',
    playerOneId: '',
    playerTwoName: '',
    playerTwoId: '',
    winner_id: '',
    score: '',
  };

  async componentDidMount(){
    const { id } = this.props.match.params;
    const response = await api.get(`matches/${id}`);
    this.setState({matche: response.data, playerOneName: response.data.users[0].name, playerOneId: response.data.users[0].id, playerTwoName: response.data.users[1].name, playerTwoId: response.data.users[1].id});
  }

  setScore = async e =>{
    e.preventDefault();
    const { id } = this.props.match.params;
    const { score, playerOneId, playerTwoId} = this.state;
    if (!score || score.indexOf("x") === -1){
      this.setState({ error: "Score incorreto!" });
    } else {
      let scoreA = score.split('x')[0].trim().replace(/[^0-9]/g,'');
      let scoreB = score.split('x')[1].trim().replace(/[^0-9]/g,'');
      if(scoreA === "" || scoreB === ""){
        this.setState({ error: "Score informado incorreto! Exemplo: 2 x 1 " });
      } else {
        try {
          const winner = scoreA >= scoreB ? playerOneId : playerTwoId;
          await api.put(`matches/${id}`, { score, winner_id: winner});
          this.props.history.goBack()
        } catch (err) {
          this.setState({
            error:
            "Houve um problema ao informar resultado!"
          });
        }
      }
    }

  }

  render(){
    const { playerOneName, playerTwoName } = this.state;
    return (
      <div className="Panel-Container">
        <Menu />
        <div className="panel">
          <div className="logo">
            <img src={Logo} alt="Logo Ping-Pong" />
          </div>
          <div className="box editMatche">
            <h2>Informar resultado da partida</h2>
            <p>{playerOneName} x {playerTwoName}</p>
            <form className="form" onSubmit={this.setScore}>
              {this.state.error && <p>{this.state.error}</p>}
              <input
                type="text"
                placeholder="Digite o resultado da partida EX: 2 x 1"
                onChange={e => this.setState({ score: e.target.value })}
              />
              <button type="submit">SALVAR</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
