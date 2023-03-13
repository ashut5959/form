import { Routes, Route, HashRouter  } from "react-router-dom";
import UserForm from "./conponents/UserForm.js";
import DisplayForm from "./conponents/displayUserForm"
function App() {
  return (
    <HashRouter >
      <Routes>
        <Route exact path="/" element={<UserForm />} />
        <Route exact path="/userForm" element={<DisplayForm />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
