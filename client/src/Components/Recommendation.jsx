
import React from 'react';
import styles from '../Styles/Recommendation.module.css';
import { useGetRecommendedUsersQuery, useSendFriendRequestMutation } from '../../Store/UserApi.js';
import Loading from './Loading.jsx';
const Recommendation = () => {
  const { data = { recommendations: [], success: false }, isLoading, error } = useGetRecommendedUsersQuery();
  const [sendfrreq, { data: frsr = { message: "" }, isLoading: frLoading, isError: isfrsent, isSuccess: frs }] = useSendFriendRequestMutation();

  const sendfr = async (id) => {
    try {
      const data = await sendfrreq(id);
      alert(data.data.message);
    } catch (error) {
    }
  };

  if (isLoading) return <p style={{justifySelf:"center"}}><Loading></Loading>
</p>;

  if (data.recommendations.length === 0) {
    return <div className={styles.noRecommendations}>No recommendations currently</div>;
  }

  return (
    <div className={styles.container}>
      {data.recommendations?.map((user) => (
        <div key={user.userId} className={styles.userCard}>
            <div>
            <p style={{textAlign:"left"}}>{user.username}</p>
            <p>mutual connections:{user.mutualFriendsCount}</p>
            </div>
         
          <button onClick={() => sendfr(user.userId)}>Add friend</button>
        </div>
      ))}
    </div>
  );
};

export default Recommendation;
