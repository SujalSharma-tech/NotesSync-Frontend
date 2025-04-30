import { DeleteIcon, User, X } from "lucide-react";
import { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../index";
import toast from "react-hot-toast";

const SharewithModal = ({ onClose, note, onUpdate }) => {
  const [email, setEmail] = useState("");
  const { user, Notes, setNotes, setSharedNotes, sharedNotes } =
    useContext(Context);
  const [SearchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const { data } = await axios.get(
        `https://noti-fy-backend.onrender.com/api/v1/note/searchuser?email=${email}`,
        { withCredentials: true }
      );
      setSearchResults([data.user]);
      setIsSearching(false);
      toast.success("User Found!");
    } catch (err) {
      console.log(err);
      setSearchResults([]);
      setIsSearching(false);
      toast.error(err?.response.data.message);
    }
  };
  const handleShare = async (user, remove = false) => {
    setIsSharing(true);
    let removeUser = remove;
    if (note.isShared) {
      user._id = user.userId;
    }
    note.isShared = true;
    if (remove && note.sharedWith.length == 1) {
      note.isShared = false;
    }

    try {
      const { data } = await axios.post(
        "https://noti-fy-backend.onrender.com/api/v1/note/sharenote",
        {
          noteId: note._id,
          userId: user._id,
          email: user.email,
          isShared: note.isShared,
          removeUser: removeUser,
        },
        { withCredentials: true }
      );
      const updatedNotes = sharedNotes.map((note) =>
        note._id === data.note._id ? data.note : note
      );
      onUpdate(data.note);

      setSharedNotes((prev) =>
        prev.filter((curr) => {
          if (curr._id != data.note._id) return curr;
        })
      );

      setIsSharing(false);
      if (!removeUser) {
        toast.success("Note Shared!");
      } else {
        toast.success("User Removed");
        onClose();
      }
      setSearchResults([]);
    } catch (err) {
      console.log(err);
      setIsSharing(false);
      toast.error(err?.response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center shadow-10xl z-10">
      <div className="mt-10 flex gap-3 flex-col bg-white w-[700px] h-auto rounded-3xl sm:px-[20px] px-[0px] py-[28px] mx-0 my-[20px] shadow-10xl relative dark:bg-[#1B1C20]">
        <button
          className=" absolute top-[10px] right-[10px] dark:text-white"
          onClick={onClose}
        >
          <X />
        </button>
        {user.email === note.owner ? (
          <h1 className="place-self-center text-2xl dark:text-white">
            Search User to Share Note
          </h1>
        ) : (
          ""
        )}
        <div className="add-folder-container bg-white rounded-xl flex flex-col gap-6 dark:bg-[#1B1C20]">
          {user.email === note.owner ? (
            <div className="border-4 rounded-xl outline-none dark:bg-[#16171A] dark:text-white dark:border-2 dark:border-[#2b2d30] flex justify-between">
              <input
                type="email"
                name="email"
                placeholder="Enter User's Email"
                className="px-[10px] py-[12px] w-[80%] rounded-xl outline-none dark:bg-[#16171A] dark:text-white "
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <button
                className="outline-none border-2 bg-pink-400 px-[10px] py-[12px] rounded-xl dark:border-[#2b2d30] text-white "
                onClick={handleSearch}
              >
                <span className={isSearching ? "hidden" : ""}>Search</span>
                {isSearching && <div className="loader"></div>}
              </button>
            </div>
          ) : (
            ""
          )}
          {SearchResults.length > 0 ? (
            <div className="border-2  rounded-xl dark:border-border[#2b2d30] dark:text-white flex justify-between items-center pl-[10px]">
              <h1 className="text-xl dark:text-white flex w-[65%]">
                <User />
                <p className="w-[80%] overflow-hidden text-ellipsis">
                  {SearchResults[0].email}
                </p>
              </h1>
              <button
                className="sm:text-xl text-sm bg-[#6cb4dd] outline-none border-2  px-[10px] py-[12px] rounded-xl dark:border-[#2b2d30] text-white"
                onClick={() => handleShare(SearchResults[0], false)}
              >
                <span className={isSharing ? "hidden" : ""}>Share Note</span>
                {isSharing && <div className="loader"></div>}
              </button>
            </div>
          ) : (
            ""
          )}

          <h1 className=" place-self-center text-2xl dark:text-white">
            Users List
          </h1>
          <div className="users-list flex flex-col gap-2">
            <div className="border-2 px-[10px] py-[12px] rounded-xl dark:border-border[#2b2d30] dark:text-white flex justify-between">
              <h1 className="text-xl dark:text-white flex gap-2">
                <User />
                <p className="w-[80%] sm:w-auto text-ellipsis overflow-hidden">
                  {note.owner}
                </p>
              </h1>
              <span className="text-xl dark:text-white">Owner</span>
            </div>
            {SearchResults && note.isShared
              ? note.sharedWith.map((noteUser) => {
                  return (
                    <div
                      className="border-2 px-[10px] py-[12px] rounded-xl dark:border-border[#2b2d30] dark:text-white flex justify-between"
                      key={noteUser._id}
                    >
                      <div className="flex">
                        <h1 className="text-xl dark:text-white flex gap-2 items-center">
                          <User />
                          <p className="w-[80%] sm:w-auto text-ellipsis overflow-hidden">
                            {noteUser.email}
                          </p>
                        </h1>
                        {noteUser.email === user.email ||
                        note.owner === user.email ? (
                          <button onClick={() => handleShare(noteUser, true)}>
                            <X color="red" />
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                      <span className="text-xl dark:text-white">
                        {noteUser.email === user.email ? "Me" : "User"}
                      </span>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharewithModal;
