import React, { useState, useEffect } from 'react';
import './Board.css'; // CSS 파일을 import

const CommentForm = ({ postId, commenterName, postNum }) => {
    const [commentData, setCommentData] = useState({
        comment: '' // 댓글 내용
    });

    const [comments, setComments] = useState([]); // 댓글 목록 상태 추가

    // 댓글 데이터 변경 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCommentData({
            ...commentData,
            [name]: value
        });
    };

    // 댓글 제출 처리
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://wdpek25gzj.execute-api.ap-northeast-2.amazonaws.com/AddComment', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: postId,
                    comment: commentData.comment,
                    commenterName: localStorage.getItem("name")
                })
            });

            if (response.ok) {
                const newComment = await response.json();
                console.log('Comment added successfully:', newComment);
                alert('Comment added successfully!');
                setCommentData({ comment: '' }); // Reset comment field
                fetchComments(); // 댓글 추가 후 댓글 목록 갱신
            } else {
                const errorText = await response.text(); // Log detailed error message
                console.error('Failed to add comment:', response.status, errorText);
                alert(`Failed to add comment. Status: ${response.status}, Message: ${errorText}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the comment. Please try again later.');
        }
    };

    // 댓글 목록 가져오기
    const fetchComments = async () => {
        try {
            const response = await fetch('https://wdpek25gzj.execute-api.ap-northeast-2.amazonaws.com/ViewComment', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: postId }) // Use correct key for the post ID
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Comments fetched successfully:', data);
                setComments(Array.isArray(data) ? data : []); // Ensure data is an array
            } else {
                const errorText = await response.text(); // Log detailed error message
                console.error('Failed to fetch comments:', response.status, errorText);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    // 컴포넌트가 마운트될 때 댓글 목록을 가져옴
    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <div className="comment-form" onClick={(e) => e.stopPropagation()}>
            <h3 className="form-title"></h3>
            <form onSubmit={handleSubmit} className="comment-form__form">
                <div className="form-group">
                    <label htmlFor="comment" className="form-label">{postNum == 0 ? "첫" : postNum+1}번째 피드백 도전!</label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={commentData.comment}
                        onChange={handleChange}
                        required
                        className="form-textarea"
                    />
                </div>
                <button type="submit" className="form-button">제출</button>
            </form>

        </div>
    );
};

export default CommentForm;
