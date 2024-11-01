export const utcDate = () => {
  return new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "UTC",
    })
  );
};
