import {
  faNoteSticky,
  faTrash,
  faThumbtack,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Archive, Edit, Pin, Trash2, BookHeart } from "lucide-react";
import { useState } from "react";

const NoteBody = ({ note, onUpdate, onDelete }) => {
  const dateformatter = (date) => {
    let dateObj = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateObj.toLocaleDateString("en-US", options);
  };

  const [isPinned, setIspinned] = useState(note.isPinned);
  const [isArchived, setIsArchived] = useState(note.isArchived);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteContent, setNoteContent] = useState(note.content);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [isPinning, setIsPinning] = useState(false);

  const togglePinned = async (e) => {
    e.stopPropagation();
    setIsPinning(true);
    const previousState = isPinned;
    setIspinned(!isPinned);
    try {
      const { data } = await axios.patch(
        `https://noti-fy-backend.onrender.com/api/v1/note/updatestatus/${note._id}`,
        { isPinned: !isPinned },
        {
          withCredentials: true,
        }
      );
      // setIspinned(data.note.isPinned);
      onUpdate(data.note);
    } catch (err) {
      console.log(err);
      setIspinned(previousState);
      setIsPinning(false);
    } finally {
      setIsPinning(false);
    }
  };

  const toggleArchived = async (e) => {
    e.stopPropagation();
    setIsArchiving(true);
    const previousState = isArchived;
    setIsArchived(!isArchived);
    try {
      const { data } = await axios.patch(
        `https://noti-fy-backend.onrender.com/api/v1/note/updatestatus/${note._id}`,
        { isArchived: !isArchived },
        {
          withCredentials: true,
        }
      );
      // setIsArchived(data.note.isArchived);
      onUpdate(data.note);
    } catch (err) {
      console.log(err);
      setIsArchived(previousState);
      setIsArchiving(false);
    } finally {
      setIsArchiving(false);
    }
  };

  const toggleDelete = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      const { data } = await axios.patch(
        `https://noti-fy-backend.onrender.com/api/v1/note/updatestatus/${note._id}`,
        { isTrashed: true },
        {
          withCredentials: true,
        }
      );
      onUpdate(data.note);
      onDelete(data.note);
    } catch (err) {
      console.log(err);
      setIsDeleting(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.put(
        `https://noti-fy-backend.onrender.com/api/v1/note/updatenote/${note._id}`,
        { title: noteTitle, content: noteContent },
        {
          withCredentials: true,
        }
      );
      onUpdate(data.note);
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className="note_body_pink shadow-10xl rounded-2xl relative cursor-pointer sm:w-auto sm:h-auto w-[150px] h-[180px]"
        onClick={openModal}
      >
        <div className="sm:w-[260px] sm:h-[300px] bg-[#E5BBBC] rounded-2xl p-[10px] sm:p-[15px] break-words break-all w-full h-full">
          <div className="note_date text-[#9E6A69] text-[12px] sm:text-sm">
            {dateformatter(note.createdAt)}
          </div>
          <div className="note_title flex justify-between items-center">
            <h1 className="text-xl my-2 text-nowrap overflow-hidden overflow-ellipsis">
              {note.title}
            </h1>
            <div className="note_edit_button"></div>
          </div>
          <div className="note_content text-sm text-[#461F1E]">
            <p>{note.content}</p>
          </div>
          <div className="note_operations flex gap-4 absolute bottom-3 right-3">
            <button
              className="note_pin_button note_action_button"
              onClick={togglePinned}
            >
              <div className="note_pin">
                <span className="tooltip">{`${
                  note.isPinned ? "Unpin" : "Pin"
                }`}</span>
                {isPinning ? (
                  ""
                ) : (
                  <Pin fill={`${note.isPinned ? "black" : "none"}`} />
                )}
              </div>
              {isPinning && <div className="loader"></div>}
            </button>
            <button
              className="note_delete_button note_action_button"
              onClick={toggleDelete}
            >
              <div className="note_delete">
                <span className="tooltip">Delete</span>
                {isDeleting ? "" : <Trash2 />}
              </div>
              {isDeleting && <div className="loader"></div>}
            </button>
            <button
              className="note_archive_button note_action_button"
              onClick={toggleArchived}
            >
              <div className="note_archive">
                <span className="tooltip">{`${
                  note.isArchived ? "Unarchive" : "Archive"
                }`}</span>
                {isArchiving ? (
                  ""
                ) : (
                  <BookHeart
                    fill={`${note.isArchived ? "cadetblue" : "none"}`}
                  />
                )}
              </div>
              {isArchiving && <div className="loader"></div>}
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] h-[90%] flex flex-col relative overflow-hidden">
            {!isEditing ? (
              <>
                <h2 className="text-2xl mb-4 whitespace-pre-line">
                  {noteTitle}
                </h2>
                <p className="mb-4 whitespace-pre-line h-[83%] overflow-y-scroll">
                  {noteContent}
                </p>
                <div className="flex justify-end absolute bottom-3 right-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Content
                  </label>
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="12"
                  />
                </div>
                <div className="flex justify-end absolute bottom-3 right-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NoteBody;

export const AddNote = ({ onOpen }) => {
  return (
    <>
      <div className="flex flex-col gap-2 justify-center">
        <button className="add_note">
          <div className="add_note_body w-[250px] h-[140px] rounded-xl flex justify-center items-center flex-col gap-3 border-2 border-dashed border-gray-400 hover:bg-slate-200 transition duration-500">
            <FontAwesomeIcon icon={faNoteSticky} size="2x" />
            <h1 className="text-md text-center">View All</h1>
          </div>
        </button>
        <button className="add_note" onClick={onOpen}>
          <div className="add_note_body w-[250px] h-[140px] rounded-xl flex justify-center items-center flex-col gap-3 border-2 border-dashed border-gray-400 hover:bg-slate-200 transition duration-500">
            <div className="w-7 flex">
              {/* <img src={EditIcon} /> */}
              <Edit />
            </div>
            <h1 className="text-md text-center">New Note</h1>
          </div>
        </button>
      </div>
    </>
  );
};
