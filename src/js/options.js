export default (width) => {
  const cols = 16;
  const rows = 16;
  const size = width / rows;
  const playersNo = 2;
  const laddersNo = 3;
  const diceMin = 1;
  const diceMax = 6;

  return {
    cols,
    rows,
    size,
    playersNo,
    laddersNo,
    diceMin,
    diceMax,
  };
};
