export const customMenuHandler = (e, setAxis,isSearchUser) => {
  setAxis(prev => ({
    xaxis: isSearchUser?e.clientX-190:e.clientX-120,
    yaxis: e.clientY + 30,
    flag: !prev.flag, 
  }));
};
