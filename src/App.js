import Home from "./Pages/Home";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "./index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FolderPage from "./Pages/FolderPage";
import TrashPage from "./Pages/trashPage";
import ArchievePage from "./Pages/ArchievePage";
import Loginpage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import RegisterPage from "./Pages/RegisterPage";
import ProtectedRoute from "./protectedRoutes";
import { Toaster } from "react-hot-toast";
import ShareNotePage from "./Pages/ShareNotePage";
const App = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    Notes,
    setNotes,
    Folders,
    setFolders,
    TrashedNotes,
    setTrashedNotes,
    isLoading,
    setIsLoading,
    sharedNotes,
    setSharedNotes,
  } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "https://noti-fy-backend.onrender.com/api/v1/user/getmyprofile",
          {
            withCredentials: true,
          }
        );
        if (data) {
          setUser(data.user);
          console.log(data.user);
          setIsAuthenticated(true);
        }
      } catch (err) {
        setIsAuthenticated(false);
        setUser({});
        console.log(err);
      }
    };

    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          "https://noti-fy-backend.onrender.com/api/v1/note/mynotes",
          {
            withCredentials: true,
          }
        );
        const allNotes = data.notes;
        console.log(allNotes);
        const notTrashed = allNotes.filter((note) => !note.isTrashed);
        const Trashed = allNotes.filter((note) => note.isTrashed);
        setNotes(notTrashed);
        setIsLoading(false);
        setTrashedNotes(Trashed);
        console.log(data.notes);
      } catch (error) {
        setNotes([]);
        setIsLoading(false);
      }
    };
    const fetchFolders = async () => {
      try {
        const { data } = await axios.get(
          "https://noti-fy-backend.onrender.com/api/v1/folder/myfolders",
          {
            withCredentials: true,
          }
        );
        setFolders(data.folders);
        console.log(data.folders);
      } catch (error) {
        setFolders([]);
      }
    };
    const getNotes = async () => {
      try {
        const { data } = await axios.get(
          "https://noti-fy-backend.onrender.com/api/v1/note/shared-with-me",
          { withCredentials: true }
        );
        setSharedNotes(data.notes);
        console.log(sharedNotes);
      } catch (err) {
        console.log(err);
      }
    };

    if (isAuthenticated) {
      fetchUser();
      fetchNotes();
      fetchFolders();
      getNotes();
    }
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Loginpage />} />{" "}
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/archieve" element={<ArchievePage />} />
            <Route path="/folder/:name/:id" element={<FolderPage />} />
            <Route path="/trash" element={<TrashPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shared" element={<ShareNotePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
