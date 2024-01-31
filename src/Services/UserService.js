const apiUrl = "http://localhost:3001"; // Update the API URL

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Server returned ${response.status}: ${errorText}`);
    throw new Error("Unexpected response from the server");
  }
  return response.json();
};

const getUsers = async () => {
  try {
    const response = await fetch(`${apiUrl}/users`);
    return handleResponse(response);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error
  }
};

const checkUserCredentials = async (username, password) => {
  const users = await getUsers();
  return users.some(
    (user) => user.username === username && user.password === password
  );
};

const checkUserExists = async (username) => {
  const users = await getUsers();
  return users.some((user) => user.username === username);
};

const addUser = async (username, password) => {
  try {
    const response = await fetch(`${apiUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Error adding user:", error);
    throw error; // Rethrow the error
  }
};

const loginUser = async (username, password) => {
  try {
    const users = await getUsers();

    if (!username || !password) {
      return "Username and password cannot be empty.";
    }

    const userExists = users.some((user) => user.username === username);

    if (!userExists) {
      return "User does not exist. Please sign up.";
    }

    const credentialsValid = users.some(
      (user) => user.username === username && user.password === password
    );

    if (credentialsValid) {
      sessionStorage.setItem("loggedInUser", username);
      return null; // No error
    } else {
      return "Incorrect password. Please try again.";
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Rethrow the error
  }
};

export { checkUserCredentials, addUser, checkUserExists, loginUser };
