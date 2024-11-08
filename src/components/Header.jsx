import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { House } from 'lucide-react';

//  importação do contexto
import DadosContext from '../contexts/dados';


const horarios = [
    { value: 0, label: 'Vazio' },
    { value: '1', label: '7:00' },
    { value: '2', label: '8:00' },
    { value: '3', label: '9:00' },
    { value: '4', label: '10:00' },
    { value: '5', label: '11:00' },
    { value: '6', label: '12:00' },
    { value: '7', label: '13:00' },
    { value: '8', label: '14:00' },
    { value: '9', label: '15:00' },
    { value: '10', label: '16:00' },
    { value: '11', label: '17:00' },
    { value: '12', label: '18:00' },
];

const dias = [
    { value: 0, label: 'Vazio' },
    { value: 'segunda', label: 'Segunda' },
    { value: 'terca', label: 'Terça' },
    { value: 'quarta', label: 'Quarta' },
    { value: 'quinta', label: 'Quinta' },
    { value: 'sexta', label: 'Sexta' },
    { value: 'sabado', label: 'Sábado' },
    { value: 'domingo', label: 'Domingo' },
];

function createProfessorSelect(obj) {

    const arr = [];
    const keys = Object.keys(obj);
    const values = Object.values(obj);

    values.forEach((k, idx) => {
        if (idx) arr.push({ id: keys[idx], value: k.nome, label: `${k.nome} (${k.disciplina})` })
    });

    return arr;
};

const Header = () => {

    const classButtonOptions = `rounded-lg p-2 mt-3 bg-slate-300 hover:bg-sky-500/30 shadow-md`;

    const {
        dados,
        dadosAux,
        setDadosAux,
        filtro,
        setFiltro,
        filtroHorario,
        setFiltroHorario,
        filtroDia,
        setFiltroDia
    } = useContext(DadosContext);


    //  filtros


    //  reserva de sala   
    //const [reservaDataProf, setReservaDataProf] = useState([{ value: 'vazio', label: 'vazio' }]);


    /*
    useEffect(() => {
        //console.log('verificando select professores no header...')
        if (!dados?.professores) return; // Retorna se não houver dados
        setReservaDataProf(createProfessorSelect(dados.professores));
    }, [dados, dadosAux]);
    */

    function handleFiltro(estado) {
        setFiltro(estado);
    };


    return (
        <header className='bg-slate-500 flex flex-col md:flex-row h-auto p-4 gap-10'>
            <div className='w-full md:w-1/2 bg-slate-50/50 rounded-lg p-4'>
                <div className='flex justify-center font-bold'>FILTROS</div>
                <div className='flex items-center justify-center gap-2'>
                    <div className='mt-4'>
                        <Select
                            placeholder='Horário'
                            value={filtroHorario}
                            onChange={(ev) => { setFiltroHorario(ev) }}
                            options={horarios}
                            className='w-auto'
                            isDisabled={filtro}
                        />
                    </div>
                    <div className='mt-4'>
                        <Select
                            placeholder='Dia da Semana'
                            value={filtroDia}
                            onChange={(ev) => { setFiltroDia(ev) }}
                            options={dias}
                            className='w-auto'
                            isDisabled={filtro}
                        />
                    </div>
                    <div className='mt-4'>
                        <button
                            className='p-2 bg-slate-300 rounded'
                            onClick={() => handleFiltro(true)}
                        >
                            Aplicar
                        </button>
                    </div>
                    <div className='mt-4'>
                        <button
                            className='p-2 bg-slate-300 rounded'
                            onClick={() => handleFiltro(false)}
                        >
                            Remover</button>
                    </div>
                </div>
            </div>

            <div className='w-full md:w-1/2 bg-slate-50/50 rounded-lg p-4'>
                <div className='flex justify-center font-bold'>NAVEGAÇÃO</div>
                <div className='flex justify-center gap-2'>
                    <Link to='/'><button className={classButtonOptions}>Home</button></Link>
                    <Link to='/professores'><button className={classButtonOptions}>Cadastro de Professores</button></Link>
                    <Link to='/salas'><button className={classButtonOptions}>Cadastro de Salas</button></Link>
                </div>
            </div>
        </header>
    )
};

export default Header;