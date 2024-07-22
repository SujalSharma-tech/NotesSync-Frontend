import { createContext, useState } from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export const Context = createContext({
  isAuthenticated: false,
});

const Wrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  });
  const [user, setUser] = useState({});
  const [Notes, setNotes] = useState([]);
  const [TrashedNotes, setTrashedNotes] = useState([]);
  const [Folders, setFolders] = useState([]);
  const [mode, setMode] = useState(() => {
    return JSON.parse(localStorage.getItem("mode")) || "dark";
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleNoteUpdate = (updatedNote) => {
    const updatedNotes = Notes.map((note) =>
      note._id === updatedNote._id ? updatedNote : note
    );
    setNotes(updatedNotes);
  };
  const handleNoteDelete = (deletedNote) => {
    setTrashedNotes((prev) => [deletedNote, ...prev]);
    const filteredNotes = Notes.filter((note) => note._id !== deletedNote._id);
    setNotes(filteredNotes);
  };

  const filterNotes = (search) => {
    let filteredNotes = Notes;
    if (search) {
      filteredNotes = filteredNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(search.toLowerCase()) ||
          note.content.toLowerCase().includes(search.toLowerCase())
      );
      setNotes(filteredNotes);
    }
  };

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        Notes,
        setNotes,
        mode,
        setMode,
        Folders,
        setFolders,
        TrashedNotes,
        setTrashedNotes,
        handleNoteUpdate,
        handleNoteDelete,
        filterNotes,
        isLoading,
        setIsLoading,
      }}
    >
      <Toaster />
      <App />
    </Context.Provider>
  );
};
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<Wrapper />);
