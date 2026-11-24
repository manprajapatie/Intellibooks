export const reviewContract = async (apiRequest, contractId) => {
  const response = await apiRequest({
    method: "POST",
    url: `/contracts/${contractId}/review`,
  });

  return response.data;
};