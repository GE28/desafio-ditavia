import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useSWR from 'swr';

import { SmartphoneForm as Form } from '../components/SmartphoneForm';
import { API_URL, options, fetchWithBody } from '../services/api';
import '../assets/form.css';

function SmartphoneForm() {

  useEffect(() => {
    document.title = 'Formulário - Desafio Ditavia'
  }, []);

  const [ dataToSubmit, setDataToSubmit ] = useState(false);

  const createResponse = useSWR(
    [dataToSubmit ? `${API_URL}` : null, 
    dataToSubmit, 
    'POST'], 
    ([url, body, method]) => fetchWithBody(url, body, method), 
    options
  );

  function createSmartphone(data) {
    setDataToSubmit(data);
  }

  if (dataToSubmit && createResponse.data && !createResponse.error) {
    return <Navigate to="/" />
  }

  return (
    <Form 
      apiResponse={createResponse} 
      formSmartphoneFunction={createSmartphone} 
    />
  )
}

export default SmartphoneForm;
