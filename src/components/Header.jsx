import React, { useState, useContext } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { House } from 'lucide-react';

import AuthContext from '../contexts/auth';


const horarios = [
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
    { value: 'segunda', label: 'Segunda' },
    { value: 'terca', label: 'Terça' },
    { value: 'quarta', label: 'Quarta' },
    { value: 'quinta', label: 'Quinta' },
    { value: 'sexta', label: 'Sexta' },
    { value: 'sabado', label: 'Sábado' },
    { value: 'domingo', label: 'Domingo' },
];



const Header = () => {

    const classHeader = `w-screen h-auto bg-slate-500 flex p-4 gap-10`;
    const classButtonOptions = `rounded-lg p-2 bg-sky-500/50 hover:bg-sky-500/30 mt-3`;

    const { user } = useContext(AuthContext);

    const [horarioInicio, setHorarioInicio] = useState(null);
    //const [horarioTermino, setHorarioTermino] = useState(null);
    const [diaSemana, setDiaSemana] = useState(null);

 

    return (
        <header className={classHeader}>
            <div className='flex flex-col'>
                <div>FILTROS</div>
                <div className='mt-4'>
                    <Select
                        placeholder='Horário'
                        value={horarioInicio}
                        onChange={(ev) => { setHorarioInicio(ev.target) }}
                        options={horarios}
                    />
                </div>
                <div className='mt-4'>
                    <Select
                        placeholder='Dia da Semana'
                        value={diaSemana}
                        onChange={(ev) => { setDiaSemana(ev.target) }}
                        options={dias}
                    />
                </div>
            </div>           

            <div className='flex flex-col'>
                <div className=''>RESERVA DE SALA</div>
                <div className='mt-4'>
                    <Select
                        placeholder='Horário'
                        value={horarioInicio}
                        onChange={(ev) => { setHorarioInicio(ev.target) }}
                        options={horarios}
                    />
                </div>
                <div className='mt-4'>
                    <Select
                        placeholder='Dia da Semana'
                        value={diaSemana}
                        onChange={(ev) => { setDiaSemana(ev.target) }}
                        options={dias}
                    />
                </div>
                <div className='mt-4'>
                    <Select
                        placeholder='Professor/Matéria'
                        value={diaSemana}
                        onChange={(ev) => { setDiaSemana(ev.target) }}
                        options={dias}
                    />
                </div>
                <div className='flex flex-col'>
                    <button className={classButtonOptions}>Reservar</button>
                </div>
            </div>

            <div className='flex flex-col'>
                <div className=''>OPÇÕES</div>
                <div className='flex flex-col'>
                    <Link to='/'><button className={classButtonOptions}>Home</button></Link>
                    <Link to='/professores'><button className={classButtonOptions}>Cadastro de Professores</button></Link>
                    <button className={classButtonOptions}>Cadastro de Salas</button>
                </div>
            </div>
        </header>
    )
};

export default Header;