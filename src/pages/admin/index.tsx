import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';

export default function Dashboard(): JSX.Element {
  const { handleLogout } = useContext(AuthContext);

  return (
    <section id="dashboard">
      <h1>administration area</h1>
      <button
        onClick={handleLogout}
      >
        logout
      </button>
    </section>
  )
}