const apiUrl = "http://localhost:3001";

const getPhotos = async () => {
  const response = await fetch(`${apiUrl}/pictures`);
  return response.json();
};

export { getPhotos };
