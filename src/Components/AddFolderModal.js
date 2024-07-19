import { X } from "lucide-react";
import { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../index";

const AddFolderModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const { setFolders } = useContext(Context);

  const addNewFolder = async () => {
    const newFolder = { name };
    try {
      const { data } = await axios.post(
        "https://noti-fy-backend.onrender.com/api/v1/folder/newfolder",
        newFolder,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setFolders((prevFolder) => [data.folder, ...prevFolder]);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center shadow-10xl z-10">
      <div className="mt-10 flex gap-3 flex-col bg-white w-[700px] h-auto rounded-3xl px-[20px] py-[28px] mx-0 my-[20px] shadow-10xl relative">
        <button className=" absolute top-[10px] right-[10px]" onClick={onClose}>
          <X />
        </button>
        <h1 className="place-self-center text-2xl">New Folder</h1>
        <div className="add-folder-container bg-white rounded-xl flex flex-col gap-6">
          <input
            type="text"
            name="title"
            placeholder="Enter name"
            className="border-4 px-[10px] py-[12px] rounded-xl outline-none"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button
            className="outline-none border-2 bg-[#6cb4dd] px-[10px] py-[12px] rounded-xl"
            onClick={addNewFolder}
          >
            Add Folder +
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFolderModal;
