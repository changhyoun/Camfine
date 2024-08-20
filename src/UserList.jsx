import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const userSnapshot = await getDocs(usersCollection);
                const userList = userSnapshot.docs.map(doc => doc.data());
                setUsers(userList);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Registered Users</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <p>Email: {user.email}</p>
                        <p>Nickname: {user.nickname}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
