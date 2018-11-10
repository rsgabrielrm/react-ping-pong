import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import api from "../../services/api";
import { login } from "../../services/auth";

import './style.css';

import Logo from "../../assets/pingpongclub.png";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleLogin = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/users/login", { email, password });
        login(response.data);
        this.props.history.push("/panel");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login..."
        });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <form className="form" onSubmit={this.handleLogin}>
        <img src={Logo} alt="Logo Ping-Pong" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/signup">Criar conta</Link>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
