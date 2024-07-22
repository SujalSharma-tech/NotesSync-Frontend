import { X } from "lucide-react";
import { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../index";
import toast from "react-hot-toast";

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
      toast.success("Folder Added!");
      setFolders((prevFolder) => [data.folder, ...prevFolder]);
      onClose();
    } catch (err) {
      console.log(err);
      toast.error(err?.response.data.message);
    }
  };
  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center shadow-10xl z-10">
      <div className="mt-10 flex gap-3 flex-col bg-white w-[700px] h-auto rounded-3xl px-[20px] py-[28px] mx-0 my-[20px] shadow-10xl relative dark:bg-[#1B1C20]">
        <button
          className=" absolute top-[10px] right-[10px] dark:text-white"
          onClick={onClose}
        >
          <X />
        </button>
        <h1 className="place-self-center text-2xl dark:text-white">
          New Folder
        </h1>
        <div className="add-folder-container bg-white rounded-xl flex flex-col gap-6 dark:bg-[#1B1C20]">
          <input
            type="text"
            name="title"
            placeholder="Enter name"
            className="border-4 px-[10px] py-[12px] rounded-xl outline-none dark:bg-[#16171A] dark:text-white dark:border-2 dark:border-[#2b2d30]"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button
            className="outline-none border-2 bg-[#6cb4dd] px-[10px] py-[12px] rounded-xl dark:border-[#2b2d30]"
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
