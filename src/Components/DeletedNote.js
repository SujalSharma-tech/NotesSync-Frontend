const DeletedNote = ({ note, onNoteRestore, onNoteDelete }) => {
  const dateformatter = (date) => {
    let dateObj = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateObj.toLocaleDateString("en-US", options);
  };

  const handleRestore = () => {
    onNoteRestore(note._id);
  };
  const handleDelete = () => {
    onNoteDelete(note._id);
  };
  return (
    <>
      <div className="note_body_pink shadow-10xl rounded-2xl relative cursor-pointer sm:w-auto sm:h-auto w-[150px] h-[180px]">
        <div className="sm:w-[260px] sm:h-[300px] bg-[#E5BBBC] rounded-2xl p-[10px] sm:p-[15px] break-words break-all w-full h-full dark:bg-[#b6a5cb66]">
          <div className="note_date text-[#9E6A69] text-sm dark:text-white">
            {dateformatter(note.createdAt)}
          </div>
          <div className="note_title flex justify-between items-center">
            <h1 className="text-xl my-2 text-nowrap overflow-hidden  overflow-ellipsis dark:text-white">
              {note.title}
            </h1>
            <div className="note_edit_button"></div>
          </div>
          <div className="note_content text-sm text-[#461F1E] dark:text-white">
            <p>{note.content}</p>
          </div>
          <div className="note_operations flex gap-[2px] sm:gap-4 absolute bottom-3 right-0 w-full justify-evenly items-center dark:text-white ">
            <button
              className="note_recover border-2 border-gray-400 rounded-lg px-[2px] sm:px-[25px] sm:py-[7px] dark:hover:text-black hover:bg-green-400 hover:text-white"
              onClick={handleRestore}
            >
              Recover
            </button>
            <button
              className="note_delete  border-2 border-gray-400 rounded-lg px-[2px] sm:px-[25px] sm:py-[7px] dark:hover:text-black hover:bg-red-400 hover:text-white"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletedNote;
