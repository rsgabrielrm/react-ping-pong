import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './style.css';
import Logo from "../../assets/pingpongclub.png";
import Menu from '../Menu';

export default class Matches extends Component {
  constructor(props) {
		super(props)

		this.state = {
      matches: [],
      cupName: '',
      matche: {},
      page: 1,
      pageSize: '',
      pagesInfo: {},

    }

	}

componentDidMount() {
  this.loadMatches();
}

loadMatches = async (page = 1) => {
    if(this.props.match.path === '/matches'){
      const response = await api.get(`/matches?page=${page}`);
      const { data, ...pagesInfo } = response.data;
      this.setState({matches: data, page, pagesInfo});
    } else {
      const { id } = this.props.match.params;
      const response = await api.get(`/championships/${id}/matches?page=${page}`);
      const { data, ...pagesInfo } = response.data;
      this.setState({matches: data, page, pagesInfo});
    }
}


prevPage = () => {
  const { page } = this.state;

  if(page === 1) return;

  const pageNumber = page - 1;
  this.loadMatches(pageNumber);

}

nextPage = () => {
  const { page, pageSize } = this.state;

  if(page === pageSize) return;

  const pageNumber = page + 1;
  this.loadMatches(pageNumber);
}

  render(){
    const {page, pagesInfo} = this.state;
    return (
      <div className="Panel-Container">
        <Menu />
        <div className="panel">
          <div className="logo">
            <img src={Logo} alt="Logo Ping-Pong" />
          </div>
          <div className="boxMatches">
            <h2>Partidas </h2>
            <div className="matches">
              <table>
                <tbody>
                  <tr>
                    <th>Jogador 1</th>
                    <th>Informe Jogador 1</th>
                    <th>Informe Jogador 2</th>
                    <th>Jogador 2</th>
                    <th>Status da Partida</th>
                    <th>Informar Resultado</th>
                  </tr>
                  {this.state.matches.length < 1 ? <tr><td colSpan="6">Sem partidas geradas!</td></tr> : this.state.matches.map( matche => (
                    <tr key={matche.id}>
                      <td>{matche.users[0].name}</td>
                      <td>{matche.score_1}</td>
                      <td>{matche.score_2}</td>
                      <td>{matche.users[1].name}</td>
                      <td>{matche.finished ? "Finalizada" : "Aguardando"}</td>
                      <td><Link className={matche.finished ? "disabledLink" : ""} to={matche.finished ? "#" : `/matches/${matche.id}/edit/`}>Atualizar</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="actions">
              <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
              <button disabled={page === pagesInfo.totalPages} onClick={this.nextPage}>Próxima</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
