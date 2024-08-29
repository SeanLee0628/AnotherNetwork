import React from 'react';
import './Mentoring.css'; // Optional: add custom styles in a separate CSS file
import { useNavigate } from 'react-router-dom';

const Mentoring = () => {

    const navigate = useNavigate();
    return (
        <div className="mentoring-container">
            <button onClick={()=>navigate("/board")}>돌아가기</button>
            <h2>완성된 프로토타입을 이메일로 보내주시면, 검토 후 아래 멘토분과 연결해드립니다</h2>
            <br></br>
            <div className="mentor-image-container">
                <div className="mentor-item">
                    <img 
                        src="https://media.licdn.com/dms/image/v2/D5603AQGeRj25gmSmgQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1707606849165?e=1730332800&v=beta&t=w-O-llc4fagh_hT7xZlpV_PLYXpa7OyN2aDJuTt3tUQ" 
                        alt="Mentor Profile" 
                        className="mentor-profile-image"
                    />
                    <p><strong>(주)플필 류민국 대표</strong></p>
                </div>

                <div className="mentor-item">
                    <img 
                        src="https://media.licdn.com/dms/image/v2/C5103AQEdeQvXgv7AsA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1560412384016?e=1730332800&v=beta&t=rm7IMZeHIqGVBcNfPfZOQUzmn1wjdgwvcGeqgc78njM" 
                        alt="Mentor Profile" 
                        className="mentor-profile-image"
                    />
                    <p><strong>(주)엔젤스윙 박원녕 대표</strong></p>
                </div>

                <div className="mentor-item">
                    <img 
                        src="https://media.licdn.com/dms/image/v2/D5603AQEzrpQHOZsjEA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1698128614855?e=1730332800&v=beta&t=AIzhHaLq88TK0sdxU-eaPsLlhDtXs1OjYXNRAgie9KU" 
                        alt="Mentor Profile" 
                        className="mentor-profile-image"
                    />
                    <p><strong>(주)트위니 박상운 공동창업자</strong></p>
                </div>

                <div className="mentor-item">
                    <img 
                        src="https://media.licdn.com/dms/image/v2/C5603AQEEFvJcgBsDmQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1517275868751?e=1730332800&v=beta&t=3oragRyNB-Q2SiVHfiFdJg4CFSzjxPzyFTbx9qOqU9E" 
                        alt="Mentor Profile" 
                        className="mentor-profile-image"
                    />
                    <p><strong>(주)우다다 박양세 대표</strong></p>
                </div>

                <div className="mentor-item">
                    <img 
                        src="https://media.licdn.com/dms/image/v2/C5103AQGqvpSFDj2FrQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1576748005034?e=1730332800&v=beta&t=b-iStZ-jIe2hZhN9KQK1BHduypiNFMKGnoa7bHtY-jQ" 
                        alt="Mentor Profile" 
                        className="mentor-profile-image"
                    />
                    <p><strong>(주)소프트스퀘어드 이하늘 대표</strong></p>
                </div>

                <div className="mentor-item">
                    <img 
                        src="https://media.licdn.com/dms/image/v2/D5603AQFJcj0dNNb-0w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1680625274066?e=1730332800&v=beta&t=rxRPQ-X0wGSLdCl4t6KcImYqtU0UMmaRzYR72A8mDPc" 
                        alt="Mentor Profile" 
                        className="mentor-profile-image"
                    />
                    <p><strong>(주)파일러니어 배승환 대표</strong></p>
                </div>
                <div className="mentor-item">
                    <img 
                        src="https://media.licdn.com/dms/image/v2/D5603AQHjMWYamEaHMA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1712045070684?e=1730332800&v=beta&t=8aTLpvErizWR5WPhpF9o-hmdoqaGPGacwd6X4QzYgRc" 
                        alt="Mentor Profile" 
                        className="mentor-profile-image"
                    />
                    <p><strong>(주)랜딩 김태현 대표</strong></p>
                </div>

                <div className="mentor-item">
                    <img 
                        src="https://media.licdn.com/dms/image/v2/C5103AQF9DgaerFEOZA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1519428951930?e=1730332800&v=beta&t=ebMONLWNSCYoqSeBMXVySxS_DVkTFNVfdXSCCDQT7lM" 
                        alt="Mentor Profile" 
                        className="mentor-profile-image"
                    />
                    <p><strong>(주)커넥션밸류 김현승 대표</strong></p>
                </div>

                <div className="mentor-item">
                    <img 
                        src="https://media.licdn.com/dms/image/v2/C5603AQEAbHfg2RGahg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1599594787690?e=1730332800&v=beta&t=wAeouBtGp-OAJOZiukr701bpf1PgLUPy6n0ctvVUiDI" 
                        alt="Mentor Profile" 
                        className="mentor-profile-image"
                    />
                    <p><strong>Nutrivend Inc. Dwayne Jung 대표</strong></p>
                </div>

                <div className="mentor-item">
                    <img 
                        src="https://media.licdn.com/dms/image/v2/D5603AQGjbjF3ld7IRg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1694070765818?e=1730332800&v=beta&t=e0ufcR2yGvBniNPV05tLMoiR4hg-cNK4G-RpnfHPATk" 
                        alt="Mentor Profile" 
                        className="mentor-profile-image"
                    />
                    <p><strong>SiteTrace Inc. Lin Thet Kyaw 대표</strong></p>
                </div>
            </div>
        </div>
    );
};

export default Mentoring;
