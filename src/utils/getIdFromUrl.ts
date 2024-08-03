const getIdFromUrl = (url: string, position: number): number => {
  const urlParts = url.split("/");
  const id = urlParts[position];
  const parsedId = parseInt(id);
  if (Number.isNaN(parsedId)) {
    console.error("ID is not a number");
  }
  return parsedId;
};

export default getIdFromUrl;
