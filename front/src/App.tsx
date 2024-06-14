import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import LogIn from "./pages/LogIn/LogIn";
import { SearchProvider } from "./SearchContext";
import { Onboarding } from "./pages/Onboarding/Onboarding";

function App() {
  return (
    <div className="App">
      <SearchProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/chat" element={<Main />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Routes>
        </Router>
      </SearchProvider>
    </div>
  );
}

export default App;
