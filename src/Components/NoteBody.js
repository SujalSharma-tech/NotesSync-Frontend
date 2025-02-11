import {
  faNoteSticky,
  faTrash,
  faThumbtack,
  faBook,
  faShareAlt,
  faShareAltSquare,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Archive, Edit, Pin, Trash2, BookHeart, Share2 } from "lucide-react";
import { useContext, useState } from "react";
import { Context } from "../index.js";
import toast from "react-hot-toast";
import SharewithModal from "./SharewithModal.js";

const NoteBody = ({ note, onUpdate, onDelete, hideContent, allowedEdit }) => {
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
  const [AddShare, setAddShare] = useState(false);
  const { mode } = useContext(Context);

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
      onUpdate(data.note);
      toast.success(`${data.note.isPinned ? "Note Pinned!" : "Note Unpinned"}`);
    } catch (err) {
      console.log(err);
      setIspinned(previousState);
      setIsPinning(false);
      toast.error("Something went wrong! Please try again later.");
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
      onUpdate(data.note);
      toast.success(
        `${data.note.isArchived ? "Note Archived!" : "Note Unarchived"}`
      );
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
      toast.success("Note Added to Trash!");
      onDelete(data.note);
    } catch (err) {
      console.log(err);
      setIsDeleting(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const openModal = () => {
    if (!hideContent) setIsModalOpen(true);
  };
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
      toast.success(data.message);
      closeModal();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    setAddShare(true);
  };
  return (
    <>
      <div
        className="note_body_pink shadow-10xl rounded-2xl relative cursor-pointer sm:w-auto sm:h-auto w-[150px] h-[180px]"
        onClick={openModal}
      >
        <div className="sm:w-[260px] sm:h-[300px] bg-[#E5BBBC] rounded-2xl p-[10px] sm:p-[15px] break-words break-all w-full h-full dark:bg-[#b6a5cb66]">
          <div className="note_date text-[#9E6A69] text-[12px] sm:text-sm dark:text-white">
            {dateformatter(note.createdAt)}
          </div>
          <div className="note_title flex justify-between items-center">
            <h1 className="text-xl my-2 text-nowrap overflow-hidden overflow-ellipsis dark:text-white">
              {note.title}
            </h1>
            <div className="note_edit_button"></div>
          </div>
          <div className="note_content text-sm text-[#461F1E] dark:text-white">
            <p>{note.content}</p>
          </div>
          {allowedEdit ? (
            <div className="note_operations flex gap-3 sm:gap-4 absolute bottom-3 right-3">
              <button
                className="note_share_button note_action_button"
                onClick={handleShare}
              >
                <div className="note_share dark:text-white">
                  <span className="tooltip">Share</span>
                  {<Share2 fill={note.isShared ? "black" : "none"} />}
                </div>
                {isDeleting && <div className="loader"></div>}
              </button>
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
                    <Pin
                      fill={`${
                        note.isPinned
                          ? mode == "light"
                            ? "black"
                            : "white"
                          : "none"
                      }`}
                      color={`${mode == "dark" ? "white" : "black"}`}
                    />
                  )}
                </div>
                {isPinning && <div className="loader"></div>}
              </button>
              <button
                className="note_delete_button note_action_button"
                onClick={toggleDelete}
              >
                <div className="note_delete dark:text-white">
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
                      color={`${
                        note.isArchived || mode == "light" ? "black" : "white"
                      }`}
                    />
                  )}
                </div>
                {isArchiving && <div className="loader"></div>}
              </button>
            </div>
          ) : (
            <div className="note_operations flex gap-3 sm:gap-4 absolute bottom-3 right-3">
              <button
                className="note_share_button note_action_button"
                onClick={handleShare}
              >
                <div className="note_share dark:text-white">
                  <span className="tooltip">Share</span>
                  {isDeleting ? (
                    ""
                  ) : (
                    <FontAwesomeIcon icon={faShareAlt} size="lg" />
                  )}
                </div>
                {isDeleting && <div className="loader"></div>}
              </button>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] h-[90%] flex flex-col relative overflow-hidden dark:bg-[#686273] dark:text-white">
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
                <div className="mb-4 ">
                  <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-transparent dark:border-[#898989]"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white">
                    Content
                  </label>
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white dark:bg-transparent dark:border-[#898989]"
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
      {AddShare && (
        <SharewithModal
          onClose={() => setAddShare(false)}
          note={note}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default NoteBody;

export const AddNote = ({ onOpen }) => {
  return (
    <>
      <div className="flex flex-col gap-2 justify-center">
        {/* <button className="add_note">
          <div className="add_note_body w-[250px] h-[140px] rounded-xl flex justify-center items-center flex-col gap-3 border-2 border-dashed border-gray-400 hover:bg-slate-200 transition duration-500 dark:text-white dark:hover:text-black">
            <FontAwesomeIcon icon={faNoteSticky} size="2x" />
            <h1 className="text-md text-center">View All</h1>
          </div>
        </button> */}
        <button className="add_note" onClick={onOpen}>
          <div className="add_note_body h-[180px] w-[150px] sm:w-[250px] sm:h-[140px] rounded-xl flex justify-center items-center flex-col gap-3 border-2 border-dashed border-gray-400 hover:bg-slate-200 transition duration-500 dark:text-white dark:hover:text-black ">
            <div className="w-7 flex">
              <Edit />
            </div>
            <h1 className="text-md text-center">New Note</h1>
          </div>
        </button>
      </div>
    </>
  );
};
