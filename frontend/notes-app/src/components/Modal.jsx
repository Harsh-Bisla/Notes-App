import React, { useState } from 'react';
import { IoIosClose } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";


const Modal = ({ handleCloseModel, handleAddNote, title, setTitle, content, setContent, notes, isUpdating, handleUpdateNote, tag, setTag, handleDeleteTag, handleAddtag, tagName }) => {

    return (
        <>
            <div className='modal-wrapper'>
                <div className='modal-container'>
                    <IoIosClose onClick={handleCloseModel} id='close-model-btn' size={28} />
                    <p>TITLE</p>
                    <input onChange={(e) => setTitle(e.target.value)} value={title} id='input-top' type="text" placeholder='GO TO GYM AT 5' />
                    <p>CONTENT</p>
                    <textarea onChange={(e) => setContent(e.target.value)} value={content} cols={50} rows={8} id="textarea" placeholder='Content' />
                    <p>TAGS</p>
                    <div className='tag-container'>
                        {tagName.note?.map((tag, idx) => {
                            return (
                                <div key={idx} className='tag'>
                                    <p>#{tag}</p>
                                    <IoIosClose onClick={() => handleDeleteTag(tag, tagName.id)} size={20} />
                                </div>
                            )
                        })}


                    </div>
                    <div className='add-tag-container'>
                        <input value={tag} onChange={(e) => setTag(e.target.value)} type="text" placeholder='Add tags' />
                        <button onClick={handleAddtag} className='add-tag-btn'>
                            <IoMdAdd size={20} />
                        </button>
                    </div>
                    {isUpdating ?

                        <button onClick={handleUpdateNote} className='add'>UPDATE</button>
                        :
                        <button onClick={handleAddNote} className='add'>ADD</button>
                    }

                </div>
            </div>
        </>
    )
}

export default Modal