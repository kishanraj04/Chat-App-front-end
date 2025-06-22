export const customMenuHandler = (e, setAxis, choice) => {
  e.preventDefault();
  e.stopPropagation();
  console.log(choice);

  if (choice === "file") {
    setAxis({
      xaxis: e.clientX - 10,
      yaxis: e.clientY - 150,
      flag:true
    });
  } else {
    setAxis({
      xaxis: choice ? e.clientX - 190 : e.clientX - 120,
      yaxis: e.clientY + 30,
      flag: true,
    });
  }
};
