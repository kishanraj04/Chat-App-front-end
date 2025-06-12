export const customMenuHandler = (e, setAxis) => {
  setAxis(prev => ({
    xaxis: e.clientX,
    yaxis: e.clientY + 20,
    flag: !prev.flag, 
  }));
};
