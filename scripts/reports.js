import getDatas from "../scripts/getData.js";

let gloabalArr = [];

//FETCHING DATA
let data = await getDatas("https://masaiverse123321.herokuapp.com/users");
gloabalArr = [...data];

let tbody = document.getElementById("tbody");
const displayData = (gloabalArr) => {
  tbody.innerHTML = "";
  let tr_row = document.createElement("tr");

  let total = document.createElement("td");
  total.innerHTML = gloabalArr.length;

  let filterList = gloabalArr.filter((elem) => {
    return elem.profession == "Student";
  });

  let student = document.createElement("td");
  student.innerHTML = filterList.length;

  let filterLists = gloabalArr.filter((elem) => {
    return (
      elem.profession == "FSD" ||
      elem.profession == "Backend" ||
      elem.profession == "Fronted"
    );
  });

  let profession = document.createElement("td");
  profession.innerHTML = filterLists.length;

  tr_row.append(total, student, profession);

  tbody.append(tr_row);
};

displayData(gloabalArr);
