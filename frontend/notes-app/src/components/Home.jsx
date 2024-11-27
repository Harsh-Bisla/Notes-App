import React, { useEffect, useState } from 'react';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import Modal from './Modal';
import { VscPinned } from "react-icons/vsc";
import { useNavigate, useOutletContext } from 'react-router-dom';
import Header from "../components/Header";
import NoteImage from "../assets/note-img.png"


function Home() {
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false);
  const [notes, setNotes] = useState([]);
  const baseUrl = "http://localhost:3000/api";
  const [isPinned, setIsPinned] = useState(null);
  const [pinnedNoteId, setPinnedNoteId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updtingId, setUpdatingId] = useState("");
  const [usename, setUserName] = useState("");
  const { alert } = useOutletContext();
  const [tag, setTag] = useState("")
  const [tagArr, setTagArr] = useState([]);
  const [tagName, setTagName] = useState({});

  const handleCloseModel = () => {
    setShowModel(false);
  }

  function getNotes() {
    fetch(`${baseUrl}/notes`, {
      credentials: "include"
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.success == false) {
            navigate("/login")
          }
          setUserName(data.user.name)
          setNotes(data.notes);
        })
      })
  }


  const handlePinned = (id) => {
    const newPinnedState = pinnedNoteId === id ? false : true;
    setIsPinned(newPinnedState);
    setPinnedNoteId(newPinnedState ? id : null);
    console.log(newPinnedState)
    fetch(`${baseUrl}/updatePinned/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ isPinned: newPinnedState }),
    })
      .then((res) => res.json())
      .then((data) => {
       getNotes();
      })
      .catch((err) => {
        console.error("Error updating pinned state:", err);
      });
  };


  const handleDeleteNote = (id) => {
    fetch(`${baseUrl}/deletenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "appliccation/json"
      },
      credentials: "include"
    })
      .then((res) => {
        res.json().then((data) => {
          alert(data.msg);
          getNotes();
        })
      })
      .catch((err) => console.log(err))
  }

  const handleAddtag = () => {
    let newtagArr = [...tagArr, tag];
    setTagArr(newtagArr);
    alert("tag added successfully");
    setTag("");
  }



  const handleAddNote = () => {
    const noteDetails = {
      title: title,
      content: content,
      tag: tagArr
    }
    fetch(`${baseUrl}/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(noteDetails)
    })
      .then((res) => {
        res.json().then((data) => {
          alert(data.msg);
          if (data.success) {
            setShowModel(false);
            getNotes();
            setContent("")
            setTitle("");
            setTag("")
            setTagArr([])
          }
        })
      })
  }


  const handleEditNote = (id) => {
    setShowModel(true);
    setIsUpdating(true);
    const Note = notes.find((note) => note._id === id);
    setTitle(Note.title);
    setContent(Note.content);
    setTagName({ note: Note.tags, id: Note._id })
    setUpdatingId(id);
  }


  const handleUpdateNote = () => {
    fetch(`${baseUrl}/updatenote/${updtingId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ title, content, tag: tagArr })
    })
      .then((res) => {
        res.json().then((data) => {
          alert(data.msg);
          setShowModel(false);
          setTag("")
          setTagArr([])
          getNotes();
        })
      })
  }

  const handleLogoutUser = () => {
    fetch(`${baseUrl}/logout`, {
      credentials: "include"
    })
      .then((res) => {
        res.json().then((data) => {
          alert(data.msg);
          navigate("/login");
        })
      })
  }

  const handleDeleteTag = (tagName, id) => {
    console.log(tagName, id)
    if (tagName && id) {
      fetch(`${baseUrl}/deletetag/${tagName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ id })
      })
        .then((res) => {
          res.json().then((data) => {
            alert(data.msg)
            getNotes();
          })
        })
    }
  }

  useEffect(() => {
    getNotes();
  }, [])


  return (
    <>
      <Header usename={usename} handleLogoutUser={handleLogoutUser} />
      {notes.length == 0 && <div id='note-img'>
        <img src={NoteImage} alt="notes-image" />
      </div>}
      <section className='card-section'>
        {[...notes].sort((a, b) => b.isPinned - a.isPinned).map((note) => {
          return (
            <div key={note._id} className='card'>
              <VscPinned
                onClick={() => handlePinned(note._id)}
                style={{ color: note.isPinned ? "#0195ff" : "grey" }}
                id="pinned"
                size={20}
              />
              <h3>{note.title}</h3>
              <p>{new Date(note.date).toLocaleDateString()}</p>
              <p>{note.content}</p>
              <div className='delete-edit-box'>
                <div className='tag-box'>
                  {note.tags.slice(0, 3).map((tagName, idx) => <p key={idx}>#{tagName}</p>)}
                </div>
                <div className='btns'>
                  <MdEdit onClick={() => handleEditNote(note._id)} size={18} />
                  <MdDelete onClick={() => handleDeleteNote(note._id)} size={18} />
                </div>
              </div>
            </div>
          )
        })}

        {showModel && <Modal handleAddNote={handleAddNote} handleCloseModel={handleCloseModel} title={title} setTitle={setTitle} content={content} setContent={setContent} notes={notes} setNotes={setNotes} isUpdating={isUpdating} handleUpdateNote={handleUpdateNote} tag={tag} setTag={setTag} handleDeleteTag={handleDeleteTag} handleAddtag={handleAddtag} tagName={tagName} />}

        <div onClick={() => setShowModel(true)} className='add-btn'>
          <MdAdd size={25} />
        </div>
      </section>
    </>
  )
}

export default Home