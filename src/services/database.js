
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, query, where, Timestamp, deleteDoc, updateDoc } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
};


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);







const professorExemplo = {
    cor: '#fff',
    nome: 'Horário Vago',
    departamento: 'Horário Vago',
    disciplina: 'Horário Vago'
};

const agendaExemplo = {
    segunda: {
        1: professorExemplo,
        2: professorExemplo,
        3: professorExemplo,
        4: professorExemplo,
        5: professorExemplo,
        6: professorExemplo,
        7: professorExemplo,
        8: professorExemplo,
        9: professorExemplo,
        10: professorExemplo,
        11: professorExemplo,
        12: professorExemplo,
    },
    terca: {
        1: professorExemplo,
        2: professorExemplo,
        3: professorExemplo,
        4: professorExemplo,
        5: professorExemplo,
        6: professorExemplo,
        7: professorExemplo,
        8: professorExemplo,
        9: professorExemplo,
        10: professorExemplo,
        11: professorExemplo,
        12: professorExemplo,
    },
    quarta: {
        1: professorExemplo,
        2: professorExemplo,
        3: professorExemplo,
        4: professorExemplo,
        5: professorExemplo,
        6: professorExemplo,
        7: professorExemplo,
        8: professorExemplo,
        9: professorExemplo,
        10: professorExemplo,
        11: professorExemplo,
        12: professorExemplo,
    },
    quinta: {
        1: professorExemplo,
        2: professorExemplo,
        3: professorExemplo,
        4: professorExemplo,
        5: professorExemplo,
        6: professorExemplo,
        7: professorExemplo,
        8: professorExemplo,
        9: professorExemplo,
        10: professorExemplo,
        11: professorExemplo,
        12: professorExemplo,
    },
    sexta: {
        1: professorExemplo,
        2: professorExemplo,
        3: professorExemplo,
        4: professorExemplo,
        5: professorExemplo,
        6: professorExemplo,
        7: professorExemplo,
        8: professorExemplo,
        9: professorExemplo,
        10: professorExemplo,
        11: professorExemplo,
        12: professorExemplo,
    },
    sabado: {
        1: professorExemplo,
        2: professorExemplo,
        3: professorExemplo,
        4: professorExemplo,
        5: professorExemplo,
        6: professorExemplo,
        7: professorExemplo,
        8: professorExemplo,
        9: professorExemplo,
        10: professorExemplo,
        11: professorExemplo,
        12: professorExemplo,
    },
    domingo: {
        1: professorExemplo,
        2: professorExemplo,
        3: professorExemplo,
        4: professorExemplo,
        5: professorExemplo,
        6: professorExemplo,
        7: professorExemplo,
        8: professorExemplo,
        9: professorExemplo,
        10: professorExemplo,
        11: professorExemplo,
        12: professorExemplo,
    }
};

const salaExemplo = {
    nome: 'sala-101', predio: 'CT-1', agenda: agendaExemplo
};



//  RETORNA TODAS OS PROFESSORES

async function dataBaseGetProfessores() {

    let result = {};

    try {
        // Buscar itens da coleção principal
        //const q = query( collection(db, 'professores'), where('estado', '==', estado) );
        const collectionRef = collection(db, `professores`);
        const collectionSnapshot = await getDocs(collectionRef);    // <- PEGA TODAS OS DOCS DA COLEÇÃO (QUE PASSARAM NO FILTRO)
        console.log('Docs retornados com sucesso!');
        
        collectionSnapshot.docs.map(doc => {
            result[doc.id] = { ...doc.data() };            
        });     

    } catch (error) {
        console.error('Erro ao buscar documentos:', error);
    }

    return result;
};


//  FUNCÃO QUE ADICIONA NA COLLECTION PROFESSORES

async function dataBaseAddProfessor(name, dep, subject, color) {

    const data = {
        cor: color,
        nome: name,
        departamento: dep,
        disciplina: subject
    };

    try {
        const collectionRef = collection(db, `professores`);
        const docRef = await addDoc(collectionRef, data);
        console.log('Documento adicionado à coleção PROFESSORES com ID:', docRef.id);
    } catch (error) {
        console.error('Erro ao adicionar documento à coleção:', error);
    };

};


//  FUNCÃO QUE REMOVE UM PROFESSOR

async function dataBaseRemoveProfessor(id) {
   
    try {
        const docRef = doc(db, `professores`, id);
        await deleteDoc( docRef );
        console.log('Professor deletado com sucesso!');
    } catch (error) {
        console.error('Erro ao deletar Professor da coleção', error);
    };

};

//  FUNCÃO QUE EDITA UM PROFESSOR

async function dataBaseEditProfessor(id, name, dep, subject, color) {
   
    const data = {
        cor: color,
        nome: name,
        departamento: dep,
        disciplina: subject
    };
    
    try {
        const docRef = doc(db, `professores`, id);
        await updateDoc( docRef, data );
        console.log('Professor atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar dados do Professor', error);
    };

};













//  #####################################################################################

/*
dataBaseAddProfessor(
    'Augusto Tedesco',
    'Engenharia ELétrica',
    'Eletromagnetismo II',
    '#fff'
);
*/

//dataBaseRemoveProfessor('1g83MR0hgpSQOkBSMCFI')


console.log(await dataBaseGetProfessores())



