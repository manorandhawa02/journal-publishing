import API from "./api";

// get published
export const getPublishedPapers = async () => {
  const res = await API.get("/published");
  return res.data;
};

// publish paper
export const publishPaper = async (
  id,
  publishData
) => {
  const res = await API.post(
    `/published/publish/${id}`,
    publishData
  );

  return res.data;
};