import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUser(data[0]);
      });
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Profile Screen</h2>
      <p><strong>User ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default Profile;
