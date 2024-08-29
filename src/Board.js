import React, { useState, useEffect } from 'react';
import './Board.css'; 
import { useAtom } from 'jotai';
import authAtom from './authAtom';
import emailAtom from './emailAtom';
import nameAtom from './nameAtom';
import { useNavigate } from 'react-router-dom';
import CommentForm from "./CommentForm";

// AddPostModal Component
const AddPostModal = ({ isOpen, onClose, onAddPost, postData, onChange }) => {
    if (!isOpen) return null;

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        let newSelection;

        if (checked) {
            // 체크된 경우 배열에 추가
            newSelection = [...postData.positionNeed, value];
        } else {
            // 체크 해제된 경우 배열에서 제거
            newSelection = postData.positionNeed.filter(item => item !== value);
        }

        onChange({ target: { name: 'positionNeed', value: newSelection } });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>아이디어 등록하기</h2>
                <form onSubmit={(e) => { e.preventDefault(); onAddPost(); }}>
                    <label>
                        이름:
                        <input
                            type="text"
                            name="name"
                            value={localStorage.getItem("name")}
                            onChange={onChange}
                        />
                    </label>
                    <label>
                        아이디어:
                        <textarea
                            name="idea"
                            value={postData.idea}
                            onChange={onChange}
                        />
                    </label>
                    <label>
                        현재소속:
                        <input
                            type="text"
                            name="company"
                            value={postData.company}
                            onChange={onChange}
                        />
                    </label>
                    <label>
                        주간 투입 가능 시간:
                        <input
                            type="text"
                            name="hours"
                            value={postData.hours}
                            onChange={onChange}
                        />
                    </label>
                    <label>
                        나의 포지션:
                        <input
                            type="text"
                            name="position"
                            value={postData.position}
                            onChange={onChange}
                        />
                    </label>
                    <label>필요한 인력:</label>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="백엔드개발자"
                                checked={postData.positionNeed.includes('백엔드개발자')}
                                onChange={handleCheckboxChange}
                            />
                            백엔드 개발자
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="프론트엔드개발자"
                                checked={postData.positionNeed.includes('프론트엔드개발자')}
                                onChange={handleCheckboxChange}
                            />
                            프론트엔드 개발자
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="디자이너"
                                checked={postData.positionNeed.includes('디자이너')}
                                onChange={handleCheckboxChange}
                            />
                            디자이너
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="기획자"
                                checked={postData.positionNeed.includes('기획자')}
                                onChange={handleCheckboxChange}
                            />
                            기획자
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="영업"
                                checked={postData.positionNeed.includes('영업')}
                                onChange={handleCheckboxChange}
                            />
                            영업
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="기타"
                                checked={postData.positionNeed.includes('기타')}
                                onChange={handleCheckboxChange}
                            />
                            기타
                        </label>
                    </div>
                    <button type="submit">등록</button>
                    <button type="button" onClick={onClose}>닫기</button>
                </form>
            </div>
        </div>
    );
};


const Board = () => {
    const [postData, setPostData] = useState({
        name: '',
        idea: '',
        company: '',
        hours: '',
        position: '',
        positionNeed: [],
        comments: [],
        milestone: '',
        milestoneAuth: 0
    });

    const [isLoggedIn] = useAtom(authAtom);
    const [userEmail] = useAtom(emailAtom);
    const [name] = useAtom(nameAtom);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [authStatuses, setAuthStatuses] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [myCEO, setMyCEO] = useState([]);

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const postsPerPage = 5; 


    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    

    const handleSubmit = async () => {
    try {
        const dataToSend = {
            ...postData,
            name: localStorage.getItem("name"),
            positionNeed: postData.positionNeed.join(', '), // 배열을 콤마로 구분된 문자열로 변환
        };

        const response = await fetch('https://wdpek25gzj.execute-api.ap-northeast-2.amazonaws.com/AddPost', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend) // positionNeed를 콤마로 구분된 문자열로 전송
        });
        if (response.ok) {
            alert('Post added successfully!');
            setPostData({
                name: '',
                idea: '',
                company: '',
                hours: '',
                position: '',
                positionNeed: [], // 초기화
                comments: [],
                milestone: '',
                milestoneAuth: 0
            });
            fetchPosts();
            setIsModalOpen(false);
        } else {
            alert('Failed to add post.');
        }
    } catch (error) {
        alert('An error occurred while adding the post.');
    }
};

    

    const fetchPosts = async () => {
        try {
            const response = await fetch('https://wdpek25gzj.execute-api.ap-northeast-2.amazonaws.com/SeePosts', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
                data.forEach(post => fetchAuthStatus(post.id));
                setFilteredPosts(data);
                setCurrentPage(1);
            } else {
                console.error('Failed to fetch posts:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchAuthStatus = async (postId) => {
        try {
            const response = await fetch('https://wdpek25gzj.execute-api.ap-northeast-2.amazonaws.com/SeePost', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: postId })
            });
            if (response.ok) {
                const data = await response.json();
                setAuthStatuses(prevStatuses => ({
                    ...prevStatuses,
                    [postId]: data === 1 ? '[인증됨]' : '[인증안됨]'
                }));
            } else {
                console.error('Failed to fetch auth status for post:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSearch = () => {
        const newFilteredPosts = posts.filter(post => 
            post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.idea.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.company.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(newFilteredPosts);
        setCurrentPage(1);
    };

    const seeOffers = async (name) => {
        try {
            const response = await fetch('https://wdpek25gzj.execute-api.ap-northeast-2.amazonaws.com/WhoChoseMe', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "name": "Sean" }),
            });

            if (response.ok) {
                const data = await response.json();
                setMyCEO(data);
                return data;
            } else {
                const errorText = await response.text();
                console.error('Failed to fetch data:', response.statusText);
                console.error('Error Body:', errorText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const whatItem = async (email) => {
        try {
            const response = await fetch('https://wdpek25gzj.execute-api.ap-northeast-2.amazonaws.com/EmailIdea', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "email": email }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data);
            } else {
                const errorText = await response.text();
                console.error('Failed to fetch data:', response.statusText);
                console.error('Error Body:', errorText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    return (
        <div className="board-container">
            <div className="top-menu">
                <button className="top-menu-button" onClick={() => navigate("/People")}>피플</button>
                <button className="top-menu-button" onClick={() => navigate("/mentoring")}>멘토링</button>
                <button onClick={() => seeOffers(name)} className="top-menu-button">오퍼 보기</button>
                {[...new Set(myCEO)].map(ceo => <p key={ceo} onClick={() => whatItem(ceo)}>{ceo} /</p>)}
            </div>

            <h1>아이템 토론방</h1>

            <p>{localStorage.getItem("email")}님 환영합니다</p>

            <input 
                type="text" 
                placeholder="검색어를 입력하세요" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button onClick={handleSearch}>검색</button>

            <button className="open-modal-button" onClick={() => setIsModalOpen(true)}>
                아이디어 등록하기
            </button>

            <AddPostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddPost={handleSubmit}
                postData={postData}
                onChange={handleChange}
            />
<div className="posts-list">
<table className="posts-table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>이름</th>
                            <th>필요 인력</th>
                            <th>피드백</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.length > 0 ? (
                            currentPosts.map((post, index) => (
                                <tr key={post.id}>
                                    <td>{indexOfFirstPost + index + 1}</td>
                                    <td onClick={() => navigate(`/PostDetail/${post.id}`)}>{post.idea}</td>
                                    <td>{post.name}</td>
                                    <td>{post.positionNeed}</td>
                                    <CommentForm postId={post.id} commenterName={post.name} postNum={post.comments.length}/>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No posts available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 페이지네이션 버튼 */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? 'active' : ''}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Board;