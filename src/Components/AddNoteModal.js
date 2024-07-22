import { X } from "lucide-react";
import { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../index";
import toast from "react-hot-toast";
const AddNoteModal = ({ onClose, id, onNoteAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { setNotes } = useContext(Context);

  const addnewNote = async () => {
    const newNote = { title, content };
    try {
      const { data } = await axios.post(
        "https://noti-fy-backend.onrender.com/api/v1/note/addnote",
        newNote,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      toast.success("Note Added!");
      setNotes((prevNote) => [data.note, ...prevNote]);
      if (id) {
        const resp = await axios.post(
          `https://noti-fy-backend.onrender.com/api/v1/note/addtofolder/${id}`,
          { noteId: data.note._id },
          {
            withCredentials: true,
          }
        );
        const noteData = { ...data.note };
        const folderId = { folder: id };
        onNoteAdded({ ...noteData, ...folderId });
      }
      onClose();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center shadow-10xl z-10 ">
      <div className="mt-10 flex gap-3 flex-col bg-white w-[700px] h-auto rounded-3xl px-[20px] py-[28px] mx-0 my-[20px] shadow-10xl relative dark:bg-[#1B1C20]">
        <button
          className=" absolute top-[10px] right-[10px] dark:text-white"
          onClick={onClose}
        >
          <X />
        </button>
        <h1 className="place-self-center text-2xl dark:text-white">New Note</h1>

        <div className="add-note-container bg-white rounded-xl flex flex-col gap-6 dark:bg-[#1B1C20]">
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            className="border-4 px-[10px] py-[12px] rounded-xl outline-none dark:bg-[#16171A] dark:text-white dark:border-2 dark:border-[#2b2d30]"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            name="content"
            placeholder="Enter Note description"
            rows={8}
            className="border-4 px-[10px] py-[12px] rounded-xl outline-none dark:bg-[#16171A] dark:text-white dark:border-2 dark:border-[#2b2d30]"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <button
            className="outline-none border-2 bg-[#6cb4dd] px-[10px] py-[12px] rounded-xl dark:border-[#2b2d30]"
            onClick={addnewNote}
          >
            Add Note +
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
