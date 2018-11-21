import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';


export default class Menu extends Component {


  async componentDidMount(){
  }

  render(){

    return (
      <div className="navbar">
        <nav id="menu">
          <div className="nav-left">
              <ul>
                  <li><Link to={"/panel"}>Home</Link></li>
                  <li><Link to={"/players"}>Jogadores</Link></li>
                  <li><Link to={"/cups"}> Campeonatos</Link></li>
                  <li><Link to={"/matches"}>Partidas</Link></li>
              </ul>
            </div>
            <div className="nav-right">
              <ul>
                <li><Link to={"/logout"}>Sair</Link></li>
              </ul>
            </div>
        </nav>
      </div>
    );
  }
}
