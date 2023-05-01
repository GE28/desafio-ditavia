import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useSWR from 'swr';

import { SmartphoneForm as Form } from '../components/SmartphoneForm';
import { API_URL, options, fetchWithBody, fetcher } from '../services/api';
import '../assets/form.css';

function SmartphoneForm() {
  const { id } = useParams();

  useEffect(() => {
    document.title = 'Formulário - Desafio Ditavia'
  }, []);

  const loadResponde = useSWR(
    id ? `${API_URL}/${id}` : null, 
    (url) => fetcher(url), 
    options
  );

  const [ dataToSubmit, setDataToSubmit ] = useState(false);

  const createResponse = useSWR(
    [dataToSubmit ? `${API_URL}/${id}` : null, 
    dataToSubmit, 
    'PUT'], 
    ([url, body, method]) => fetchWithBody(url, body, method), 
    options
  );

  function createSmartphone(data) {
    setDataToSubmit(data);
  }

  if (loadResponde.isLoading) return <p>Carregando...</p>;
  if (loadResponde.error) return <p>Erro ao carregar os dados</p>;

  if (dataToSubmit && createResponse.data && !createResponse.error) {
    return <Navigate to="/" />
  }

  return (
    <Form
      loadedSmartphone={loadResponde.data} 
      apiResponse={createResponse} 
      formSmartphoneFunction={createSmartphone} 
    />
  )
}

export default SmartphoneForm;
