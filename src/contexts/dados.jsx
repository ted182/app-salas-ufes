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
            nome: 'Horario Vago',
            departamento: 'Horario Vago',
            disciplina: 'Horario Vago'
        },
        1: {
            nome: 'João',
            departamento: 'Matemática',
            disciplina: 'Cálculo I'
        },
        2: {
            nome: 'Pedro',
            departamento: 'Física',
            disciplina: 'Física Básica I'
        },
    };

    //const cloneAgendaSemReferencia = JSON.parse(JSON.stringify( defaultAgenda() ));

    let salas = {
        1: { name: 'sala-101', agenda: JSON.parse(JSON.stringify( defaultAgenda() )) },
        2: { name: 'sala-201', agenda: JSON.parse(JSON.stringify( defaultAgenda() )) },
        3: { name: 'sala-301', agenda: JSON.parse(JSON.stringify( defaultAgenda() )) },
        4: { name: 'sala-401', agenda: JSON.parse(JSON.stringify( defaultAgenda() )) },
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
            salas[salaId].agenda[diaSemana][horarioId].disciplina = professores[professorId].disciplina;
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
        professores[teacherId] = { nome: name, departamento: depart, disciplina: subject };
    };

    function removeProfessor(id) {
        if (id && professores[id]) {
            delete professores[id];
            return true;
        };
        return false;
    };

    function addSala(roomName) {
        // Verifica o último ID registrado
        const lastRoomId = Math.max(0, ...Object.keys(salas).map(Number));

        if (lastRoomId >= nextRoomId) {
            nextRoomId = lastRoomId + 1;
        };

        const roomId = nextRoomId++;
        salas[roomId] = { name: roomName, agenda: JSON.parse(JSON.stringify( defaultAgenda() )) };
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
        removeProfessor,
        addSala,
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
    
    const [dados, setDados] = useState(null);           // <-- DADOS GERAIS
    const [tabela, setTabela] = useState(null);         // <-- DADOS QUE SERÃO MOSTRADOS NA TABELA

    return (
        <DadosContext.Provider
            value={{
                dados,
                tabela,
                setTabela
            }}
        >
            {children}
        </DadosContext.Provider>
    );
};

export default DadosContext;



