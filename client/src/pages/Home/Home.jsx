import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import moment from "moment";
import Toast from "../../components/ToastMessage/Toast";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import AddEditNote from "./AddEditNote";
import instance from "../../utils/axios.intance";
import EmptyCard from "../../components/Cards/EmptyCard";
const Home = () => {
  const Navigate = useNavigate();
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [showMesg, setShowMesg] = useState({
    isshown: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState(null);

  //edit handle
  const handleEdit = (noteDetail) => {
    setOpenAddEditModal({
      isShown: true,
      type: "edit",
      data: noteDetail,
    });
  };
  //user info
  const getProfile = async () => {
    try {
      const response = await instance.get("/api/auth/user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        Navigate("/login");
      }
    }
  };

  //get all notes
  const getNotes = async () => {
    try {
      const response = await instance.get("/api/note/get-all-note");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An error occurred while fetching notes");
    }
  };

  //delete note
  const deleteNote = async (noteId) => {
    try {
      const response = await instance.delete(`/api/note/delete-note/${noteId}`);
      if (response.data && !response.data.error) {
        showToastMessage("Note deleted successfully", "delete");
        getNotes();
      }
    } catch (error) {
      console.log("An error occurred while deleting note");
    }
  };

  const showToastMessage = (message, type) => {
    setShowMesg({ isshown: true, message: message, type: type });
  };
  const handleCloseToast = () => {
    setShowMesg({ isshown: false, message: "" });
  };
  useEffect(() => {
    getNotes();
    getProfile();
    return () => {};
  }, []);
  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto">
        {allNotes?.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {allNotes && allNotes.length > 0 ? (
              allNotes.map((item, index) => (
                <NoteCard
                  key={item._id}
                  title={item.title}
                  date={moment(item.createdAt).format("DD MMM, YYYY")}
                  content={item.content}
                  tags={item.tags}
                  isPinned={item.ispinned}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => deleteNote(item._id)}
                  onPinNote={() => {}}
                />
              ))
            ) : (
              <p className="text-center text-lg">No notes found</p>
            )}
          </div>
        ) : (
          <EmptyCard />
        )}
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-blue-600 right-10 bottom-10 fixed"
        onClick={() => {
          setOpenAddEditModal({ ...openAddEditModal, isShown: true });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        ariaHideApp={false}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ ...openAddEditModal, isShown: false });
          }}
          getNotes={getNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast
        isShown={showMesg.isshown}
        message={showMesg.message}
        type={showMesg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
