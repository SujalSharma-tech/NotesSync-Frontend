import MainBody from "../Components/MainBody";
import SideBarComponent, { SidebarItem } from "../Components/SideBarComponent";
import { Link } from "react-router-dom";
import {
  faTrash,
  faNotesMedical,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddNoteModal from "../Components/AddNoteModal";
import { useState } from "react";
import { AddFolder } from "../Components/FolderBody";
import AddFolderModal from "../Components/AddFolderModal";
const Home = () => {
  const [AddNote, setAddNote] = useState(false);
  const [AddFolder, setAddFolder] = useState(false);
  return (
    <div className="flex">
      <SideBarComponent>
        <Link to={"/"}>
          <SidebarItem
            icon={<FontAwesomeIcon icon={faNotesMedical} />}
            text="Home"
          />
        </Link>
        <Link to={"/archieve"}>
          <SidebarItem
            icon={<FontAwesomeIcon icon={faBook} />}
            text="Archieve"
          />
        </Link>
        <Link to={"/trash"}>
          <SidebarItem icon={<FontAwesomeIcon icon={faTrash} />} text="Trash" />
        </Link>
      </SideBarComponent>
      <MainBody
        onOpen={() => setAddNote(true)}
        onOpenFolder={() => setAddFolder(true)}
      />
      {AddNote && <AddNoteModal onClose={() => setAddNote(false)} />}
      {AddFolder && <AddFolderModal onClose={() => setAddFolder(false)} />}
    </div>
  );
};

export default Home;
