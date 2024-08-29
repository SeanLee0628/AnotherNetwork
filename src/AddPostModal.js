import React, { useState } from 'react';
import './Board.css'; // 스타일 시트

const AddPostModal = ({ isOpen, onClose, onAddPost }) => {
    const [postData, setPostData] = useState({
        name: '',
        idea: '',
        company: '',
        hours: '',
        position: '',
        positionNeed: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPost(postData);
        onClose(); // 모달 닫기
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-modal-button" onClick={onClose}>
                    &times;
                </button>
                <h3>Add a New Post</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={postData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="idea">Idea:</label>
                        <textarea
                            id="idea"
                            name="idea"
                            value={postData.idea}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="company">Company:</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={postData.company}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hours">Hours Needed:</label>
                        <input
                            type="text"
                            id="hours"
                            name="hours"
                            value={postData.hours}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="position">Position:</label>
                        <input
                            type="text"
                            id="position"
                            name="position"
                            value={postData.position}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="positionNeed">Position Needed:</label>
                        <input
                            type="text"
                            id="positionNeed"
                            name="positionNeed"
                            value={postData.positionNeed}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Add Post</button>
                </form>
            </div>
        </div>
    );
};

export default AddPostModal;
