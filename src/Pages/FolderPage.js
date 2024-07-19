import SideBarComponent, { SidebarItem } from "../Components/SideBarComponent";
import { Link, useParams } from "react-router-dom";
import {
  faTrash,
  faNotesMedical,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import HeaderComponent from "../Components/HeaderComponent";
import NoteBody from "../Components/NoteBody";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext, useEffect } from "react";
import { Context } from "../index";
import { ArrowLeft } from "lucide-react";
import SelectNotemodal from "../Components/SelectNoteModal";
import AddNoteModal from "../Components/AddNoteModal";

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

const FolderPage = () => {
  const [dropdown, setDropdown] = useState(false);
  const [filteredNotes, setfilteredNotes] = useState([]);
  const [AddNote, setAddNote] = useState(false);
  const [AddNoteOpen, setAddNoteOpen] = useState(false);
  const { setNotes, Notes, handleNoteUpdate, handleNoteDelete } =
    useContext(Context);
  const { name, id } = useParams();
  useEffect(() => {
    const filtered = Notes.filter((note) => {
      if (note?.folder == id) {
        return note;
      }
    });
    setfilteredNotes(filtered);
  }, [Notes]);

  const handleNoteAdded = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
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
        <Link to={"/archieve"}>
          <SidebarItem
            icon={<FontAwesomeIcon icon={faBook} />}
            text="Archieve"
          />
        </Link>
        <Link to={"/trash"}>
          <SidebarItem icon={<FontAwesomeIcon icon={faTrash} />} text="Trash" />
        </Link>
      </SideBarComponent>

      <div className="w-full">
        <HeaderComponent />
        <div className="bg-home h-auto p-[10px] sm:p-[40px] rounded-3xl">
          <div className="my-heading flex gap-2 items-center ">
            <Link to={"/"}>
              <button className="border-4 rounded-full border-gray-200">
                <ArrowLeft size={30} />
              </button>
            </Link>
            <h1 className="text-4xl">{name}</h1>
            <div className="button relative">
              <button
                className="bg-pink-400 text-white rounded-lg px-[3px] py-[6px] "
                onClick={() => setDropdown((prev) => !prev)}
              >
                Add Note
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
          <div className="notes-range-selector flex mt-5 gap-[15px] sm:gap-[30px]">
            <div>All</div>
            <button className="text-[#CCCDCF] hover:text-black transition duration-500">
              Today
            </button>
            <button className="text-[#CCCDCF] hover:text-black transition duration-500">
              This Week
            </button>
            <button className="text-[#CCCDCF] hover:text-black transition duration-500">
              This Month
            </button>
          </div>
          <div className="notes-container mt-5 flex gap-[15px] sm:gap-[25px] flex-wrap justify-center">
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
            {/* <AddNote onOpen={onOpen} /> */}
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

export default FolderPage;
