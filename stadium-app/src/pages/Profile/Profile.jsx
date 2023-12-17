import Header from '../../components/Header/Header';
import Footer from '../../components/FooterBar/FooterBar';
import QRCode from '../../components/QRCode/QRCodeCard';
import Rating from '@mui/material/Rating';
import Text from '@mui/material/Typography';
import { translate } from '../../lib/utils/translator';
import './Profile.scss';
import { useState, useEffect } from 'react';
import { getUserProfile } from '../../lib/api/user';
import LoadingSpinner from '../../components/Loading/LoadingPage'; 

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await getUserProfile(userId);
        const userProfile = res.data;
        setProfile(userProfile);
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const renderSportsRatings = () => {
    console.log(profile);
    if (!profile) return null;

    const sports = Object.keys(profile).filter(key => key !== 'age' && profile[key] !== 0 && typeof(profile[key]) !== 'string');
    return sports.map(sport => (
      <div key={sport}>
        <Text component="span">{translate(sport)}</Text>
        <Rating name={sport} value={profile[sport]} readOnly size="small" />
        <br />
      </div>
    ));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;
  if (!profile) return <p>No profile data</p>;

  return (
    <div>
      <Header title="我的資訊" />
      <div className="info-container">
        <QRCode />
        <div className='data-column'>
          <Text>姓名: {profile.name}</Text>
          <Text>性別: {profile.gender}</Text>
          <Text>信箱: {profile.email}</Text>
          <Text>年紀: {profile.age}</Text>
          <Text>擅長運動: {renderSportsRatings()}</Text>
          <Text>自我介紹: {profile.introduction}</Text>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
