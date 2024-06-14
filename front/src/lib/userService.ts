export const fetchUser = async (phoneNumber: string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/user/phone/${phoneNumber}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Failed to fetch user ID: ${err}`);
  }
};

export const fetchUserById = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:8080/user/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Failed to fetch user ID: ${err}`);
  }
};
