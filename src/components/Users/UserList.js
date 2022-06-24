import React from "react";
import { environment } from "../../environment";
import Auth from "../../services/Auth";

function UserList() {
  const [users, setUsers] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const fetchUsers = () => {
    setLoading(true);
    setError(null);
    setUsers(null);
    const auth = new Auth(environment.API_URL);

    if (!auth.isLoggedIn()) {
      setLoading(false);
      setError("Not logged in");
      return;
    }

    fetch(environment.API_URL + "users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.getToken(),
      },
    })
      .then((res) => res.json())
      .then((users) => {
        if (users.error) {
          setError(users.error);
        } else {
          setUsers(users);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
