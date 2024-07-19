import { X } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../index";
import NoteBody from "./NoteBody";
import { useParams } from "react-router-dom";
const SelectArchiveModal = ({ onClose, handleDropDown }) => {
  const [filteredNotes, setFilteredNotes] = useState([]);
  const { setNotes, Notes } = useContext(Context);
  const [Toadd, setToadd] = useState("");
  console.log(Toadd);
  const addToArchive = async (noteId) => {
    console.log(noteId);
    try {
      const { data } = await axios.patch(
        `https://noti-fy-backend.onrender.com/api/v1/note/updatestatus/${noteId}`,
        { isArchived: true },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      onClose();
      setNotes((prev) =>
        prev.map((note) => {
          if (note._id === noteId) {
            return { ...note, isArchived: true };
          } else {
            return note;
          }
        })
      );
      handleDropDown();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const notess = Notes.filter((note) => {
      if (!note?.isArchived) {
        return note;
      }
    });
    if (notess) {
      setFilteredNotes(notess);
    }
  }, [Notes]);

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center shadow-10xl z-10">
      <div className="mt-10 flex gap-3 flex-col bg-white w-[700px] h-[600px] rounded-3xl px-[20px] py-[28px] mx-0 my-[20px] shadow-10xl relative">
        <button className=" absolute top-[10px] right-[10px]" onClick={onClose}>
          <X />
        </button>
        <h1 className="place-self-center text-2xl">Select Note to add</h1>

        <div className="add-note-container bg-white rounded-xl flex flex-col gap-6 h-full overflow-hidden ">
          <div className="note_container flex flex-row flex-wrap gap-5 justify-center overflow-x-hidden h-full">
            {filteredNotes.map((note) => {
              return (
                <button onClick={() => addToArchive(note._id)}>
                  <NoteBody note={note} key={note._id} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectArchiveModal;
