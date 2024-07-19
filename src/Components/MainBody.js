import { useState, useContext } from "react";
import { Context } from "../index";
import FolderBody, { AddFolder } from "./FolderBody";
import HeaderComponent from "./HeaderComponent";
import NoteBody, { AddNote } from "./NoteBody";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PinnedNote from "./PinnedNote";
import PinnedFolder from "./PinnedFolder";

const MainBody = ({ onOpen, onOpenFolder }) => {
  const { Notes, setNotes, Folders, setTrashedNotes, setFolders } =
    useContext(Context);
  const [selectedRange, setSelectedRange] = useState("all");
  const [selectedFolderRange, setSelectedFolderRange] = useState("all");
  const [showPinned, setShowPinned] = useState(true);
  const [showPinnedFolders, setShowPinnedFolders] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleNoteUpdate = (updatedNote) => {
    const updatedNotes = Notes.map((note) =>
      note._id === updatedNote._id ? updatedNote : note
    );
    setNotes(updatedNotes);
  };
  const handleFolderUpdate = (updatedFolder) => {
    console.log(updatedFolder);
    const updatedFolders = Folders.map((folder) =>
      folder._id === updatedFolder._id ? updatedFolder : folder
    );
    setFolders(updatedFolders);
    console.log("check");
    console.log(Notes);
  };
  const handleFolderDelete = (updatedFolder) => {
    console.log(updatedFolder);
    const updatedFolders = Folders.map((folder) =>
      folder._id === updatedFolder._id ? updatedFolder : folder
    );
    setFolders(updatedFolders);
    console.log("check");
    console.log(Notes);
    setNotes((prev) =>
      prev.map((note) =>
        note.folder !== updatedFolder._id ? note : { ...note, folder: null }
      )
    );
  };

  const handleNoteDelete = (deletedNote) => {
    setTrashedNotes((prev) => [deletedNote, ...prev]);
    const filteredNotes = Notes.filter((note) => note._id !== deletedNote._id);
    setNotes(filteredNotes);
  };

  const handleRangeClick = (range) => {
    setSelectedRange(range);
    setShowPinned(false);
  };
  const handleFolderRangeClick = (range) => {
    setSelectedFolderRange(range);
    setShowPinnedFolders(false);
  };

  const handlePinnedClick = () => {
    setShowPinned((prev) => !prev);
    setSelectedRange("all");
  };
  const handlePinnedFolderClick = () => {
    setShowPinnedFolders((prev) => !prev);
    setSelectedFolderRange("all");
  };

  const filterNotes = (range, pinned, search) => {
    const now = new Date();
    let filteredNotes = Notes;

    if (pinned) {
      filteredNotes = filteredNotes.filter((note) => note?.isPinned);
    }
    if (search) {
      filteredNotes = filteredNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(search.toLowerCase()) ||
          note.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (range === "all") return filteredNotes;
    if (range === "today") {
      return filteredNotes.filter(
        (note) => new Date(note.createdAt).toDateString() === now.toDateString()
      );
    }
    if (range === "week") {
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      return filteredNotes.filter(
        (note) => new Date(note.createdAt) >= startOfWeek
      );
    }
    if (range === "month") {
      return filteredNotes.filter(
        (note) => new Date(note.createdAt).getMonth() === now.getMonth()
      );
    }
  };
  const filterFolders = (range, pinned, search) => {
    const now = new Date();
    let filteredFolders = Folders;

    if (pinned) {
      filteredFolders = filteredFolders.filter((folder) => folder.isPinned);
    }
    if (search) {
      filteredFolders = filteredFolders.filter((folder) =>
        folder.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (range === "all") return filteredFolders;
    if (range === "today") {
      return filteredFolders.filter(
        (folder) =>
          new Date(folder.createdAt).toDateString() === now.toDateString()
      );
    }
    if (range === "week") {
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      return filteredFolders.filter(
        (folder) => new Date(folder.createdAt) >= startOfWeek
      );
    }
    if (range === "month") {
      return filteredFolders.filter(
        (folder) => new Date(folder.createdAt).getMonth() === now.getMonth()
      );
    }
  };

  const filteredNotes = filterNotes(selectedRange, showPinned, searchTerm);
  const filteredFolders = filterFolders(
    selectedFolderRange,
    showPinnedFolders,
    searchTerm
  );

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  return (
    <div className="w-full">
      <HeaderComponent onSearch={handleSearch} />
      <div className="bg-home h-auto p-[15px] sm:p-[40px] rounded-3xl">
        <div className="my-heading ">
          <h1 className="text-4xl">My Notes</h1>
        </div>
        <div className="notes-range-selector flex mt-5 gap-[10px] sm:gap-[30px]">
          <button
            className={`text-[#CCCDCF] hover:text-black transition duration-500 ${
              showPinned ? "text-black" : ""
            }`}
            onClick={handlePinnedClick}
          >
            Pinned <FontAwesomeIcon icon={faThumbtack} />
          </button>
          <button
            className={`text-[#CCCDCF] hover:text-black transition duration-500 ${
              selectedRange === "today" ? "text-black" : ""
            }`}
            onClick={() => handleRangeClick("today")}
          >
            Today
          </button>
          <button
            className={`text-[#CCCDCF] hover:text-black transition duration-500 ${
              selectedRange === "week" ? "text-black" : ""
            }`}
            onClick={() => handleRangeClick("week")}
          >
            This Week
          </button>
          <button
            className={`text-[#CCCDCF] hover:text-black transition duration-500 ${
              selectedRange === "month" ? "text-black" : ""
            }`}
            onClick={() => handleRangeClick("month")}
          >
            This Month
          </button>
        </div>
        <div className="notes-container mt-5 flex gap-[15px] sm:gap-[25px] flex-wrap justify-center sm:justify-normal">
          {filteredNotes && filteredNotes.length > 0
            ? filteredNotes.map((note) => {
                return note.isPinned ? (
                  <PinnedNote
                    key={note._id}
                    note={note}
                    onUpdate={handleNoteUpdate}
                    onDelete={handleNoteDelete}
                  />
                ) : (
                  <NoteBody
                    key={note._id}
                    note={note}
                    onUpdate={handleNoteUpdate}
                    onDelete={handleNoteDelete}
                  />
                );
              })
            : "No Notes Available"}
          <AddNote onOpen={onOpen} />
        </div>
        <div className="my-heading mt-7">
          <h1 className="text-4xl">Recent Folders</h1>
        </div>
        <div className="notes-range-selector flex mt-5 gap-[30px]">
          <button
            className={`text-[#CCCDCF] hover:text-black transition duration-500 ${
              showPinnedFolders ? "text-black" : ""
            }`}
            onClick={handlePinnedFolderClick}
          >
            Pinned <FontAwesomeIcon icon={faThumbtack} />
          </button>
          <button
            className={`text-[#CCCDCF] hover:text-black transition duration-500 ${
              selectedFolderRange === "today" ? "text-black" : ""
            }`}
            onClick={() => handleFolderRangeClick("today")}
          >
            Today
          </button>
          <button
            className={`text-[#CCCDCF] hover:text-black transition duration-500 ${
              selectedFolderRange === "week" ? "text-black" : ""
            }`}
            onClick={() => handleFolderRangeClick("week")}
          >
            This Week
          </button>
          <button
            className={`text-[#CCCDCF] hover:text-black transition duration-500 ${
              selectedFolderRange === "month" ? "text-black" : ""
            }`}
            onClick={() => handleFolderRangeClick("month")}
          >
            This Month
          </button>
        </div>
        <div className="notes-container mt-5 flex gap-[15px] sm:gap-[25px] flex-wrap justify-center sm:justify-normal">
          {filteredFolders && filteredFolders.length > 0
            ? filteredFolders.map((folder) => {
                return folder.isPinned ? (
                  <PinnedFolder
                    key={folder._id}
                    folder={folder}
                    onUpdate={handleFolderUpdate}
                    onDelete={handleFolderDelete}
                  />
                ) : (
                  <FolderBody
                    key={folder._id}
                    folder={folder}
                    onUpdate={handleFolderUpdate}
                    onDelete={handleFolderDelete}
                  />
                );
              })
            : "No Folders Available"}
          <AddFolder onOpenFolder={onOpenFolder} />
        </div>
      </div>
    </div>
  );
};

export default MainBody;
