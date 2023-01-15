import { AuthGuard } from "./features/auth/AuthGuard";

function App() {
  return (
    <div>
      <AuthGuard>
        <div>User logged in ✅</div>
      </AuthGuard>
    </div>
  );
}

export default App;
