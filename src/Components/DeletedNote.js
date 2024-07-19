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
          <div className="note_operations flex gap-4 absolute bottom-3 right-0 w-full justify-evenly items-center ">
            <button
              className="note_recover border-2 border-gray-400 rounded-lg px-[25px] py-[7px]"
              onClick={handleRestore}
            >
              Recover
            </button>
            <button
              className="note_delete  border-2 border-gray-400 rounded-lg px-[25px] py-[7px]"
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
