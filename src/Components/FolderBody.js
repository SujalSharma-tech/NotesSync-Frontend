import EditIcon from "../assets/edit.png";
import {
  faFolder,
  faEllipsis,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ onPin, folder, onDelete }) => {
  return (
    <div className="flex flex-col dropdown absolute top-5 w-[150px] right-0 bg-slate-500 rounded-lg px-[4px] py-[6px] text-white z-[1]">
      <ul className="flex flex-col gap-[5px]">
        <li className="hover:bg-slate-100 hover:text-black hover:rounded-lg p-1">
          <button
            className="text-start w-full"
            onClick={() => onPin(folder)}
          >{`${folder.isPinned ? "Unpin" : "Pin"}`}</button>
        </li>
        <li className="hover:bg-pink-400 hover:rounded-lg p-1">
          <button
            className="text-start w-full"
            onClick={() => onDelete(folder)}
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

const FolderBody = ({ folder, onUpdate, onDelete }) => {
  const dateformatter = (date) => {
    let dateObj = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateObj.toLocaleDateString("en-US", options);
  };
  const [isPinned, setIsPinned] = useState(folder.isPinned);

  const handlePin = async (folder) => {
    try {
      const { data } = await axios.patch(
        `https://noti-fy-backend.onrender.com/api/v1/folder/updatestatus/${folder._id}`,
        { isPinned: !isPinned },
        { withCredentials: true }
      );
      setIsPinned(data.folder.isPinned);
      onUpdate(data.folder);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (folder) => {
    try {
      const { data } = await axios.delete(
        `https://noti-fy-backend.onrender.com/api/v1/folder/deletefolder/${folder._id}`,
        { withCredentials: true }
      );
      onDelete(data);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
      <div className="folder_body_pink shadow-10xl my-4 rounded-2xl sm:w-[260px] sm:h-[140px] w-[150px] h-[180px]">
        <div className=" bg-[#E5BBBC] rounded-2xl p-[15px] sm:w-auto sm:h-auto w-full h-full">
          <div className="folder_title flex justify-between items-center">
            <FontAwesomeIcon
              icon={faFolder}
              size="3x"
              style={{ color: "#c0784f" }}
            />
            <div className="folder_edit_button relative">
              <button
                className="w-5 flex"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <FontAwesomeIcon icon={faEllipsis} size="1x" />
              </button>
              {showDropdown && (
                <Dropdown
                  onPin={handlePin}
                  onDelete={handleDelete}
                  folder={folder}
                />
              )}
            </div>
          </div>
          <Link to={`/folder/${folder.name}/${folder._id}`}>
            <h1 className="text-xl my-4">{folder.name}</h1>
            <div className="folder_date text-[#9E6A69] text-sm">
              {dateformatter(folder.createdAt)}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FolderBody;

export const AddFolder = ({ onOpenFolder }) => {
  return (
    <>
      <div className="flex  gap-6 justify-center">
        <button className="add_note">
          <div className="add_note_body w-[130px] h-[130px] rounded-xl flex justify-center items-center flex-col gap-3 border-2 border-dashed border-gray-400 hover:bg-slate-200 transition duration-500 ">
            <FontAwesomeIcon icon={faFolder} size="2x" />
            <h1 className="text-md text-center">View All</h1>
          </div>
        </button>
        <button className="add_folder" onClick={onOpenFolder}>
          <div className="add_folder_body w-[130px] h-[130px] rounded-xl flex justify-center items-center flex-col gap-3 border-2 border-dashed  border-gray-400 hover:bg-slate-200 transition duration-500 z-10">
            <FontAwesomeIcon icon={faPlus} size="2x" />
            <h1 className="text-md text-center">New Folder</h1>
          </div>
        </button>
      </div>
    </>
  );
};
