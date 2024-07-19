import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import FolderBody from "./FolderBody";

const withPinnedIcon = (WrappedComponent) => {
  return (props) => {
    return (
      <div className="pinned-folder-container relative">
        <div className="pinned-icon absolute top-5 right-3 z-[1]">
          <FontAwesomeIcon icon={faThumbtack} />
        </div>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

const PinnedFolderBody = withPinnedIcon(FolderBody);

const PinnedFolder = ({ folder, onUpdate, onDelete }) => {
  return (
    <PinnedFolderBody folder={folder} onDelete={onDelete} onUpdate={onUpdate} />
  );
};

export default PinnedFolder;
