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
import SelectNotemodal from "../Components/SelectNoteModal";
import AddNoteModal from "../Components/AddNoteModal";
import DeletedNote from "../Components/DeletedNote";
import axios from "axios";
import toast from "react-hot-toast";

const Dropdown = ({ onOpen, onNoteOpen, id }) => {
  return (
    <div className="flex flex-col dropdown absolute top-10 w-[150px] left-0 bg-slate-500 rounded-lg px-[4px] py-[6px] text-white z-[1]">
      <ul className="flex flex-col gap-[5px]">
        <li className="hover:bg-slate-100 hover:text-black hover:rounded-lg p-1">
          <button onClick={onOpen}>Add Existing Note</button>
        </li>
        <li className="hover:bg-slate-100 hover:text-black hover:rounded-lg p-1">
          <button onClick={onNoteOpen}>Create new Note</button>
        </li>
      </ul>
    </div>
  );
};

const TrashPage = () => {
  const [dropdown, setDropdown] = useState(false);
  const [filteredNotes, setfilteredNotes] = useState([]);
  const [AddNote, setAddNote] = useState(false);
  const [AddNoteOpen, setAddNoteOpen] = useState(false);
  const {
    setNotes,
    TrashedNotes,
    setTrashedNotes,
    setIsAuthenticated,
    setUser,
    isAuthenticated,
  } = useContext(Context);
  const { name, id } = useParams();
  const navigateTo = useNavigate();
  useEffect(() => {
    const filtered = TrashedNotes.filter((note) => {
      if (note?.isTrashed) {
        return note;
      }
    });
    setfilteredNotes(filtered);
  }, [TrashedNotes]);
  const handleNoteRestore = async (noteId) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:4000/api/v1/note/${noteId}/restore`,
        { isTrashed: false },
        { withCredentials: true }
      );
      toast.success("Note Restored!");
      setNotes((prev) => [data.note, ...prev]);
      setTrashedNotes((prev) => prev.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error("Error restoring note:", error);
      toast.error(error?.response.data.message);
    }
  };
  const handleNoteDelete = async (noteId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/note/deletenote/${noteId}`,
        { withCredentials: true }
      );
      // setNotes((prev) => [data.note, ...prev]);
      toast.success("Note Deleted!");
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
      setTrashedNotes((prev) => prev.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error("Error Deleting note:", error);
      toast.error(error?.response.data.message);
    }
  };
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );

      setIsAuthenticated(false);
      localStorage.setItem("isAuthenticated", false);
      toast.success("user Logged Out!");
      navigateTo("/login");
      setUser({});
    } catch (err) {
      console.log(err);
      toast.error(err?.response.data.message);
    }
  };

  const handleNoteAdded = (newNote) => {
    setTrashedNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const handleDeleteAll = async () => {
    try {
      const ids = filteredNotes.map((note) => {
        return note._id;
      });
      const { data } = await await axios.request({
        method: "DELETE",
        url: "http://localhost:4000/api/v1/note/deleteall",
        data: { id: ids },
        withCredentials: true,
      });
      if (data?.message) {
        toast.success("All Notes Deleted!");
      }
      ids.map((noteId) => {
        setNotes((prev) => prev.filter((note) => note._id !== noteId));
        setTrashedNotes((prev) => prev.filter((note) => note._id !== noteId));
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.response.data.message);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) navigateTo("/login");
  }, []);
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
        <HeaderComponent onSearch={() => {}} />
        <div className="bg-home min-h-screen p-[15px] sm:p-[40px] rounded-3xl dark:bg-[#343539]">
          <div className="my-heading flex gap-2 items-center ">
            <Link to={"/"}>
              <button className="border-4 rounded-full border-gray-200 dark:text-white dark:border-[#898989] ">
                <ArrowLeft size={30} />
              </button>
            </Link>
            <h1 className="sm:text-4xl text-2xl dark:text-white">
              Trash Notes
            </h1>
            <div className="button relative">
              <button
                className="bg-pink-400 text-white rounded-lg px-[3px] py-[6px] "
                onClick={handleDeleteAll}
              >
                Delete All
              </button>
              {dropdown && (
                <Dropdown
                  onOpen={() => setAddNote(true)}
                  onNoteOpen={() => setAddNoteOpen(true)}
                  id={id}
                />
              )}
            </div>
          </div>

          <div className="notes-container mt-5 flex gap-[15px] sm:gap-[25px] flex-wrap justify-center sm:justify-normal">
            {filteredNotes && filteredNotes.length > 0 ? (
              filteredNotes.map((note) => {
                return (
                  <DeletedNote
                    key={note._id}
                    note={note}
                    onNoteRestore={handleNoteRestore}
                    onNoteDelete={handleNoteDelete}
                  />
                );
              })
            ) : (
              <h1 className="text-2xl dark:text-white">Empty Folder</h1>
            )}
          </div>
        </div>
      </div>
      {AddNote && <SelectNotemodal onClose={() => setAddNote(false)} />}
      {AddNoteOpen && (
        <AddNoteModal
          onClose={() => setAddNoteOpen(false)}
          id={id}
          onNoteAdded={handleNoteAdded}
        />
      )}
    </div>
  );
};

export default TrashPage;
