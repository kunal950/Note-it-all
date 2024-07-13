import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import TagInput from "../../components/Input/TagInput";
import instance from "../../utils/axios.intance";
const AddEditNote = ({
  noteData,
  type,
  onClose,
  getNotes,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  //add and edit note functions
  const addNewNote = async () => {
    try {
      const response = await instance.post("/api/note/add-note", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note added successfully", "add");
        getNotes();
        onClose();
      }
    } catch (error) {
      console.log("An error occurred while adding note");
    }
  };
  const editNote = async () => {
    try {
      const response = await instance.put(
        `/api/note/edit-note/${noteData._id}`,
        {
          title,
          content,
          tags,
        }
      );
      if (response.data && response.data.note) {
        showToastMessage("Note Updated successfully", "add");
        getNotes();
        onClose();
      }
    } catch (error) {
      console.log("An error occurred while editing note");
    }
  };

  const handleAddNote = () => {
    if (title.trim() === "" || content.trim() === "") {
      setError("Please fill all the fields");
      return;
    }
    setError("");
    if (type === "add") {
      addNewNote();
    } else {
      editNote();
    }
  };
  return (
    <div className="w-full relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-100"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="input-label">
          TITLE
        </label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="TITLE"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="" className="input-label">
          CONTENT
        </label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rouded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="mt-3">
        <label htmlFor="" className="input-label">
          TAGS
        </label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "add" ? "ADD NOTE" : "EDIT NOTE"}
      </button>
    </div>
  );
};

export default AddEditNote;
