import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const BunnyMascot = ({ mood = 'calm', size = 120 }) => {
  const moods = {
    calm: { earAngle: 15, eyeType: 'happy', blush: true },
    tired: { earAngle: -20, eyeType: 'tired', blush: false },
    stressed: { earAngle: -30, eyeType: 'worried', blush: false },
    happy: { earAngle: 25, eyeType: 'happy', blush: true }
  };
  
  const currentMood = moods[mood];
  
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: 'drop-shadow(0 4px 12px rgba(147, 197, 189, 0.3))' }}>
      {/* Body */}
      <ellipse cx="100" cy="130" rx="60" ry="55" fill="#E8F5F3" stroke="#93C5BD" strokeWidth="2"/>
      
      {/* Head */}
      <circle cx="100" cy="80" r="50" fill="#F0F8F6" stroke="#93C5BD" strokeWidth="2"/>
      
      {/* Left Ear */}
      <ellipse cx="75" cy="35" rx="15" ry="40" fill="#E8F5F3" stroke="#93C5BD" strokeWidth="2" 
        transform={`rotate(${currentMood.earAngle} 75 35)`}/>
      <ellipse cx="75" cy="35" rx="8" ry="30" fill="#FFD6E8" 
        transform={`rotate(${currentMood.earAngle} 75 35)`}/>
      
      {/* Right Ear */}
      <ellipse cx="125" cy="35" rx="15" ry="40" fill="#E8F5F3" stroke="#93C5BD" strokeWidth="2"
        transform={`rotate(${-currentMood.earAngle} 125 35)`}/>
      <ellipse cx="125" cy="35" rx="8" ry="30" fill="#FFD6E8"
        transform={`rotate(${-currentMood.earAngle} 125 35)`}/>
      
      {/* Eyes */}
      {currentMood.eyeType === 'happy' && (
        <>
          <circle cx="85" cy="75" r="4" fill="#2D3748"/>
          <circle cx="115" cy="75" r="4" fill="#2D3748"/>
          <path d="M 82 72 Q 85 69 88 72" stroke="#2D3748" strokeWidth="2" fill="none"/>
          <path d="M 112 72 Q 115 69 118 72" stroke="#2D3748" strokeWidth="2" fill="none"/>
        </>
      )}
      {currentMood.eyeType === 'tired' && (
        <>
          <line x1="80" y1="75" x2="90" y2="75" stroke="#2D3748" strokeWidth="3" strokeLinecap="round"/>
          <line x1="110" y1="75" x2="120" y2="75" stroke="#2D3748" strokeWidth="3" strokeLinecap="round"/>
        </>
      )}
      {currentMood.eyeType === 'worried' && (
        <>
          <circle cx="85" cy="75" r="5" fill="#2D3748"/>
          <circle cx="115" cy="75" r="5" fill="#2D3748"/>
          <path d="M 78 70 Q 85 67 92 70" stroke="#2D3748" strokeWidth="2" fill="none"/>
          <path d="M 108 70 Q 115 67 122 70" stroke="#2D3748" strokeWidth="2" fill="none"/>
        </>
      )}
      
      {/* Nose */}
      <ellipse cx="100" cy="85" rx="6" ry="4" fill="#FFB8D1"/>
      
      {/* Mouth */}
      <path d="M 100 88 Q 95 92 90 90" stroke="#2D3748" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 100 88 Q 105 92 110 90" stroke="#2D3748" strokeWidth="2" fill="none" strokeLinecap="round"/>
      
      {/* Blush */}
      {currentMood.blush && (
        <>
          <ellipse cx="70" cy="88" rx="12" ry="8" fill="#FFD6E8" opacity="0.6"/>
          <ellipse cx="130" cy="88" rx="12" ry="8" fill="#FFD6E8" opacity="0.6"/>
        </>
      )}
      
      {/* Headphones */}
      <rect x="50" y="70" width="8" height="25" rx="4" fill="#B8A3E8" stroke="#9378D9" strokeWidth="2"/>
      <rect x="142" y="70" width="8" height="25" rx="4" fill="#B8A3E8" stroke="#9378D9" strokeWidth="2"/>
      <path d="M 58 82 Q 100 55 142 82" stroke="#9378D9" strokeWidth="4" fill="none" strokeLinecap="round"/>
      
      {/* Backpack straps */}
      <path d="M 70 110 Q 80 120 75 140" stroke="#FFB8D1" strokeWidth="6" fill="none" strokeLinecap="round"/>
      <path d="M 130 110 Q 120 120 125 140" stroke="#FFB8D1" strokeWidth="6" fill="none" strokeLinecap="round"/>
      
      {/* Bubble tea */}
      <g transform="translate(140, 145)">
        <rect x="0" y="0" width="25" height="35" rx="3" fill="#FFE5B4" stroke="#E8C896" strokeWidth="2"/>
        <circle cx="12.5" cy="45" r="4" fill="#C19A6B"/>
        <rect x="10" y="5" width="5" height="8" fill="#8B7355"/>
        {/* Bubbles */}
        <circle cx="8" cy="25" r="3" fill="#5D4E37" opacity="0.8"/>
        <circle cx="17" cy="28" r="2.5" fill="#5D4E37" opacity="0.8"/>
        <circle cx="12" cy="32" r="2" fill="#5D4E37" opacity="0.8"/>
        {/* Straw */}
        <rect x="19" y="-10" width="3" height="20" fill="#FF6B9D" opacity="0.8"/>
      </g>
    </svg>
  );
};

const ThoWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('thoUserData');
    return saved ? JSON.parse(saved) : {
      weeklyStress: [],
      burnoutTests: [],
      forumPosts: [],
      matches: [],
      profile: null
    };
  });

  useEffect(() => {
    localStorage.setItem('thoUserData', JSON.stringify(userData));
  }, [userData]);

  // Burnout Test State
  const [testAnswers, setTestAnswers] = useState({});
  const [testResult, setTestResult] = useState(null);

  const burnoutQuestions = [
    { id: 1, text: 'Bạn có cảm thấy kiệt sức sau một ngày học không?', category: 'exhaustion' },
    { id: 2, text: 'Bạn có khó tập trung vào bài học không?', category: 'concentration' },
    { id: 3, text: 'Bạn có cảm thấy áp lực từ kỳ vọng của gia đình không?', category: 'pressure' },
    { id: 4, text: 'Bạn có thường xuyên lo lắng về điểm số không?', category: 'anxiety' },
    { id: 5, text: 'Bạn có cảm thấy mất hứng thú với những thứ bạn từng thích không?', category: 'motivation' },
    { id: 6, text: 'Bạn có gặp khó khăn trong việc ngủ không?', category: 'sleep' },
    { id: 7, text: 'Bạn có cảm thấy cô đơn dù ở trong đám đông không?', category: 'isolation' },
    { id: 8, text: 'Bạn có nghĩ rằng mình không đủ giỏi không?', category: 'self-worth' },
    { id: 9, text: 'Bạn có bỏ bữa hoặc ăn không đúng giờ không?', category: 'physical' },
    { id: 10, text: 'Bạn có cảm thấy không có thời gian cho bản thân không?', category: 'time' }
  ];

  const calculateBurnoutScore = () => {
    const total = Object.values(testAnswers).reduce((sum, val) => sum + val, 0);
    const maxScore = burnoutQuestions.length * 5;
    const percentage = (total / maxScore) * 100;
    
    let level, mood, advice, color;
    if (percentage < 30) {
      level = 'Tốt';
      mood = 'happy';
      advice = 'Bạn đang quản lý stress rất tốt! Hãy tiếp tục duy trì thói quen tích cực này.';
      color = '#93C5BD';
    } else if (percentage < 50) {
      level = 'Bình thường';
      mood = 'calm';
      advice = 'Bạn đang có một số dấu hiệu stress. Hãy chú ý nghỉ ngơi và dành thời gian cho bản thân nhiều hơn.';
      color = '#B8A3E8';
    } else if (percentage < 70) {
      level = 'Cần chú ý';
      mood = 'tired';
      advice = 'Mức độ burnout của bạn đang ở mức cần quan tâm. Hãy thử các kỹ thuật thư giãn và nói chuyện với ai đó.';
      color = '#FFB8D1';
    } else {
      level = 'Nghiêm trọng';
      mood = 'stressed';
      advice = 'Bạn đang trong tình trạng burnout nghiêm trọng. Hãy tìm đến sự hỗ trợ từ gia đình, thầy cô hoặc chuyên gia tâm lý.';
      color = '#FF6B9D';
    }

    const result = {
      score: total,
      percentage: percentage.toFixed(1),
      level,
      mood,
      advice,
      color,
      date: new Date().toISOString(),
      categoryScores: {
        exhaustion: testAnswers[1] || 0,
        concentration: testAnswers[2] || 0,
        pressure: testAnswers[3] || 0,
        anxiety: testAnswers[4] || 0,
        motivation: testAnswers[5] || 0,
        sleep: testAnswers[6] || 0,
        isolation: testAnswers[7] || 0,
        'self-worth': testAnswers[8] || 0,
        physical: testAnswers[9] || 0,
        time: testAnswers[10] || 0
      }
    };

    setTestResult(result);
    setUserData(prev => ({
      ...prev,
      burnoutTests: [...prev.burnoutTests, result],
      weeklyStress: [...prev.weeklyStress, {
        week: `Tuần ${prev.weeklyStress.length + 1}`,
        stress: percentage,
        date: new Date().toISOString()
      }]
    }));
  };

  const exportPDF = () => {
    const pdfContent = `
BÁOÁO ĐÁNH GIÁ BURNOUT
Website: Thở - Breathe Teen
Ngày: ${new Date().toLocaleDateString('vi-VN')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KẾT QUẢ TỔNG QUAN
Mức độ Burnout: ${testResult.level}
Điểm số: ${testResult.score}/50 (${testResult.percentage}%)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PHÂN TÍCH CHI TIẾT

${Object.entries(testResult.categoryScores).map(([cat, score]) => {
  const labels = {
    exhaustion: 'Kiệt sức',
    concentration: 'Tập trung',
    pressure: 'Áp lực',
    anxiety: 'Lo âu',
    motivation: 'Động lực',
    sleep: 'Giấc ngủ',
    isolation: 'Cô đơn',
    'self-worth': 'Tự tin',
    physical: 'Sức khỏe',
    time: 'Quản lý thời gian'
  };
  return `${labels[cat]}: ${'█'.repeat(score)}${'░'.repeat(5-score)} ${score}/5`;
}).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KHUYẾN NGHỊ
${testResult.advice}

LỊCH SỬ STRESS (${userData.weeklyStress.length} tuần gần nhất)
${userData.weeklyStress.slice(-4).map(w => 
  `${w.week}: ${w.stress.toFixed(1)}%`
).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HOTLINE HỖ TRỢ
• Tổng đài Sức khỏe Tâm thần: 1800 599 885
• Viện Sức khỏe Tâm thần: (028) 3969 0372
• Bệnh viện Nhi Đồng 1: (028) 3829 5723

Báo cáo này chỉ mang tính chất tham khảo.
Nếu cần hỗ trợ chuyên sâu, hãy liên hệ với chuyên gia tâm lý.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Website: tho.edu.vn | Email: support@tho.edu.vn
    `.trim();

    const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bao-cao-Burnout-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Rest Spots in HCMC
  const restSpots = [
    { id: 1, name: 'Thư viện Thành phố', address: '69 Lý Tự Trọng, Q1', type: 'Thư viện', lat: 10.7769, lng: 106.7009, vibe: 'Yên tĩnh, nhiều sách', hours: '8:00 - 20:00' },
    { id: 2, name: 'Công viên Tao Đàn', address: 'Trương Định, Q1', type: 'Công viên', lat: 10.7823, lng: 106.6920, vibe: 'Xanh mát, thoáng đãng', hours: '5:00 - 21:00' },
    { id: 3, name: 'Nhà sách Fahasa NVL', address: '40 Nguyễn Huệ, Q1', type: 'Nhà sách', lat: 10.7745, lng: 106.7021, vibe: 'Sách hay, cafe nhỏ', hours: '8:30 - 22:00' },
    { id: 4, name: 'Thảo Cầm Viên', address: 'Nguyễn Bỉnh Khiêm, Q1', type: 'Vườn thú', lat: 10.7878, lng: 106.7056, vibe: 'Thiên nhiên, động vật', hours: '7:00 - 18:00' },
    { id: 5, name: 'Café The Book Nook', address: '28 Nguyễn Văn Trỗi, Q3', type: 'Cafe', lat: 10.7868, lng: 106.6762, vibe: 'Sách + cafe, góc đọc', hours: '8:00 - 22:00' },
    { id: 6, name: 'Bờ kè Bạch Đằng', address: 'Tôn Đức Thắng, Q1', type: 'Outdoor', lat: 10.7711, lng: 106.7059, vibe: 'Sông Sài Gòn, gió mát', hours: '24/7' },
    { id: 7, name: 'Bảo tàng Mỹ thuật', address: '97A Phó Đức Chính, Q1', type: 'Bảo tàng', lat: 10.7681, lng: 106.6978, vibe: 'Nghệ thuật, yên bình', hours: '9:00 - 17:00' },
    { id: 8, name: 'Công viên Gia Định', address: 'Hoàng Minh Giám, Q.Phú Nhuận', type: 'Công viên', lat: 10.8011, lng: 106.6766, vibe: 'Hồ nước, chạy bộ', hours: '5:00 - 21:00' }
  ];

  // Forum State
  const [forumFilter, setForumFilter] = useState('all');
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' });

  const forumCategories = {
    general: '💬 Tâm sự chung',
    exam: '📚 Stress thi cử',
    family: '👨‍👩‍👧 Gia đình',
    friends: '👫 Bạn bè',
    future: '🌟 Tương lai'
  };

  const addForumPost = () => {
    if (newPost.title && newPost.content) {
      const post = {
        id: Date.now(),
        ...newPost,
        author: `Thỏ ẩn danh #${Math.floor(Math.random() * 9999)}`,
        timestamp: new Date().toISOString(),
        replies: []
      };
      setUserData(prev => ({
        ...prev,
        forumPosts: [post, ...prev.forumPosts]
      }));
      setNewPost({ title: '', content: '', category: 'general' });
    }
  };

  // Resources
  const resources = [
    {
      type: 'video',
      title: 'Kỹ thuật hít thở 4-7-8 giảm stress',
      author: 'Dr. Nguyễn Văn A',
      duration: '8:32',
      thumbnail: '🫁',
      link: '#'
    },
    {
      type: 'article',
      title: 'Làm sao để nói "không" với áp lực',
      author: 'Tâm lý học trường',
      readTime: '5 phút',
      thumbnail: '📖',
      link: '#'
    },
    {
      type: 'hotline',
      title: 'Tổng đài Sức khỏe Tâm thần',
      phone: '1800 599 885',
      hours: '24/7',
      thumbnail: '📞',
      link: 'tel:1800599885'
    },
    {
      type: 'video',
      title: 'Meditation cho học sinh (15 phút)',
      author: 'Mindful Teen',
      duration: '15:20',
      thumbnail: '🧘',
      link: '#'
    },
    {
      type: 'article',
      title: 'Lập kế hoạch học tập không stress',
      author: 'Study Coach',
      readTime: '8 phút',
      thumbnail: '📝',
      link: '#'
    },
    {
      type: 'hotline',
      title: 'Bệnh viện Nhi Đồng 1 - Tư vấn tâm lý',
      phone: '(028) 3829 5723',
      hours: '8:00 - 17:00',
      thumbnail: '🏥',
      link: 'tel:02838295723'
    }
  ];

  // Matching System
  const [matchProfile, setMatchProfile] = useState({
    grade: '',
    interests: [],
    stressLevel: '',
    preferredActivity: ''
  });

  const interestOptions = ['Đọc sách', 'Âm nhạc', 'Thể thao', 'Vẽ vời', 'Game', 'Phim ảnh', 'Du lịch', 'Nấu ăn'];

  const findMatches = () => {
    // Simulate matching algorithm
    const potentialMatches = [
      { id: 1, name: 'Thỏ #2847', match: 85, interests: matchProfile.interests.slice(0, 2), grade: matchProfile.grade },
      { id: 2, name: 'Thỏ #5921', match: 78, interests: matchProfile.interests.slice(1), grade: matchProfile.grade },
      { id: 3, name: 'Thỏ #3156', match: 72, interests: matchProfile.interests, grade: matchProfile.grade }
    ];
    setUserData(prev => ({ ...prev, matches: potentialMatches }));
  };

  // Sample weekly data for dashboard
  const getWeeklyData = () => {
    if (userData.weeklyStress.length === 0) {
      return [
        { week: 'Tuần 1', stress: 45, sleep: 6.5, mood: 6 },
        { week: 'Tuần 2', stress: 52, sleep: 6, mood: 5 },
        { week: 'Tuần 3', stress: 48, sleep: 7, mood: 7 },
        { week: 'Tuần 4', stress: 55, sleep: 5.5, mood: 5 }
      ];
    }
    return userData.weeklyStress.slice(-4).map((w, i) => ({
      week: w.week,
      stress: w.stress,
      sleep: 7 - (w.stress / 100) * 3,
      mood: 10 - (w.stress / 100) * 5
    }));
  };

  const getAverageStress = () => {
    const allTests = userData.burnoutTests;
    if (allTests.length === 0) return 45;
    return allTests.reduce((sum, t) => sum + parseFloat(t.percentage), 0) / allTests.length;
  };

  return (
    <div style={{ 
      fontFamily: "'Quicksand', 'Nunito', sans-serif",
      background: 'linear-gradient(135deg, #E8F5F3 0%, #F0F8F6 50%, #FFF0F5 100%)',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'fixed',
        top: '-10%',
        right: '-5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(184, 163, 232, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 0,
        animation: 'float 20s ease-in-out infinite'
      }}/>
      <div style={{
        position: 'fixed',
        bottom: '-10%',
        left: '-5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(147, 197, 189, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 0,
        animation: 'float 25s ease-in-out infinite reverse'
      }}/>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Nunito:wght@400;600;700&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .page-content {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .bunny-breathe {
          animation: breathe 4s ease-in-out infinite;
        }
        
        .card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 8px 32px rgba(147, 197, 189, 0.15);
          border: 2px solid rgba(147, 197, 189, 0.2);
          transition: all 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 48px rgba(147, 197, 189, 0.25);
        }
        
        .btn {
          padding: 12px 28px;
          border-radius: 16px;
          border: none;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Quicksand', sans-serif;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #93C5BD 0%, #7FB3AB 100%);
          color: white;
        }
        
        .btn-primary:hover {
          background: linear-gradient(135deg, #7FB3AB 0%, #6BA199 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(147, 197, 189, 0.4);
        }
        
        .btn-secondary {
          background: linear-gradient(135deg, #B8A3E8 0%, #A389D8 100%);
          color: white;
        }
        
        .btn-secondary:hover {
          background: linear-gradient(135deg, #A389D8 0%, #8E6FC8 100%);
          transform: translateY(-2px);
        }
        
        input, textarea, select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid rgba(147, 197, 189, 0.3);
          border-radius: 12px;
          font-family: 'Quicksand', sans-serif;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.6);
          transition: all 0.3s ease;
        }
        
        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: #93C5BD;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 0 0 4px rgba(147, 197, 189, 0.1);
        }
        
        .nav-item {
          padding: 10px 20px;
          margin: 0 8px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          font-size: 14px;
        }
        
        .nav-item:hover {
          background: rgba(147, 197, 189, 0.15);
          transform: translateY(-2px);
        }
        
        .nav-item.active {
          background: linear-gradient(135deg, #93C5BD 0%, #7FB3AB 100%);
          color: white;
        }
        
        .stress-indicator {
          width: 100%;
          height: 12px;
          background: #E8F5F3;
          border-radius: 6px;
          overflow: hidden;
          position: relative;
        }
        
        .stress-fill {
          height: 100%;
          border-radius: 6px;
          transition: width 1s ease, background 0.3s ease;
        }
      `}</style>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          padding: '20px 40px',
          borderRadius: '24px',
          marginBottom: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 8px 32px rgba(147, 197, 189, 0.15)',
          border: '2px solid rgba(147, 197, 189, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="bunny-breathe">
              <BunnyMascot mood="calm" size={70} />
            </div>
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: '32px', 
                background: 'linear-gradient(135deg, #93C5BD 0%, #B8A3E8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700
              }}>
                Thở
              </h1>
              <p style={{ margin: '4px 0 0', color: '#718096', fontSize: '14px', fontWeight: 500 }}>
                Breathe Teen - Nơi dừng chân của bạn
              </p>
            </div>
          </div>
          
          <nav style={{ display: 'flex' }}>
            {[
              { id: 'home', icon: '🏠', label: 'Trang chủ' },
              { id: 'test', icon: '📝', label: 'Test Burnout' },
              { id: 'dashboard', icon: '📊', label: 'Dashboard' },
              { id: 'map', icon: '🗺️', label: 'Bản đồ' },
              { id: 'forum', icon: '💬', label: 'Forum' },
              { id: 'resources', icon: '📚', label: 'Tài nguyên' },
              { id: 'matching', icon: '🤝', label: 'Tìm bạn' }
            ].map(item => (
              <div
                key={item.id}
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => setCurrentPage(item.id)}
              >
                <span style={{ marginRight: '6px' }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </nav>
        </div>

        {/* Page Content */}
        <div className="page-content">
          {/* HOME PAGE */}
          {currentPage === 'home' && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ marginBottom: '40px' }}>
                <BunnyMascot mood="happy" size={200} />
              </div>
              <h2 style={{ 
                fontSize: '48px', 
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #93C5BD 0%, #B8A3E8 50%, #FFB8D1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700
              }}>
                Chào mừng đến với Thở
              </h2>
              <p style={{ fontSize: '20px', color: '#4A5568', maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.6 }}>
                Nơi học sinh THPT tìm kiếm sự cân bằng, chia sẻ cảm xúc và nhận được hỗ trợ trong hành trình học tập.
              </p>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '24px',
                maxWidth: '1000px',
                margin: '0 auto'
              }}>
                {[
                  { title: 'Test Burnout', desc: 'Đánh giá mức độ stress của bạn', icon: '📝', page: 'test', color: '#93C5BD' },
                  { title: 'Dashboard', desc: 'Theo dõi tiến trình của bạn', icon: '📊', page: 'dashboard', color: '#B8A3E8' },
                  { title: 'Bản đồ nghỉ ngơi', desc: 'Tìm địa điểm yên tĩnh gần bạn', icon: '🗺️', page: 'map', color: '#FFB8D1' },
                  { title: 'Forum', desc: 'Chia sẻ tâm sự ẩn danh', icon: '💬', page: 'forum', color: '#93C5BD' },
                  { title: 'Tài nguyên', desc: 'Video, bài viết và hotline hỗ trợ', icon: '📚', page: 'resources', color: '#B8A3E8' },
                  { title: 'Tìm bạn đồng hành', desc: 'Kết nối với những người hiểu bạn', icon: '🤝', page: 'matching', color: '#FFB8D1' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="card"
                    onClick={() => setCurrentPage(item.page)}
                    style={{ cursor: 'pointer', textAlign: 'left' }}
                  >
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>{item.icon}</div>
                    <h3 style={{ fontSize: '20px', marginBottom: '8px', color: item.color }}>{item.title}</h3>
                    <p style={{ color: '#718096', fontSize: '14px', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '60px', padding: '32px', background: 'rgba(147, 197, 189, 0.1)', borderRadius: '20px', maxWidth: '700px', margin: '60px auto 0' }}>
                <p style={{ fontSize: '18px', fontStyle: 'italic', color: '#4A5568', margin: 0 }}>
                  "Chậm lại không sao, quan trọng là đừng dừng hẳn"
                </p>
                <p style={{ fontSize: '14px', color: '#93C5BD', marginTop: '12px', fontWeight: 600 }}>- Thỏ Thở</p>
              </div>
            </div>
          )}

          {/* TEST BURNOUT PAGE */}
          {currentPage === 'test' && (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div className="card" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                  <BunnyMascot mood={testResult ? testResult.mood : 'calm'} size={100} />
                  <div>
                    <h2 style={{ margin: 0, fontSize: '28px', color: '#2D3748' }}>Test Burnout</h2>
                    <p style={{ margin: '8px 0 0', color: '#718096' }}>
                      Đánh giá mức độ burnout của bạn qua 10 câu hỏi nhanh
                    </p>
                  </div>
                </div>

                {!testResult ? (
                  <div>
                    {burnoutQuestions.map((q, idx) => (
                      <div key={q.id} style={{ marginBottom: '28px' }}>
                        <p style={{ fontWeight: 600, color: '#2D3748', marginBottom: '12px' }}>
                          {idx + 1}. {q.text}
                        </p>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          {[1, 2, 3, 4, 5].map(val => (
                            <button
                              key={val}
                              onClick={() => setTestAnswers({ ...testAnswers, [q.id]: val })}
                              style={{
                                padding: '10px 20px',
                                borderRadius: '12px',
                                border: testAnswers[q.id] === val ? '2px solid #93C5BD' : '2px solid #E2E8F0',
                                background: testAnswers[q.id] === val ? 'rgba(147, 197, 189, 0.2)' : 'white',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '14px',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              {['Không bao giờ', 'Hiếm khi', 'Thỉnh thoảng', 'Thường xuyên', 'Luôn luôn'][val - 1]}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={calculateBurnoutScore}
                      disabled={Object.keys(testAnswers).length < burnoutQuestions.length}
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        padding: '16px',
                        fontSize: '16px',
                        marginTop: '20px',
                        opacity: Object.keys(testAnswers).length < burnoutQuestions.length ? 0.5 : 1
                      }}
                    >
                      Xem kết quả
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{
                      background: `linear-gradient(135deg, ${testResult.color}20 0%, ${testResult.color}10 100%)`,
                      padding: '32px',
                      borderRadius: '20px',
                      marginBottom: '24px',
                      textAlign: 'center'
                    }}>
                      <h3 style={{ fontSize: '24px', color: testResult.color, marginBottom: '12px' }}>
                        Mức độ: {testResult.level}
                      </h3>
                      <div style={{ fontSize: '48px', fontWeight: 700, color: testResult.color, marginBottom: '8px' }}>
                        {testResult.percentage}%
                      </div>
                      <div className="stress-indicator" style={{ maxWidth: '300px', margin: '20px auto' }}>
                        <div className="stress-fill" style={{
                          width: `${testResult.percentage}%`,
                          background: `linear-gradient(90deg, ${testResult.color} 0%, ${testResult.color}CC 100%)`
                        }} />
                      </div>
                    </div>

                    <div style={{
                      background: 'rgba(147, 197, 189, 0.1)',
                      padding: '24px',
                      borderRadius: '16px',
                      marginBottom: '24px'
                    }}>
                      <h4 style={{ marginTop: 0, color: '#2D3748' }}>💡 Khuyến nghị</h4>
                      <p style={{ color: '#4A5568', lineHeight: 1.6, margin: 0 }}>
                        {testResult.advice}
                      </p>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ color: '#2D3748', marginBottom: '16px' }}>📊 Phân tích chi tiết</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                        {Object.entries(testResult.categoryScores).map(([cat, score]) => {
                          const labels = {
                            exhaustion: 'Kiệt sức',
                            concentration: 'Tập trung',
                            pressure: 'Áp lực',
                            anxiety: 'Lo âu',
                            motivation: 'Động lực',
                            sleep: 'Giấc ngủ',
                            isolation: 'Cô đơn',
                            'self-worth': 'Tự tin',
                            physical: 'Sức khỏe',
                            time: 'Thời gian'
                          };
                          return (
                            <div key={cat} style={{
                              background: 'white',
                              padding: '12px',
                              borderRadius: '12px',
                              border: '1px solid #E2E8F0'
                            }}>
                              <div style={{ fontSize: '12px', color: '#718096', marginBottom: '6px' }}>
                                {labels[cat]}
                              </div>
                              <div style={{ display: 'flex', gap: '4px' }}>
                                {[...Array(5)].map((_, i) => (
                                  <div key={i} style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '4px',
                                    background: i < score ? testResult.color : '#E2E8F0'
                                  }} />
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        onClick={exportPDF}
                        className="btn btn-secondary"
                        style={{ flex: 1 }}
                      >
                        📄 Xuất báo cáo
                      </button>
                      <button
                        onClick={() => {
                          setTestResult(null);
                          setTestAnswers({});
                        }}
                        className="btn btn-primary"
                        style={{ flex: 1 }}
                      >
                        🔄 Làm lại test
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DASHBOARD PAGE */}
          {currentPage === 'dashboard' && (
            <div>
              <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#2D3748' }}>
                📊 Dashboard theo dõi
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                {[
                  { label: 'Mức stress trung bình', value: `${getAverageStress().toFixed(1)}%`, color: '#93C5BD', icon: '📈' },
                  { label: 'Số lần test', value: userData.burnoutTests.length, color: '#B8A3E8', icon: '📝' },
                  { label: 'So với nhóm', value: `+${(getAverageStress() - 45).toFixed(1)}%`, color: '#FFB8D1', icon: '👥' },
                  { label: 'Xu hướng', value: userData.weeklyStress.length >= 2 && 
                    userData.weeklyStress[userData.weeklyStress.length - 1].stress < 
                    userData.weeklyStress[userData.weeklyStress.length - 2].stress ? '📉 Giảm' : '📈 Tăng', 
                    color: '#93C5BD', icon: '📊' }
                ].map((stat, idx) => (
                  <div key={idx} className="card">
                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>{stat.icon}</div>
                    <div style={{ fontSize: '14px', color: '#718096', marginBottom: '8px' }}>{stat.label}</div>
                    <div style={{ fontSize: '28px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                <div className="card">
                  <h3 style={{ marginTop: 0, color: '#2D3748' }}>Biểu đồ stress theo tuần</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={getWeeklyData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="week" stroke="#718096" />
                      <YAxis stroke="#718096" />
                      <Tooltip 
                        contentStyle={{ 
                          background: 'rgba(255, 255, 255, 0.95)', 
                          border: '2px solid #93C5BD',
                          borderRadius: '12px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="stress" stroke="#93C5BD" strokeWidth={3} name="Mức stress (%)" />
                      <Line type="monotone" dataKey="mood" stroke="#B8A3E8" strokeWidth={3} name="Tâm trạng (1-10)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="card">
                  <h3 style={{ marginTop: 0, color: '#2D3748' }}>So sánh với trung bình nhóm</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { category: 'Bạn', value: getAverageStress() },
                      { category: 'Trung bình', value: 45 },
                      { category: 'Cao nhất', value: 75 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="category" stroke="#718096" />
                      <YAxis stroke="#718096" />
                      <Tooltip 
                        contentStyle={{ 
                          background: 'rgba(255, 255, 255, 0.95)', 
                          border: '2px solid #B8A3E8',
                          borderRadius: '12px'
                        }}
                      />
                      <Bar dataKey="value" fill="#B8A3E8" name="Mức stress (%)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {testResult && (
                <div className="card" style={{ marginTop: '24px' }}>
                  <h3 style={{ marginTop: 0, color: '#2D3748' }}>Phân tích đa chiều - Kết quả gần nhất</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={Object.entries(testResult.categoryScores).map(([cat, score]) => ({
                      category: {
                        exhaustion: 'Kiệt sức',
                        concentration: 'Tập trung',
                        pressure: 'Áp lực',
                        anxiety: 'Lo âu',
                        motivation: 'Động lực',
                        sleep: 'Giấc ngủ',
                        isolation: 'Cô đơn',
                        'self-worth': 'Tự tin',
                        physical: 'Sức khỏe',
                        time: 'Thời gian'
                      }[cat],
                      value: score,
                      fullMark: 5
                    }))}>
                      <PolarGrid stroke="#E2E8F0" />
                      <PolarAngleAxis dataKey="category" stroke="#718096" />
                      <PolarRadiusAxis angle={90} domain={[0, 5]} stroke="#718096" />
                      <Radar name="Mức độ" dataKey="value" stroke="#FFB8D1" fill="#FFB8D1" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          )}

          {/* MAP PAGE */}
          {currentPage === 'map' && (
            <div>
              <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#2D3748' }}>
                🗺️ Bản đồ nghỉ ngơi TP.HCM
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {restSpots.map(spot => (
                  <div key={spot.id} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                      <div>
                        <h3 style={{ margin: '0 0 8px', color: '#2D3748', fontSize: '18px' }}>{spot.name}</h3>
                        <div style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '8px',
                          background: 'rgba(147, 197, 189, 0.2)',
                          color: '#93C5BD',
                          fontSize: '12px',
                          fontWeight: 600,
                          marginBottom: '8px'
                        }}>
                          {spot.type}
                        </div>
                      </div>
                      <div style={{ fontSize: '32px' }}>
                        {spot.type === 'Thư viện' ? '📚' : 
                         spot.type === 'Công viên' ? '🌳' :
                         spot.type === 'Nhà sách' ? '📖' :
                         spot.type === 'Cafe' ? '☕' :
                         spot.type === 'Outdoor' ? '🌊' :
                         spot.type === 'Bảo tàng' ? '🎨' : '🦁'}
                      </div>
                    </div>
                    
                    <p style={{ color: '#4A5568', fontSize: '14px', marginBottom: '8px' }}>
                      📍 {spot.address}
                    </p>
                    <p style={{ color: '#718096', fontSize: '14px', marginBottom: '8px', fontStyle: 'italic' }}>
                      ✨ {spot.vibe}
                    </p>
                    <p style={{ color: '#93C5BD', fontSize: '13px', fontWeight: 600 }}>
                      🕐 {spot.hours}
                    </p>
                    
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${spot.lat},${spot.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <button className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>
                        🧭 Chỉ đường
                      </button>
                    </a>
                  </div>
                ))}
              </div>

              <div className="card" style={{ marginTop: '32px', textAlign: 'center' }}>
                <BunnyMascot mood="happy" size={100} />
                <h3 style={{ color: '#2D3748', marginTop: '16px' }}>Gợi ý của Thỏ Thở</h3>
                <p style={{ color: '#718096', maxWidth: '600px', margin: '12px auto 0', lineHeight: 1.6 }}>
                  Khi cảm thấy áp lực, hãy tìm một nơi yên tĩnh để thở và suy nghĩ. 
                  Đôi khi chỉ cần 30 phút ở một không gian mới cũng giúp tâm trạng tốt hơn rất nhiều! 🌸
                </p>
              </div>
            </div>
          )}

          {/* FORUM PAGE */}
          {currentPage === 'forum' && (
            <div>
              <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#2D3748' }}>
                💬 Forum ẩn danh
              </h2>

              <div className="card" style={{ marginBottom: '24px' }}>
                <h3 style={{ marginTop: 0, color: '#2D3748' }}>Tạo bài viết mới</h3>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#4A5568' }}>
                    Chủ đề
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  >
                    {Object.entries(forumCategories).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#4A5568' }}>
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập tiêu đề bài viết..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#4A5568' }}>
                    Nội dung
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Chia sẻ suy nghĩ của bạn... (Hoàn toàn ẩn danh)"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  />
                </div>
                <button
                  onClick={addForumPost}
                  className="btn btn-primary"
                  disabled={!newPost.title || !newPost.content}
                  style={{ opacity: (!newPost.title || !newPost.content) ? 0.5 : 1 }}
                >
                  Đăng bài
                </button>
              </div>

              <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setForumFilter('all')}
                  className={forumFilter === 'all' ? 'btn btn-primary' : 'btn'}
                  style={{ 
                    background: forumFilter === 'all' ? undefined : 'white',
                    color: forumFilter === 'all' ? undefined : '#4A5568',
                    border: forumFilter === 'all' ? undefined : '2px solid #E2E8F0'
                  }}
                >
                  Tất cả
                </button>
                {Object.entries(forumCategories).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setForumFilter(key)}
                    className={forumFilter === key ? 'btn btn-secondary' : 'btn'}
                    style={{ 
                      background: forumFilter === key ? undefined : 'white',
                      color: forumFilter === key ? undefined : '#4A5568',
                      border: forumFilter === key ? undefined : '2px solid #E2E8F0'
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gap: '16px' }}>
                {userData.forumPosts
                  .filter(post => forumFilter === 'all' || post.category === forumFilter)
                  .map(post => (
                    <div key={post.id} className="card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div style={{
                          padding: '4px 12px',
                          borderRadius: '8px',
                          background: 'rgba(184, 163, 232, 0.2)',
                          color: '#B8A3E8',
                          fontSize: '12px',
                          fontWeight: 600
                        }}>
                          {forumCategories[post.category]}
                        </div>
                        <div style={{ fontSize: '12px', color: '#A0AEC0' }}>
                          {new Date(post.timestamp).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                      <h4 style={{ margin: '0 0 12px', color: '#2D3748' }}>{post.title}</h4>
                      <p style={{ color: '#4A5568', lineHeight: 1.6, marginBottom: '12px' }}>{post.content}</p>
                      <div style={{ 
                        fontSize: '13px', 
                        color: '#93C5BD', 
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span>🐰</span>
                        <span>{post.author}</span>
                      </div>
                    </div>
                  ))}

                {userData.forumPosts.filter(post => forumFilter === 'all' || post.category === forumFilter).length === 0 && (
                  <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <BunnyMascot mood="calm" size={120} />
                    <p style={{ marginTop: '20px', color: '#718096' }}>
                      Chưa có bài viết nào. Hãy là người đầu tiên chia sẻ! 🌟
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* RESOURCES PAGE */}
          {currentPage === 'resources' && (
            <div>
              <h2 style={{ fontSize: '32px', marginBottom: '24px', color: '#2D3748' }}>
                📚 Thư viện tài nguyên
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {resources.map((resource, idx) => (
                  <div key={idx} className="card">
                    <div style={{ fontSize: '48px', marginBottom: '16px', textAlign: 'center' }}>
                      {resource.thumbnail}
                    </div>
                    <div style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      background: resource.type === 'video' ? 'rgba(147, 197, 189, 0.2)' :
                                 resource.type === 'article' ? 'rgba(184, 163, 232, 0.2)' :
                                 'rgba(255, 184, 209, 0.2)',
                      color: resource.type === 'video' ? '#93C5BD' :
                             resource.type === 'article' ? '#B8A3E8' :
                             '#FFB8D1',
                      fontSize: '12px',
                      fontWeight: 600,
                      marginBottom: '12px'
                    }}>
                      {resource.type === 'video' ? '🎥 Video' :
                       resource.type === 'article' ? '📄 Bài viết' :
                       '📞 Hotline'}
                    </div>
                    <h4 style={{ margin: '0 0 12px', color: '#2D3748' }}>{resource.title}</h4>
                    {resource.author && (
                      <p style={{ color: '#718096', fontSize: '14px', marginBottom: '8px' }}>
                        👤 {resource.author}
                      </p>
                    )}
                    {resource.duration && (
                      <p style={{ color: '#93C5BD', fontSize: '14px', fontWeight: 600 }}>
                        ⏱️ {resource.duration}
                      </p>
                    )}
                    {resource.readTime && (
                      <p style={{ color: '#B8A3E8', fontSize: '14px', fontWeight: 600 }}>
                        📖 {resource.readTime}
                      </p>
                    )}
                    {resource.phone && (
                      <>
                        <p style={{ color: '#FFB8D1', fontSize: '16px', fontWeight: 700, margin: '8px 0' }}>
                          {resource.phone}
                        </p>
                        <p style={{ color: '#718096', fontSize: '13px' }}>
                          🕐 {resource.hours}
                        </p>
                      </>
                    )}
                    <a href={resource.link} style={{ textDecoration: 'none' }}>
                      <button className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>
                        {resource.type === 'hotline' ? '📞 Gọi ngay' : '👀 Xem ngay'}
                      </button>
                    </a>
                  </div>
                ))}
              </div>

              <div className="card" style={{ marginTop: '32px' }}>
                <h3 style={{ marginTop: 0, color: '#2D3748' }}>🆘 Hỗ trợ khẩn cấp</h3>
                <div style={{ 
                  background: 'rgba(255, 107, 157, 0.1)', 
                  padding: '20px', 
                  borderRadius: '12px',
                  border: '2px solid rgba(255, 107, 157, 0.3)'
                }}>
                  <p style={{ color: '#4A5568', marginBottom: '16px', lineHeight: 1.6 }}>
                    Nếu bạn đang có suy nghĩ tự làm hại bản thân hoặc cần hỗ trợ tâm lý khẩn cấp:
                  </p>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    <a href="tel:1800599885" style={{ textDecoration: 'none' }}>
                      <div style={{ 
                        background: 'white', 
                        padding: '16px', 
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                      }}>
                        <div style={{ fontSize: '32px' }}>📞</div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#2D3748' }}>Tổng đài Sức khỏe Tâm thần</div>
                          <div style={{ color: '#FF6B9D', fontSize: '18px', fontWeight: 700 }}>1800 599 885</div>
                          <div style={{ color: '#718096', fontSize: '13px' }}>24/7 - Miễn phí</div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MATCHING PAGE */}
          {currentPage === 'matching' && (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                  <BunnyMascot mood="happy" size={100} />
                  <div>
                    <h2 style={{ margin: 0, fontSize: '28px', color: '#2D3748' }}>
                      🤝 Tìm bạn đồng hành
                    </h2>
                    <p style={{ margin: '8px 0 0', color: '#718096' }}>
                      Kết nối với những người cùng hoàn cảnh, cùng sở thích
                    </p>
                  </div>
                </div>

                {userData.matches.length === 0 ? (
                  <div>
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#4A5568' }}>
                        Bạn đang học lớp
                      </label>
                      <select
                        value={matchProfile.grade}
                        onChange={(e) => setMatchProfile({ ...matchProfile, grade: e.target.value })}
                      >
                        <option value="">Chọn khối</option>
                        <option value="10">Lớp 10</option>
                        <option value="11">Lớp 11</option>
                        <option value="12">Lớp 12</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#4A5568' }}>
                        Sở thích của bạn (chọn nhiều)
                      </label>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {interestOptions.map(interest => (
                          <button
                            key={interest}
                            onClick={() => {
                              const current = matchProfile.interests;
                              setMatchProfile({
                                ...matchProfile,
                                interests: current.includes(interest)
                                  ? current.filter(i => i !== interest)
                                  : [...current, interest]
                              });
                            }}
                            style={{
                              padding: '8px 16px',
                              borderRadius: '12px',
                              border: matchProfile.interests.includes(interest) ? '2px solid #93C5BD' : '2px solid #E2E8F0',
                              background: matchProfile.interests.includes(interest) ? 'rgba(147, 197, 189, 0.2)' : 'white',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '14px'
                            }}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#4A5568' }}>
                        Mức độ stress hiện tại
                      </label>
                      <select
                        value={matchProfile.stressLevel}
                        onChange={(e) => setMatchProfile({ ...matchProfile, stressLevel: e.target.value })}
                      >
                        <option value="">Chọn mức độ</option>
                        <option value="low">Thấp</option>
                        <option value="medium">Trung bình</option>
                        <option value="high">Cao</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#4A5568' }}>
                        Hoạt động giảm stress yêu thích
                      </label>
                      <select
                        value={matchProfile.preferredActivity}
                        onChange={(e) => setMatchProfile({ ...matchProfile, preferredActivity: e.target.value })}
                      >
                        <option value="">Chọn hoạt động</option>
                        <option value="talk">Trò chuyện, tâm sự</option>
                        <option value="activity">Hoạt động ngoài trời</option>
                        <option value="creative">Sáng tạo (vẽ, nhạc...)</option>
                        <option value="study">Học cùng nhau</option>
                      </select>
                    </div>

                    <button
                      onClick={findMatches}
                      disabled={!matchProfile.grade || matchProfile.interests.length === 0 || !matchProfile.stressLevel}
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        padding: '16px',
                        fontSize: '16px',
                        opacity: (!matchProfile.grade || matchProfile.interests.length === 0 || !matchProfile.stressLevel) ? 0.5 : 1
                      }}
                    >
                      🔍 Tìm bạn đồng hành
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 style={{ color: '#2D3748', marginBottom: '20px' }}>
                      Tìm thấy {userData.matches.length} người phù hợp với bạn!
                    </h3>
                    <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                      {userData.matches.map(match => (
                        <div key={match.id} className="card" style={{ background: 'rgba(147, 197, 189, 0.05)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div style={{ flex: 1 }}>
                              <h4 style={{ margin: '0 0 8px', color: '#2D3748' }}>
                                🐰 {match.name}
                              </h4>
                              <div style={{ color: '#718096', fontSize: '14px', marginBottom: '8px' }}>
                                📚 Lớp {match.grade}
                              </div>
                              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {match.interests.map(interest => (
                                  <span key={interest} style={{
                                    padding: '4px 10px',
                                    borderRadius: '8px',
                                    background: 'rgba(184, 163, 232, 0.2)',
                                    color: '#B8A3E8',
                                    fontSize: '12px',
                                    fontWeight: 600
                                  }}>
                                    {interest}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                              <div style={{ 
                                fontSize: '32px', 
                                fontWeight: 700, 
                                color: '#93C5BD',
                                marginBottom: '4px'
                              }}>
                                {match.match}%
                              </div>
                              <div style={{ fontSize: '11px', color: '#718096' }}>phù hợp</div>
                            </div>
                          </div>
                          <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                            💬 Nhắn tin
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setUserData(prev => ({ ...prev, matches: [] }))}
                      className="btn btn-secondary"
                      style={{ width: '100%' }}
                    >
                      🔄 Tìm lại
                    </button>
                  </div>
                )}
              </div>

              <div className="card" style={{ marginTop: '24px', textAlign: 'center' }}>
                <h3 style={{ color: '#2D3748' }}>💡 Lưu ý về an toàn</h3>
                <p style={{ color: '#718096', lineHeight: 1.6, margin: '12px 0 0' }}>
                  Hãy giữ an toàn khi kết nối với người lạ. Không chia sẻ thông tin cá nhân nhạy cảm.
                  Nếu cảm thấy không thoải mái, hãy báo cáo cho quản trị viên.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '60px',
          padding: '32px',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          border: '2px solid rgba(147, 197, 189, 0.2)'
        }}>
          <BunnyMascot mood="happy" size={80} />
          <p style={{ marginTop: '16px', color: '#718096', fontSize: '14px' }}>
            © 2024 Thở - Breathe Teen | Website hỗ trợ sức khỏe tinh thần học sinh THPT
          </p>
          <p style={{ color: '#93C5BD', fontSize: '13px', marginTop: '8px' }}>
            "Chậm lại không sao, quan trọng là đừng dừng hẳn"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThoWebsite;
