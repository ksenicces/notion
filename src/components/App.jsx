import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Register from "./Register";
import LogIn from "./LogIn";
import AddNote from "./AddNote";
import HomePage from "./HomePage";
import Notes from "./Notes";
import EditNote from "./EditNote";
import NotFound from "./NotFound";
import WelcomePage from "./WelcomePage";
import usersData from "../../db.json";
import PrivateRoute from "./PrivateRoute";

const usersDb = usersData.users;
const notesDb = usersData.notes;

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [notes, setNotes] = useState([...notesDb]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {!(
        window.location.pathname === "/login" ||
        window.location.pathname === "/register"
      ) &&
        loggedInUser && <Header onLogout={handleLogout} />}
      <div className="main-content flex-grow pb-16 overflow-hidden">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/login"
            element={<LogIn setLoggedInUser={setLoggedInUser} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <PrivateRoute
                element={<HomePage user={loggedInUser} />}
                user={loggedInUser}
              />
            }
          />
          <Route
            path="/notes"
            element={
              <PrivateRoute
                element={
                  <Notes
                    user={loggedInUser}
                    notes={notes}
                    setNotes={setNotes}
                  />
                }
                user={loggedInUser}
              />
            }
          />
          <Route
            path="/notes/add"
            element={
              <PrivateRoute
                element={
                  <AddNote
                    user={loggedInUser}
                    notes={notes}
                    setNotes={setNotes}
                  />
                }
                user={loggedInUser}
              />
            }
          />
          <Route
            path="/notes/:id/edit"
            element={
              <PrivateRoute
                element={<EditNote notes={notes} setNotes={setNotes} />}
                user={loggedInUser}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
