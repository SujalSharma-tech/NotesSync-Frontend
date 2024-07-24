import SideBarComponent, { SidebarItem } from "../Components/SideBarComponent";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  faTrash,
  faNotesMedical,
  faBook,
  faUser,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderComponent from "../Components/HeaderComponent";
import NoteBody from "../Components/NoteBody";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext, useEffect } from "react";
import { Context } from "../index";
import { ArrowLeft, LogOut } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import SkeletonComponent from "../Components/SkeletonComponent";

const ShareNotePage = () => {
  const {
    setNotes,
    Notes,
    setTrashedNotes,
    setIsAuthenticated,

    sharedNotes,
    setSharedNotes,
    isLoading,
  } = useContext(Context);

  const navigateTo = useNavigate();

  const handleNoteUpdate = (updatedNote) => {
    const updatedNotes = sharedNotes.map((note) =>
      note._id === updatedNote._id ? updatedNote : note
    );
    setSharedNotes(updatedNotes);
  };

  const handleNoteDelete = (deletedNote) => {
    setTrashedNotes((prev) => [deletedNote, ...prev]);
    const filteredNotes = Notes.filter((note) => note._id !== deletedNote._id);
    setNotes(filteredNotes);
  };
  const [showShared, setshowShared] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const filterNotes = (shared, search) => {
    let filteredNotes = Notes;
    if (shared) {
      filteredNotes = sharedNotes;
    }
    if (search) {
      filteredNotes = filteredNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(search.toLowerCase()) ||
          note.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filteredNotes;
  };

  const filteredNotes = filterNotes(showShared, searchTerm);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "https://noti-fy-backend.onrender.com/api/v1/user/logout",
        { withCredentials: true }
      );

      setIsAuthenticated(false);
      localStorage.setItem("isAuthenticated", false);
      toast.success("User Logged Out!");
      navigateTo("/login");
    } catch (err) {
      console.log(err);
      toast.error(err?.response.data.message);
    }
  };

  const handleNoteAdded = (newNote) => {
    setTrashedNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
  };
  return (
    <div className="flex dark:bg-[#3C3D43]">
      <SideBarComponent>
        <Link to={"/"}>
          <SidebarItem
            icon={<FontAwesomeIcon icon={faNotesMedical} />}
            text="Home"
          />
        </Link>
        <Link to={"/profile"}>
          <SidebarItem
            icon={<FontAwesomeIcon icon={faUser} />}
            text="Profile"
          />
        </Link>
        <Link to={"/shared"}>
          <SidebarItem
            icon={<FontAwesomeIcon icon={faShareAlt} />}
            text="Shared"
          />
        </Link>
        <Link to={"/archieve"}>
          <SidebarItem
            icon={<FontAwesomeIcon icon={faBook} />}
            text="Archive"
          />
        </Link>
        <Link to={"/trash"}>
          <SidebarItem icon={<FontAwesomeIcon icon={faTrash} />} text="Trash" />
        </Link>
        <div className="logout flex" onClick={handleLogout}>
          <SidebarItem icon={<LogOut />} text="Logout" />
        </div>
      </SideBarComponent>

      <div className="w-full dark:bg-[#3C3D43]">
        <HeaderComponent onSearch={handleSearch} />
        <div className="bg-home min-h-screen h-auto p-[15px] sm:p-[40px] rounded-3xl dark:bg-[#343539]">
          <div className="my-heading flex gap-2 items-center ">
            <Link to={"/"}>
              <button className="border-4 rounded-full border-gray-200 dark:border-[#898989] dark:text-white">
                <ArrowLeft size={30} />
              </button>
            </Link>
            <h1 className="sm:text-4xl text-2xl dark:text-white">
              Shared With Me
            </h1>
          </div>

          {isLoading ? (
            <SkeletonComponent />
          ) : (
            <div className="notes-container mt-5 flex gap-3 sm:gap-[25px] flex-wrap sm:justify-normal justify-center">
              {filteredNotes && filteredNotes.length > 0 ? (
                filteredNotes.map((note) => {
                  return (
                    <NoteBody
                      key={note._id}
                      note={note}
                      onUpdate={handleNoteUpdate}
                      onDelete={handleNoteDelete}
                      allowedEdit={false}
                    />
                  );
                })
              ) : (
                <h1 className="text-2xl dark:text-white">No Notes Found</h1>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareNotePage;
