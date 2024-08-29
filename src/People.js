import React, { useState, useEffect } from 'react';
import './People.css'; // 스타일 시트 (필요시)
import { useNavigate } from 'react-router-dom';

const People = () => {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // API 호출
        const fetchPeople = async () => {
            try {
                const response = await fetch('https://wdpek25gzj.execute-api.ap-northeast-2.amazonaws.com/SeePeople', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json(); // JSON 데이터 파싱
                // 데이터에 emailVisible 필드를 추가하여 초기값을 false로 설정
                const peopleWithVisibility = data.map(person => ({ ...person, emailVisible: false }));
                setPeople(peopleWithVisibility); // 응답 데이터를 상태에 저장
                setLoading(false);
            } catch (err) {
                setError(err); // 에러 상태 설정
                setLoading(false);
            }
        };

        fetchPeople();
    }, []);

    const toggleEmailVisibility = async (name) => {
        try {
            const response = await fetch('https://wdpek25gzj.execute-api.ap-northeast-2.amazonaws.com/NameToEmail', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }), // Name을 사용하여 이메일 요청
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch email for ${name}`);
            }

            const data = await response.json();
            const email = data.email;

            setPeople(prevPeople =>
                prevPeople.map(person =>
                    person.name === name ? { ...person, emailVisible: true, email } : person
                )
            );
        } catch (err) {
            console.error('Error fetching email:', err);
            setError(err);
        }
    };

    if (loading) return <p>Loading...</p>; // 로딩 중 상태
    if (error) return <p>Error: {error.message}</p>; // 에러 발생 시 상태

    return (
        <div className="people-container">
            <button onClick={()=>navigate("/board")}>돌아가기</button>
            <ul className="people-list">
                {people.length > 0 ? (
                    people.map(person => (
                        <li key={person.id} className="people-item">
                            <p><strong>이름:</strong> {person.name}</p>
                            <p><strong>포지션:</strong> {person.position}</p>
                            <div className={`email ${person.emailVisible ? 'visible' : ''}`}>
                                <p>{person.emailVisible ? person.email : '이메일 보기'}</p>
                            </div>
                            <button onClick={() => toggleEmailVisibility(person.name)} className="view-email-button">
                                {person.emailVisible ? '이메일 숨기기' : '이메일 보기'}
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No people available.</p>
                )}
            </ul>
        </div>
    );
};

export default People;
