import { useState } from 'react';
import { Link  } from 'react-router-dom';
import useSWR from 'swr';

import { API_URL, options, fetchMethod } from '../services/api';

export function Smartphone({id, brand, model, memoryCapacity, releaseDate}) {
    const [ shouldDelete, setShouldDelete ] = useState(false);
    const { data, isLoading, error } = useSWR(
        [shouldDelete ? `${API_URL}/${id}` : null,
         'DELETE'],
        ([url, method]) => fetchMethod(url, method),
        options
    );

    function confirmSmartphoneDeletion() {
        const confirm = window.confirm(`Tem certeza que deseja excluir o celular ${model}?`);
        if (confirm) {
            setShouldDelete(true);
        }
    }

    function parseSmartphoneDate() {
        const date = (new Date(releaseDate)).toLocaleDateString('en-US', { timeZone: 'UTC' });
        const day = date.split('/')[1].padStart(2, '0');
        const month = date.split('/')[0].padStart(2, '0');
        const year = date.split('/')[2];
        return `${day}/${month}/${year}`;
    }

    if (shouldDelete && data && !error) {
        return null;
    }

    return <>
        <span>{brand}</span>
        <span>{model}</span>
        <span>{memoryCapacity}</span>
        <span>{parseSmartphoneDate()}</span>
        <span>
            <button type='button'>
                <Link to={`/edit-smartphones/${id}`}>
                    Alterar
                </Link>
            </button>
        </span>
        <span>
            { isLoading ? 'Excluindo...' : (
                <button type='button' onClick={confirmSmartphoneDeletion}>
                    Excluir
                </button>
            )}
        </span>
    </>
}
