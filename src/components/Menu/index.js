import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './style.css';
import { getUserLocal } from "../../services/auth";


export default class Panel extends Component {


  async componentDidMount(){
  }

  render(){
    const user = this.state;
    console.log('state', this.state);
    return (
      <div className="navbar">
        <nav id="menu">
          <div className="nav-left">
              <ul>
                  <li><Link to={"/panel"}>Home</Link></li>
                  <li><Link to={"/cups"}> Campeonatos</Link></li>
                  <li><a href="#">Partidas</a></li>
                  <li><a href="#">Ranking</a></li>
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
