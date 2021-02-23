
export const removeTheSameModel = (arrays: any[], id: string) => {
  return arrays.filter(k => k._id !== id);
};
