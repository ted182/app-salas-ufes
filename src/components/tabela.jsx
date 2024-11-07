import React, { useState } from 'react';
import { Pencil, Save } from 'lucide-react';

const UserTable = () => {
  const [users, setUsers] = useState([
    { id: 1, nome: 'João', sobrenome: 'Silva' },
    { id: 2, nome: 'Maria', sobrenome: 'Santos' },
    { id: 3, nome: 'Pedro', sobrenome: 'Oliveira' },
    { id: 4, nome: 'Ana', sobrenome: 'Pereira' }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    nome: '',
    sobrenome: ''
  });

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setEditFormData({
      nome: user.nome,
      sobrenome: user.sobrenome
    });
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveClick = (id) => {
    const newUsers = users.map(user => {
      if (user.id === id) {
        return {
          ...user,
          nome: editFormData.nome,
          sobrenome: editFormData.sobrenome
        };
      }
      return user;
    });
    
    setUsers(newUsers);
    setEditingId(null);
  };

  return (
    <div className="p-4">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nome</th>
            <th className="border border-gray-300 px-4 py-2">Sobrenome</th>
            <th className="border border-gray-300 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {editingId === user.id ? (
                  <input
                    type="text"
                    name="nome"
                    value={editFormData.nome}
                    onChange={handleEditFormChange}
                    className="px-2 py-1 border rounded"
                  />
                ) : (
                  user.nome
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingId === user.id ? (
                  <input
                    type="text"
                    name="sobrenome"
                    value={editFormData.sobrenome}
                    onChange={handleEditFormChange}
                    className="px-2 py-1 border rounded"
                  />
                ) : (
                  user.sobrenome
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {editingId === user.id ? (
                  <button
                    className="flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleSaveClick(user.id)}
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Salvar
                  </button>
                ) : (
                  <button
                    className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleEditClick(user)}
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Editar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;