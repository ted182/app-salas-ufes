import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { House } from 'lucide-react';

//  importação do contexto
import DadosContext from '../contexts/dados';


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

    const classButtonOptions = `rounded-lg p-2 bg-sky-500/50 hover:bg-sky-500/30 mt-3`;

    const { dados, dadosAux, setDadosAux } = useContext(DadosContext);


    //  filtros
    const [filtroHorario, setFiltroHorario] = useState(null);
    const [filtroDia, setFiltroDia] = useState(null);

    //  reserva de sala
    const [reservaHorario, setReservaHorario] = useState(null);
    const [reservaDia, setReservaDia] = useState(null);
    const [reservaProf, setReservaProf] = useState(null);
    const [reservaDataProf, setReservaDataProf] = useState([{ value: 'vazio', label: 'vazio' }]);



    useEffect(() => {
        //console.log('verificando select professores no header...')
        if (!dados?.professores) return; // Retorna se não houver dados
        setReservaDataProf(createProfessorSelect(dados.professores));
    }, [dados, dadosAux]);



    return (
        <header className='bg-slate-500 flex h-auto p-4 gap-10'>
            <div className='flex flex-col w-screen'>
                <div>FILTROS</div>
                <div className='flex items-center gap-2'>
                    <div className='mt-4'>
                        <Select
                            placeholder='Horário'
                            value={filtroHorario}
                            onChange={(ev) => { setFiltroHorario(ev.target) }}
                            options={horarios}
                            className='w-auto'
                        />
                    </div>
                    <div className='mt-4'>
                        <Select
                            placeholder='Dia da Semana'
                            value={filtroDia}
                            onChange={(ev) => { setFiltroDia(ev.target) }}
                            options={dias}
                            className='w-auto'
                        />
                    </div>
                    <div className='mt-4'>
                        <button className='p-2 bg-slate-300 rounded'>Aplicar</button>
                    </div>
                    <div className='mt-4'>
                        <button className='p-2 bg-slate-300 rounded'>Remover</button>
                    </div>
                </div>
            </div>

            <div className='flex flex-col w-screen'>
                <div className='flex justify-end'>NAVEGAÇÃO</div>
                <div className='flex justify-end gap-2'>
                    <Link to='/'><button className={classButtonOptions}>Home</button></Link>
                    <Link to='/professores'><button className={classButtonOptions}>Cadastro de Professores</button></Link>
                    <Link to='/salas'><button className={classButtonOptions}>Cadastro de Salas</button></Link>
                </div>
            </div>
        </header>
    )
};

export default Header;