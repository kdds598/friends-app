import React, { useState } from 'react';
import styles from '../Styles/Request.module.css';
import { useFetchselfRecievedFrQuery, useAcceptRequestMutation, useRejectRequestMutation } from '../../Store/UserApi';
import { useFetchselfsentFrQuery } from '../../Store/UserApi.js';
import Loading from './Loading.jsx' 
const Requests = () => {
  const [selected, setSelected] = useState('recieved'); 

  // Fetch received friend requests
  const { data: receivedData = { user: { recievedFriendRequests: [] } }, isLoading: receivedLoading } = useFetchselfRecievedFrQuery();

  // Fetch sent friend requests
  const { data: sentData = { user: { sentFriendRequests: [] } }, isLoading: sentLoading } = useFetchselfsentFrQuery();

  const [acceptReq, { isLoading: acceptLoading }] = useAcceptRequestMutation();
  const [rejectReq, { isLoading: rejectLoading }] = useRejectRequestMutation();

  // Handle accepting or rejecting friend requests
  async function handleResponse(id, accept) {
    if (accept) {
      await acceptReq({ senderId: id });
    } else {
      await rejectReq({ friendId: id });
    }
  }

  // Display loading text if data is still loading
//   if (receivedLoading || sentLoading) {
//     return <div>Loading...</div>;
//   }

  return (
    <>
      <div className={styles.toggleContainer}>
        <button
          onClick={() => setSelected('sent')}
          className={selected === 'sent' ? styles.activeButton : styles.tabbutton}
        >
          Sent
        </button>
        <button
          onClick={() => setSelected('recieved')}
          className={selected === 'recieved' ? styles.activeButton : styles.tabbutton}
        >
          Received
        </button>
      </div>

      <div className={styles.container}>
        {selected === 'recieved' ? (
          <div>
            <h2>Received Friend Requests</h2>
            {receivedLoading ? (
              <div style={{justifySelf:"center"}}><Loading></Loading>
</div>
            ) : (
              receivedData.user.recievedFriendRequests?.length > 0 ? (
                <ul className={styles.list}>
                  {receivedData.user.recievedFriendRequests.map((request) => (
                    <li key={request._id} className={styles.item}>
                      <span>{request.username}</span>
                      <div>
                        <button
                          className={styles.acceptButton}
                          onClick={() => handleResponse(request._id, true)}
                        >
                          {acceptLoading ? 'Accepting...' : 'Accept'}
                        </button>
                        <button
                          className={styles.rejectButton}
                          onClick={() => handleResponse(request._id, false)}
                        >
                          {rejectLoading ? 'Rejecting...' : 'Reject'}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No new friend requests.</p>
              )
            )}
          </div>
        ) : (
          <div>
            <h2>Sent Friend Requests</h2>
            {sentLoading ? (
              <div style={{justifySelf:"center"}}><Loading></Loading>
</div>
            ) : sentData.user.sentFriendRequests?.length > 0 ? (
              <ul className={styles.list}>
                {sentData.user.sentFriendRequests.map((request) => (
                  <li key={request._id} className={styles.item}>
                    <span>{request.username}</span>
                    <span className={styles.status}>Status: Pending</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No sent requests.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Requests;
