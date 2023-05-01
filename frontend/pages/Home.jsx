import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Smartphone } from '../components/Smartphone';
import { useAllSmartphonesGetter } from '../services/api';
import '../assets/home.css';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Página Inicial - Desafio Ditavia'
  }, []);

  const { smartphones, error, isLoading } = useAllSmartphonesGetter();
  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar os dados</p>;

  return (
    <>
      <button className='action-button' type='button'>
        <Link to={'/add-smartphones'}>
          Novo Celular  
        </Link>
      </button>

      <div className="smartphone-table">
        <div className="row header-row">
          <span>Marca</span>
          <span>Modelo</span>
          <span>Capacidade de Memória</span>
          <span>Data de Lançamento</span>
          <span>Alterar</span>
          <span>Excluir</span>
        </div>
        {smartphones.map(smartphone => (
          <div key={smartphone._id} className='row'>
            <Smartphone id={smartphone._id} brand={smartphone.brand} model={smartphone.model} memoryCapacity={smartphone.memoryCapacity} releaseDate={smartphone.releaseDate} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
