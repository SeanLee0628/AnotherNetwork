import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetail.css';
import emailAtom from './emailAtom';
import { useAtom } from 'jotai';
import CommentForm from './CommentForm';

const PostDetail = () => {
    const { postId } = useParams();
    const [postDetail, setPostDetail] = useState({});
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [userEmail] = useAtom(emailAtom);
    const [authStatus, setAuthStatus] = useState(null);

    // Fetch post detail
    const fetchPostDetail = async () => {
        try {
            const response = await fetch('https://wdpek25gzj.execute-api.ap-northeast-2.amazonaws.com/SeeDetail', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "id": postId })
            });

            if (response.ok) {
                const data = await response.json();
                await setPostDetail(data|| {});
                fetchApplicantEmail(postId);
                fetchAuthStatus(data.name); 
            } else {
                const errorMessage = await response.text();
                setError(`Failed to fetch post detail: ${errorMessage}`);
            }
        } catch (error) {
            setError('An error occurred while fetching the post detail');
        } finally {
            setLoading(false);
        }
    };
    const fetchAuthStatus = async (name) => {
        try {
            const response = await fetch('https://wdpek25gzj.execute-api.ap-northeast-2.amazonaws.com/AuthUser', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });

            if (response.ok) {
                const data = await response.json();
                setAuthStatus(data === 1 ? "[인증됨]" : "[인증안됨]");
            } else {
                const errorMessage = await response.text();
                setError(`Failed to fetch auth status: ${errorMessage}`);
            }
        } catch (error) {
            setError('An error occurred while fetching the auth status');
        }
    };

    // Fetch applicant email by postId
    const fetchApplicantEmail = async (postId) => {
        try {
            const response = await fetch('https://wdpek25gzj.execute-api.ap-northeast-2.amazonaws.com/GetEmail', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: postId })
            });

            if (response.ok) {
                const data = await response.json();
                setEmail(data.email);
            } else {
                const errorMessage = await response.text();
                setError(`Failed to fetch email: ${errorMessage}`);
            }
        } catch (error) {
            setError('An error occurred while fetching the email');
        }
    };

    // Fetch email by commenter's name
    const fetchEmailByName = async (name) => {
        try {
            const response = await fetch('https://wdpek25gzj.execute-api.ap-northeast-2.amazonaws.com/SeePeople', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });

            if (response.ok) {
                const data = await response.json();
                const commenterEmail = data.find(person => person.name === name)?.email;
                setSelectedEmail(commenterEmail || 'Email not found');
            } else {
                const errorMessage = await response.text();
                setError(`Failed to fetch email for commenter: ${errorMessage}`);
            }
        } catch (error) {
            setError('An error occurred while fetching the email for commenter');
        }
    };

    // Handle name click
    const handleNameClick = async (commenterName) => {
        try {
            await fetchEmailByName(commenterName);

            const response = await fetch('https://wdpek25gzj.execute-api.ap-northeast-2.amazonaws.com/ChooseMe', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ who: userEmail, name: commenterName })
            });

            if (response.ok) {
                console.log('Email successfully added to whoChoseMe array.');
            } else {
                const errorMessage = await response.text();
                setError(`Failed to update whoChoseMe: ${errorMessage}`);
            }
        } catch (error) {
            setError('An error occurred while updating whoChoseMe');
        }
    };

    useEffect(() => {
        fetchPostDetail();
    }, [postId]);

    if (loading) {
        return <p>Loading post details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="post-detail">
            <h1>{postDetail.name || 'No Name Provided'}</h1>
            <div className="form-section">
                <div className="form-group">
                    <label>아이디어:</label>
                    <p>{postDetail.idea || 'N/A'}</p>
                </div>
                <div className="form-group">
                    <label>현재소속:</label>
                    <p>{postDetail.company || 'N/A'}{authStatus && <span style={{color: "red"}}> {authStatus}</span>}</p>
                </div>
                <div className="form-group">
                    <label>주간 투입 가능 시간:</label>
                    <p>{postDetail.hours || 'N/A'}</p>
                </div>
                <div className="form-group">
                    <label>포지션:</label>
                    <p>{postDetail.position || 'N/A'}</p>
                </div>
                <div className="form-group">
                    <label>필요인력:</label>
                    <p>{postDetail.positionNeed || 'N/A'}</p>
                </div>
                <div className="form-group">
                    <label>프로토타입:</label>
                    <p>
                        {postDetail.milestoneAuth === 0 ? "[인증안됨]" : "[인증됨]"}
                    </p>
                </div>
                <div className="form-group">
                    <label>이메일:</label>
                    <p className={localStorage.getItem("email") == email ? "" : "comment-item"}>{email || 'N/A'}</p>
                </div>
            </div>
            <div className="comments-section">
                <h2>댓글</h2>
                {Array.isArray(postDetail.comments) && postDetail.comments.length > 0 ? (
                    postDetail.comments.map((comment, index) => (
                        <div key={index}>
                            <p className={localStorage.getItem("email") == email ? "" : "comment-item"}>
                                {comment.comment}
                                <strong
                                    onClick={() => handleNameClick(comment.commenterName)}
                                    style={{ cursor: 'pointer', color: 'blue' }}
                                >
                                    {comment.commenterName}
                                </strong>
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
            {selectedEmail && (
                <p><strong>Email for selected commenter:</strong> {selectedEmail}</p>
            )}
        </div>
    );
};

export default PostDetail;
