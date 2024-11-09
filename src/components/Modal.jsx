import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { Save, Trash2 } from 'lucide-react';

//  importação do contexto
import DadosContext from '../contexts/dados';





const diasDaSemana = [
    { id: 'segunda', value: 'Segunda' },
    { id: 'terca', value: 'Terça' },
    { id: 'quarta', value: 'Quarta' },
    { id: 'quinta', value: 'Quinta' },
    { id: 'sexta', value: 'Sexta' },
    { id: 'sabado', value: 'Sábado' },
    { id: 'domingo', value: 'Domingo' },
];

const horarios = [
    { id: 1, value: '07:00 - 08:00' },
    { id: 2, value: '08:00 - 09:00' },
    { id: 3, value: '09:00 - 10:00' },
    { id: 4, value: '10:00 - 11:00' },
    { id: 5, value: '11:00 - 12:00' },
    { id: 6, value: '12:00 - 13:00' },
    { id: 7, value: '13:00 - 14:00' },
    { id: 8, value: '14:00 - 15:00' },
    { id: 9, value: '15:00 - 16:00' },
    { id: 10, value: '16:00 - 17:00' },
    { id: 11, value: '17:00 - 18:00' },
    { id: 12, value: '18:00 - 19:00' },
];

function findValue(array, id) {
    const found = array.find(x => x.id === id);
    return found.value;
};

function createProfessorSelect(obj) {

    const arr = [];
    const keys = Object.keys(obj);
    const values = Object.values(obj);

    values.forEach((k, idx) => {
        if (idx) arr.push({ id: keys[idx], value: k.nome, label: `${k.nome} (${k.disciplina})` })
    });

    return arr;
};


const Modal = () => {

    const { dados, dadosAux, setDadosAux, modal, setModal, modalData } = useContext(DadosContext);

    //const [isOpen, setModal] = useState(false);
    const [reservaProf, setReservaProf] = useState(null);
    const [reservaDataProf, setReservaDataProf] = useState([{ value: 'vazio', label: 'vazio' }]);

    //  variaveis que vão preencher os dados do modal
    const [dia, setDia] = useState('-');
    const [horario, setHorario] = useState('-');
    const [disciplina, setDisciplina] = useState('-');
    const [sala, setSala] = useState('-');



    useEffect(() => {

        if (!dados?.professores) return; // Retorna se não houver dados
        if (!modalData.idDia) return;

        setReservaDataProf(createProfessorSelect(dados.professores));

        //console.log(modalData.idDia)
        //console.log(modalData.idHorario)
        //console.log(modalData.idProfessor)
        //console.log(modalData.idSala)
        //console.log(dados.salas[modalData.idSala].agenda['segunda'])

        //console.log(dados.salas[modalData.idSala].agenda[modalData.idDia][modalData.idHorario].disciplina)

        setDia(findValue(diasDaSemana, modalData.idDia));
        setHorario(findValue(horarios, modalData.idHorario));
        setDisciplina(dados.salas[modalData.idSala].agenda[modalData.idDia][modalData.idHorario].disciplina);
        setSala(dados.salas[modalData.idSala]);

    }, [dados, dadosAux, modalData]);



    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (!reservaProf) return;
        // Handle form submission logic here
        //console.log(`First Name: ${firstName}, Last Name: ${lastName}`);    
        //console.log('valor do select model: ', reservaProf)     

        if (dados.setAgenda(modalData.idSala, modalData.idDia, modalData.idHorario, reservaProf.id)) {
            setDadosAux((prevVar) => prevVar + 1);
            console.log('tabela atualizada!');
        } else {
            console.log('erro ao salvar dados!');
        };
        //console.log(dados.salas[modalData.idSala].agenda[modalData.idDia][modalData.idHorario])
        setModal(false);
    };

    const handleDelete = (ev) => {
        ev.preventDefault();

        if (dados.setAgenda(modalData.idSala, modalData.idDia, modalData.idHorario, 0)) {
            setDadosAux((prevVar) => prevVar + 1);
            console.log('tabela atualizada!');
        } else {
            console.log('erro ao salvar dados!');
        };

        setModal(false);
    };

    if (!modal) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Agendamento</h2>
                    <button
                        onClick={() => setModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                <dir className='p-0'>
                    <p><span className='font-bold'>Dia da semana: </span>{dia}</p>
                    <p><span className='font-bold'>Horário: </span>{horario}</p>
                    <p><span className='font-bold'>Matéria agendada: </span>{disciplina}</p>
                    <p><span className='font-bold'>Sala: </span>{sala.nome} ({sala.predio})</p>
                    <div className={`p-2 mt-2 text-center text-white ${disciplina != 'Horário Vago' ? 'bg-red-600' : ''} ''`}>
                        <p className='font-bold'>ATENÇÃO!</p>
                        <p>Ja existe matéria agendada no horário selecionado</p>
                    </div>
                </dir>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Selecionar Matéria:
                        </label>
                        <Select
                            placeholder='Professor/Matéria'
                            value={reservaProf}
                            onChange={(ev) => { setReservaProf(ev) }}
                            options={reservaDataProf}
                        />
                    </div>
                    <div className="flex justify-between space-x-2 mt-4">
                        <div className='flex space-x-2'>
                            {disciplina != 'Horário Vago' && (
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    <div className='flex items-center'>
                                        <div><Trash2 className='w-4 h-4' /></div>
                                        <div className='ml-2'>Deletar</div>
                                    </div>
                                </button>
                            )}
                        </div>
                        <div className='flex space-x-2'>
                            <button
                                type="button"
                                onClick={() => setModal(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                <div className='flex items-center'>
                                    <div><Save className='w-4 h-4' /></div>
                                    <div className='ml-2'>Salvar</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;