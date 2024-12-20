// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';


const DadosContext = createContext();

function agendaDaSemana() {
    /*
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
    */

    let nextTeacherId = 1;
    let nextRoomId = 1;

    let professores = {
        0: {
            id: 0,
            cor: '#fff',
            nome: 'Horário Vago',
            departamento: 'Horário Vago',
            disciplina: 'Horário Vago'
        },
        1: {
            id: 1,
            cor: '#fff',
            nome: 'João',
            departamento: 'Matemática',
            disciplina: 'Cálculo I'
        },
        2: {
            id: 2,
            cor: '#fff',
            nome: 'Pedro',
            departamento: 'Física',
            disciplina: 'Física Básica I'
        },
    };

    //const cloneAgendaSemReferencia = JSON.parse(JSON.stringify( defaultAgenda() ));

    let salas = {
        1: { id: 1, nome: 'sala-101', predio: 'CT-1', agenda: JSON.parse(JSON.stringify(defaultAgenda())) },
        2: { id: 2, nome: 'sala-201', predio: 'CT-2', agenda: JSON.parse(JSON.stringify(defaultAgenda())) },
        3: { id: 3, nome: 'sala-301', predio: 'CT-3', agenda: JSON.parse(JSON.stringify(defaultAgenda())) },
        4: { id: 4, nome: 'sala-401', predio: 'CT-4', agenda: JSON.parse(JSON.stringify(defaultAgenda())) },
    };

    //  gera agenda vazia
    function defaultAgenda() {
        //console.log('rodou defaultagenda!')
        let semana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
        let dias = {};
        let result = {};
        semana.forEach(dia => {
            for (let i = 1; i <= 12; i++) {
                dias[i] = professores[0];
            };
            result[dia] = dias;
        });
        return result;
    };

    function setAgenda(salaId, diaSemana, horarioId, professorId) {
        if (salas[salaId]) {
            console.log(salaId, diaSemana, horarioId, professorId)
            salas[salaId].agenda[diaSemana][horarioId] = professores[professorId];
            return true;
        };
        return false;
    };

    function addProfessor(name, depart, subject) {
        // Verifica o último ID registrado
        const lastTeacherId = Math.max(0, ...Object.keys(professores).map(Number));

        if (lastTeacherId >= nextTeacherId) {
            nextTeacherId = lastTeacherId + 1;
        };

        const teacherId = nextTeacherId++;
        professores[teacherId] = { id: teacherId, cor: '', nome: name, departamento: depart, disciplina: subject };
    };

    //  Função para atualizar os dados dos professores nas agendas das salas
    function refreshAgenda(professor) {

        const keys = Object.keys(salas);
        //console.log(keys)
        const dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
        const horarios = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        keys.forEach(key => {
            dias.forEach(dia => {
                horarios.forEach(hora => {
                    //console.log(salas[key])
                    if (professor.id == salas[key].agenda[dia][hora].id) {
                        salas[key].agenda[dia][hora] = professor;
                    };
                })
            });
        })
    };


    function setProfessor(professorId, name, depart, subject, cor) {
        professores[professorId] = {
            id: professorId,
            cor: cor,
            nome: name,
            departamento: depart,
            disciplina: subject
        };
        refreshAgenda(professores[professorId]);
    };

    function removeProfessor(id) {
        if (id && professores[id]) {
            delete professores[id];
            return true;
        };
        return false;
    };

    function addSala(roomName, buildingName) {
        // Verifica o último ID registrado
        const lastRoomId = Math.max(0, ...Object.keys(salas).map(Number));

        if (lastRoomId >= nextRoomId) {
            nextRoomId = lastRoomId + 1;
        };

        const roomId = nextRoomId++;
        salas[roomId] = { id: roomId, nome: roomName, predio: buildingName, agenda: JSON.parse(JSON.stringify(defaultAgenda())) };
    };

    function setSala(roomId, name, building) {
        salas[roomId] = {
            id: roomId,
            nome: name,
            predio: building,
            agenda: salas[roomId].agenda,
        };
    };

    function removeSala(id) {
        if (salas[id]) {
            delete salas[id];
            return true;
        };
        return false;
    };

    return {
        salas,
        professores,
        setAgenda,
        addProfessor,
        setProfessor,
        removeProfessor,
        addSala,
        setSala,
        removeSala
    };

};


/*
const teste = agendaDaSemana();
//console.log(teste.salas[2].agenda.segunda);
const sala = 1
const horario = 12
const professor = 1
teste.setAgenda(sala,'segunda', horario, professor);
console.log(teste.salas[1].agenda.segunda[horario]);
console.log(teste.salas[1].agenda.domingo[horario]);

//teste.addProfessor('pedro', 'lala', 'bebe')
//console.log(teste.professores)

//teste.addSala('pedro')
//console.log(teste.salas)

//console.log( teste.defaultAgendaa() )
*/



export const DadosProvider = ({ children }) => {

    useEffect(() => {
        const ag = agendaDaSemana();
        setDados(ag);
    }, []);

    const [dados, setDados] = useState(null);                                       // <-- DADOS GERAIS
    const [dadosAux, setDadosAux] = useState(0);                                    // <-- VARIAVEL PARA AUXILIAR A DETEC'~AO DE MUDANÇAS NOS DADOS GERAIS
    const [modal, setModal] = useState(false);                                      // <-- MODAL PARA EDITAR DADOS DA TABELA
    const [modalData, setModalData] = useState(false);                              // <-- DADOS QUE SERÃO PASSADOS PARA O MODAL
    const [filtro, setFiltro] = useState(false);                                    // <-- INDICADOR SE O FILTRO ESTÁ ATIVADO
    const [filtroHorario, setFiltroHorario] = useState([{ value: 0, label: 'Vazio' }]);
    const [filtroDia, setFiltroDia] = useState([{ value: 0, label: 'Vazio' }]);


    return (
        <DadosContext.Provider
            value={{
                dados,
                dadosAux,
                setDadosAux,
                modal,
                setModal,
                modalData,
                setModalData,
                filtro,
                setFiltro,
                filtroHorario,
                setFiltroHorario,
                filtroDia,
                setFiltroDia
            }}
        >
            {children}
        </DadosContext.Provider>
    );
};

export default DadosContext;



