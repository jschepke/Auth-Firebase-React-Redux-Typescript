import useAuth from './hooks/useAuth';

function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <div>Hello {user?.email}</div>
    </div>
  );
}

export default Dashboard;
