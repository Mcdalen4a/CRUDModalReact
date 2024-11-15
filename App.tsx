import { useState } from 'react';
import { Trash, Edit, Plus } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
}

const initialUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  { id: 3, name: 'Bob Smith', email: 'bob@example.com' },
];

const Crud = () => {
  const [users, setUsers] = useState(initialUsers);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  const handleCreateUser = () => {
    const id = Math.max(...users.map(user => user.id)) + 1;
    setUsers([...users, { id, ...newUser }]);
    setShowCreateModal(false);
    setNewUser({ name: '', email: '' });
  };

  const handleEditUser = () => {
    if (selectedUser) {
      const updatedUsers = users.map(user => user.id === selectedUser.id ? { ...user, ...newUser } : user);
      setUsers(updatedUsers);
      setShowEditModal(false);
      setNewUser({ name: '', email: '' });
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">CRUD Example</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowCreateModal(true)}>
        <Plus className="mr-2" />
        Create User
      </button>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => {
                  setSelectedUser(user);
                  setNewUser({ name: user.name, email: user.email });
                  setShowEditModal(true);
                }}>
                  <Edit className="mr-2" />
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                  setSelectedUser(user);
                  setShowDeleteModal(true);
                }}>
                  <Trash className="mr-2" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create User</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCreateUser}>
                Create
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2" onClick={() => setShowCreateModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleEditUser}>
                Save
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Delete User</h2>
            <p className="mb-4">Are you sure you want to delete {selectedUser?.name}?</p>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDeleteUser}>
              Delete
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Crud;