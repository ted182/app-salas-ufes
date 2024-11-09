
import React, { useContext } from 'react';

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


const TabelaSemana = ({ tabela }) => {

    const { setModal, setDadosAux, setModalData } = useContext(DadosContext);

    function handleModal(dia, horario, professor) {
        //console.log(modalData)
        //console.log({ dia: dia.id, horario: horario.value })
        //console.log(professor)

        setModalData(prev => {
            //prev['idSala'] = 0;
            prev['idDia'] = dia.id;
            prev['idHorario'] = horario.id;
            prev['idProfessor'] = professor.id;
            return prev;
        });

        setDadosAux((prevVar) => prevVar + 1);

        setModal(true);
    };




    return (
        <div className="flex flex-col">

            {/* Cabeçalho da Tabela */}
            <div className="flex text-center bg-slate-100">
                <div className="flex-1 border">Horário</div>
                {diasDaSemana.map((dia, index) => (
                    <div key={index} className="flex-1 border">{dia.value}</div>
                ))}
            </div>

            {/* Conteúdo da Tabela */}
            {horarios.map((horario, hi) => (
                <div key={hi} className="flex">
                    <div className="flex-1 border bg-slate-100 flex items-center justify-center">
                        <span>{horario.value}</span>
                    </div>

                    {diasDaSemana.map((dia, di) => (
                        <div key={di} className="flex-1 border flex items-center justify-center">

                            {tabela ? (

                                <button
                                    className={`p-2 w-full h-full border-2 border-transparent hover:border-black`}
                                    style={{ backgroundColor: tabela.agenda[dia.id][horario.id].cor }}
                                    onClick={() => handleModal(dia, horario, tabela.agenda[dia.id][horario.id])}>
                                    {tabela.agenda[dia.id][horario.id].disciplina}
                                </button>


                            ) : ('-')
                            }

                        </div>
                    ))}

                </div>
            ))}

        </div>
    );




};

export default TabelaSemana;
