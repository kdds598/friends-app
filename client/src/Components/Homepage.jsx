
import React, { useState } from 'react';
import {
  useFetchUsersQuery,
  useFetchselFriendsQuery,
  useUnfriendUserMutation,
  useSendFriendRequestMutation,
  useSearchUsersQuery,
} from '../../Store/UserApi.js';
import styles from '../Styles/Homepage.module.css';
import Loading from './Loading.jsx';


const HomePage = () => {
  const { data: users = [], isLoading: fetchUsersLoading } = useFetchUsersQuery();
  const { data: friends = [], isLoading: fetchFriendsLoading } = useFetchselFriendsQuery();
  const [unfriendUser] = useUnfriendUserMutation();
  const [sendFriendRequest] = useSendFriendRequestMutation();
  const [searchUsers, setSearchUsers] = useState('');
  const { data: searchResults = [], isLoading: searchLoading } = useSearchUsersQuery(searchUsers, {
    skip: searchUsers === '',
  });

  const [selected, setSelected] = useState('friends');

  const handleUnfriend = (friendId) => {
    unfriendUser(friendId);
  };

  const handleSendRequest = (userId) => {
    sendFriendRequest(userId);
  };

  const handleSearchChange = (e) => {
    setSearchUsers(e.target.value);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Friends App</h1>
      </header>

      <div className={styles.toggleContainer}>
        <button
          onClick={() => setSelected('friends')}
          className={selected === 'friends' ? styles.activeButton : styles.tabbutton}
        >
          Friends
        </button>
        <button
          onClick={() => setSelected('suggested')}
          className={selected === 'suggested' ? styles.activeButton : styles.tabbutton}
        >
          Suggested Users
        </button>
      </div>

      <div className={styles.content}>
        {selected === 'friends' ? (
          <section className={styles.friendsSection}>
            <h2>Your Friends</h2>
            {fetchFriendsLoading ? (
              <div style={{ justifySelf: 'center' }}><Loading></Loading>
</div>
            ) : friends.length === 0 ? (
              <div style={{ justifySelf: 'center' }}>You don't have any friends</div>
            ) : (
              <div className={styles.friendsList}>
                {friends.map((friend) => (
                  <div key={friend._id} className={styles.friendCard}>
                    <p>{friend.username}</p>
                    <button
                      onClick={() => handleUnfriend(friend._id)}
                      className={styles.unfriendButton}
                    >
                      Unfriend
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : (
          <section className={styles.usersSection}>
            <input
              type="text"
              placeholder="Search users..."
              value={searchUsers}
              onChange={handleSearchChange}
              className={styles.searchBar}
            />
            <h2>Suggested Users</h2>
            <div className={styles.usersList}>
              {searchLoading ? (
                <div style={{ justifySelf: 'center' }}><Loading></Loading>
</div>
              ) : searchUsers ? 
              
              (
                searchResults.length > 0 ? (
                  searchResults.map((user) => (
                    <div key={user._id} className={styles.userCard}>
                      <p>{user.username}</p>
                      <button
                        onClick={() => handleSendRequest(user._id)}
                        className={styles.addFriendButton}
                      >
                        Add Friend
                      </button>
                    </div>
                  ))
                ) : (
                  <div style={{ alignSelf: 'center' }}>No users found</div>
                )
              ) : fetchUsersLoading ? (
                <div style={{ justifySelf: 'center' }}><Loading></Loading>
</div>
              ) : (
                users.map((user) => (
                  <div key={user._id} className={styles.userCard}>
                    <p>{user.username}</p>
                    <button
                      onClick={() => handleSendRequest(user._id)}
                      className={styles.addFriendButton}
                    >
                      Add Friend
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default HomePage;
