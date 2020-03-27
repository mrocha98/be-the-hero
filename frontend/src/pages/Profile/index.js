import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import api from '../../services/api';
import './styles.css';

function Profile() {
  const [incidents, setIncidents] = useState([]);

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const history = useHistory();

  useEffect(() => {
    api
      .get('profile', {
        headers: {
          Authorization: ongId,
        },
      })
      .then((res) => setIncidents(res.data));
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      const confirmation = await Swal.fire({
        title: 'Tem certeza?',
        text: 'A exclusão é irreversível!',
        icon: 'warning',
        confirmButtonText: 'Confirmar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
      });
      if (confirmation.value) {
        await api.delete(`incidents/${id}`, {
          headers: { Authorization: ongId },
        });
        Swal.fire({
          icon: 'success',
          title: 'Incidente deletado!',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 1650,
          timerProgressBar: true,
        });
        setIncidents(incidents.filter((incident) => incident.id !== id));
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao deletar caso',
        text: 'tente novamente',
      });
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <Logo />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(({ id, title, description, value }) => (
          <li key={id}>
            <strong>CASO:</strong>
            <p>{title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{description}</p>
            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(value)}
            </p>
            <button type="button" onClick={() => handleDeleteIncident(id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
