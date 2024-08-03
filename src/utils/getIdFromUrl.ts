const getIdFromUrl = (url: string, position: number): number => {
  const urlParts = url.split("/");
  console.log("🚀 - urlParts:", urlParts);
  const id = urlParts[position];
  console.log("🚀 - id:", id);
  const parsedId = parseInt(id);
  if (Number.isNaN(parsedId)) {
    console.error("ID is not a number");
  }
  return parsedId;
};

export default getIdFromUrl;
