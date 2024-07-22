import { X } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../index";
import NoteBody from "./NoteBody";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
const SelectNotemodal = ({ onClose }) => {
  const [filteredNotes, setFilteredNotes] = useState([]);
  const { setNotes, Notes } = useContext(Context);
  const [Toadd, setToadd] = useState("");
  const { id } = useParams();
  console.log(Toadd);
  const addToFolder = async (noteId) => {
    console.log(noteId);
    try {
      const { data } = await axios.post(
        `https://noti-fy-backend.onrender.com/api/v1/note/addtofolder/${id}`,
        { noteId: noteId },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      toast.success("Note Added to Folder!");
      onClose();
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === noteId ? { ...note, folder: id } : note
        )
      );
    } catch (err) {
      console.log(err);
      toast.error(err?.response.data.message);
    }
  };

  useEffect(() => {
    const notess = Notes.filter((note) => {
      if (!note?.folder) {
        return note;
      }
    });
    if (notess) {
      setFilteredNotes(notess);
    }
  }, [Notes]);

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center shadow-10xl z-10">
      <div className="mt-10 flex gap-3 flex-col bg-white w-[700px] h-[600px] rounded-3xl px-[20px] py-[28px] mx-0 my-[20px] shadow-10xl relative dark:bg-[#1B1C20]">
        <button
          className=" absolute top-[10px] right-[10px] dark:text-white"
          onClick={onClose}
        >
          <X />
        </button>
        <h1 className="place-self-center text-2xl dark:text-white">
          Select Note to add
        </h1>

        <div className="add-note-container bg-white rounded-xl flex flex-col gap-6 h-full overflow-hidden dark:bg-[#1B1C20]">
          <div className="note_container flex flex-row flex-wrap gap-5 justify-center overflow-x-hidden h-full ">
            {filteredNotes && filteredNotes.length > 0 ? (
              filteredNotes.map((note) => {
                return (
                  <button
                    className="text-start"
                    onClick={() => addToFolder(note._id)}
                  >
                    <NoteBody note={note} key={note._id} hideContent={true} />
                  </button>
                );
              })
            ) : (
              <h1 className="dark:text-white">No Notes Available</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectNotemodal;
