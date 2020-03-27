import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import api from '../../services/api';
import './styles.css';

function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, { headers: { Authorization: ongId } });
      Swal.fire({
        icon: 'success',
        title: 'Caso cadastrado!',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => history.push('/profile'));
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível cadastrar, tente novamente!',
      });
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <Logo />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" /> Voltar para home
          </Link>
        </section>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            placeholder="Valor em R$"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewIncident;
