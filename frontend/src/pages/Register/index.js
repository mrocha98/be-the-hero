import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FiArrowLeft } from 'react-icons/fi';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import api from '../../services/api';
import './styles.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };
    try {
      const res = await api.post('ongs', data);
      Swal.fire({
        icon: 'success',
        title: 'Cadastro realizado!',
        text: `Seu ID de acesso é ${res.data.id}`,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => history.push('/'));
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível cadastrar, tente novamente!',
      });
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <Logo />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" /> Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={3}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
          />
          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              minLength={5}
              required
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              size={2}
              required
            />
          </div>
          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
