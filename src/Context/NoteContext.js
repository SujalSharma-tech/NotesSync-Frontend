import EditIcon from "../assets/edit.png";
import {
  faNoteSticky,
  faTrash,
  faThumbtack,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Archive, Edit, LucideArchive, Pin, Trash2 } from "lucide-react";
import { useState } from "react";

const NoteBody = ({ note, onUpdate, onDelete }) => {
  const dateformatter = (date) => {
    let dateObj = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateObj.toLocaleDateString("en-US", options);
  };

  const [isPinned, setIspinned] = useState(note.isPinned);
  const [isArchived, setIsArchived] = useState(note.isArchived);

  const togglePinned = async () => {
    try {
      const { data } = await axios.patch(
        `https://noti-fy-backend.onrender.com/api/v1/note/updatestatus/${note._id}`,
        { isPinned: !isPinned },
        {
          withCredentials: true,
        }
      );
      setIspinned(data.note.isPinned);
      onUpdate(data.note);
    } catch (err) {
      console.log(err);
    }
  };
  const toggleArchived = async () => {
    try {
      const { data } = await axios.patch(
        `https://noti-fy-backend.onrender.com/api/v1/note/updatestatus/${note._id}`,
        { isArchived: !isArchived },
        {
          withCredentials: true,
        }
      );
      setIsArchived(data.note.isArchived);
      onUpdate(data.note);
    } catch (err) {
      console.log(err);
    }
  };
  const toggleDelete = async () => {
    try {
      const { data } = await axios.patch(
        `https://noti-fy-backend.onrender.com/api/v1/note/updatestatus/${note._id}`,
        { isTrashed: true },
        {
          withCredentials: true,
        }
      );
      setIspinned(data.note.isTrashed);
      onUpdate(data.note);
      onDelete(data.note);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="note_body_pink shadow-10xl rounded-2xl  relative">
        <div className="w-[260px] h-[300px] bg-[#E5BBBC] rounded-2xl p-[15px] break-words break-all ">
          <div className="note_date text-[#9E6A69] text-sm">
            {dateformatter(note.createdAt)}
          </div>
          <div className="note_title flex justify-between items-center">
            <h1 className="text-xl my-2 text-nowrap overflow-hidden  overflow-ellipsis">
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

                <Pin fill={`${note.isPinned ? "black" : "none"}`} />
              </div>
            </button>
            <button
              className="note_delete_button note_action_button"
              onClick={toggleDelete}
            >
              <div className="note_delete">
                <span className="tooltip">Delete</span>
                <Trash2 />
              </div>
            </button>
            <button
              className="note_archive_button note_action_button"
              onClick={toggleArchived}
            >
              <div className="note_archive">
                <span className="tooltip">{`${
                  note.isArchived ? "Unarchive" : "Archive"
                }`}</span>

                <Archive fill={`${note.isArchived ? "cadetblue" : "none"}`} />
              </div>
            </button>
            <button className="note_edit_button note_action_button">
              <span className="tooltip">Edit</span>
              <Edit />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteBody;

export const AddNote = ({ onOpen }) => {
  return (
    <>
      <div className="flex flex-col gap-2 justify-center">
        <button className="add_note">
          <div className="add_note_body w-[250px] h-[140px] rounded-xl flex justify-center items-center flex-col gap-3 border-2 border-dashed border-gray-400 hover:bg-slate-200 transition duration-500 ">
            <FontAwesomeIcon icon={faNoteSticky} size="2x" />
            <h1 className="text-md text-center">View All</h1>
          </div>
        </button>
        <button className="add_note" onClick={onOpen}>
          <div className="add_note_body w-[250px] h-[140px] rounded-xl flex justify-center items-center flex-col gap-3 border-2 border-dashed border-gray-400 hover:bg-slate-200 transition duration-500 ">
            <div className="w-7 flex">
              <img src={EditIcon} />
            </div>
            <h1 className="text-md text-center">New Note</h1>
          </div>
        </button>
      </div>
    </>
  );
};
