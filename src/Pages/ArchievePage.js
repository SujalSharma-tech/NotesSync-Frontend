import SideBarComponent, { SidebarItem } from "../Components/SideBarComponent";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  faTrash,
  faNotesMedical,
  faBook,
  faUser,
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
import SelectArchiveModal from "../Components/SelectArchiveModal";

const Dropdown = ({ onOpen, onNoteOpen }) => {
  return (
    <div className="flex flex-col dropdown absolute top-10 w-[150px] left-0 bg-slate-500 rounded-lg px-[4px] py-[6px] text-white z-[1]">
      <ul className="flex flex-col gap-[5px]">
        <li className="hover:bg-slate-100 hover:text-black hover:rounded-lg p-1">
          <button onClick={onOpen}>Add Existing Note</button>
        </li>
        {/* <li className="hover:bg-slate-100 hover:text-black hover:rounded-lg p-1">
          <button onClick={onNoteOpen}>Create new Note</button>
        </li> */}
      </ul>
    </div>
  );
};

const ArchievePage = () => {
  const [dropdown, setDropdown] = useState(false);
  //   const [filteredNotes, setfilteredNotes] = useState([]);
  const [AddNote, setAddNote] = useState(false);
  const [AddNoteOpen, setAddNoteOpen] = useState(false);
  const { setNotes, Notes, setTrashedNotes, setIsAuthenticated } =
    useContext(Context);
  const { name, id } = useParams();
  const navigateTo = useNavigate();

  //   useEffect(() => {
  //     const filtered = Notes.filter((note) => {
  //       if (note?.isArchived) {
  //         return note;
  //       }
  //     });
  //     setfilteredNotes(filtered);
  //   }, [Notes]);
  const [showarchived, setshowarchived] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const filterNotes = (archived, search) => {
    let filteredNotes = Notes;
    if (archived) {
      filteredNotes = Notes.filter((note) => note.isArchived);
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

  const filteredNotes = filterNotes(showarchived, searchTerm);

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

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "https://noti-fy-backend.onrender.com/api/v1/user/logout",
        { withCredentials: true }
      );

      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleNoteAdded = (newNote) => {
    setTrashedNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
  };
  return (
    <div className="flex">
      <SideBarComponent>
        <Link to={"/"}>
          <SidebarItem
            icon={<FontAwesomeIcon icon={faNotesMedical} />}
            text="Home"
          />
        </Link>
        <Link to={"/"}>
          <SidebarItem
            icon={<FontAwesomeIcon icon={faUser} />}
            text="Profile"
          />
        </Link>
        <Link to={"/archieve"}>
          <SidebarItem
            icon={<FontAwesomeIcon icon={faBook} />}
            text="Archieve"
          />
        </Link>
        <Link to={"/trash"}>
          <SidebarItem icon={<FontAwesomeIcon icon={faTrash} />} text="Trash" />
        </Link>
        <div className="logout flex" onClick={handleLogout}>
          <SidebarItem icon={<LogOut />} text="Logout" />
        </div>
      </SideBarComponent>

      <div className="w-full">
        <HeaderComponent onSearch={handleSearch} />
        <div className="bg-home h-auto p-[15px] sm:p-[40px] rounded-3xl">
          <div className="my-heading flex gap-2 items-center ">
            <Link to={"/"}>
              <button className="border-4 rounded-full border-gray-200">
                <ArrowLeft size={30} />
              </button>
            </Link>
            <h1 className="sm:text-4xl text-2xl">Archived Notes</h1>
            <div className="button relative">
              <button
                className="bg-pink-400 text-white rounded-lg px-[3px] py-[6px] "
                onClick={() => setDropdown((prev) => !prev)}
              >
                Add Notes
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

          <div className="notes-container mt-5 flex gap-3 sm:gap-[25px] flex-wrap sm:justify-normal justify-center">
            {filteredNotes && filteredNotes.length > 0
              ? filteredNotes.map((note) => {
                  return (
                    <NoteBody
                      key={note._id}
                      note={note}
                      onUpdate={handleNoteUpdate}
                      onDelete={handleNoteDelete}
                    />
                  );
                })
              : "Empty Folder"}
          </div>
        </div>
      </div>
      {AddNote && (
        <SelectArchiveModal
          onClose={() => setAddNote(false)}
          handleDropDown={() => setDropdown(false)}
        />
      )}
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

export default ArchievePage;
