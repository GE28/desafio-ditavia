import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import '../assets/form.css';

function parseSmartphoneDate(date) {
  if (!date) return '';
  const [ year, month, remaining ] = date.split('-');
  const day = remaining.split('T')[0];
  return `${year}-${month}-${day}`;
}

export function SmartphoneForm({ loadedSmartphone, formSmartphoneFunction, apiResponse }) {
  const smartphone = loadedSmartphone || {
    brand: '',
    model: '',
    memoryCapacity: '',
    releaseDate: ''
  };
  if (smartphone.releaseDate) {
    smartphone.releaseDate = parseSmartphoneDate(smartphone.releaseDate);
  }

  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: smartphone
  });

  useEffect(() => {
    reset(smartphone);
  }, [reset]);

  return (
    <>
      <form id="smartphone-form" onSubmit={handleSubmit(formSmartphoneFunction)}>
        <div id="add-smartphone">
            <span id="form-title">Celular</span>
        
            <label htmlFor="brand">Marca</label>
            <input type="text" id="brand" {...register("brand")}/>

            <label htmlFor="model">Modelo</label>
            <input type="text" id="model" {...register("model")}/>

            <label htmlFor="memory">Memória</label>
            <input type="number" id="memory" {...register("memoryCapacity")}/>

            <label htmlFor="release-date">Lançamento</label>
            <input type="date" id="release-date" {...register("releaseDate")}/>
        </div>
        <div id="form-actions">
            <button type="button" onClick={() => navigate(-1)} className="action-button">
              Cancelar
            </button>
            <button type="submit" className="action-button">Salvar</button>
        </div>
        { apiResponse.data && apiResponse.isLoading && <span>Criando smartphone...</span> }
      </form>
    </>
  )
}
