import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import HeroesImg from '../../assets/heroes.png';
import api from '../../services/api';
import './styles.css';

function Logon() {
  const [id, setId] = useState('');

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post('sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', res.data.name);
      history.push('/profile');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Falha no login',
        text: 'tente novamente',
      });
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <Logo />
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" /> Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={HeroesImg} alt="heroes" />
    </div>
  );
}

export default Logon;
