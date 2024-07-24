import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import NoteBody from "./NoteBody";

const withPinnedIcon = (WrappedComponent) => {
  return (props) => {
    return (
      <div className="pinned-note-container relative">
        <div className="pinned-icon absolute top-3 right-3 z-[1]">
          <FontAwesomeIcon icon={faThumbtack} />
        </div>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

const PinnedNoteBody = withPinnedIcon(NoteBody);

const PinnedNote = ({ note, onUpdate, onDelete, allowedEdit }) => {
  return (
    <PinnedNoteBody
      note={note}
      onUpdate={onUpdate}
      onDelete={onDelete}
      allowedEdit={allowedEdit}
    />
  );
};

export default PinnedNote;
