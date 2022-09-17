import getDatas from "../scripts/getData.js";

let gloabalArr = [];

//FETCHING DATA
let data = await getDatas("https://masaiverse123321.herokuapp.com/users");
gloabalArr = [...data];


//DISPLAY DATA
let display = document.getElementById("content");
const displayData = (data) => {
  display.innerHTML = "";
  data.map((el) => {
    let div = document.createElement("div");
    div.setAttribute("class", "card");

    let img = document.createElement("img");
    img.src =
      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";

    let name = document.createElement("h4");
    name.setAttribute("class", "name");
    name.innerHTML = `Name : ${el.name}`;

    let age = document.createElement("p");
    age.setAttribute("class", "age");
    age.innerHTML = `Age : ${el.age}`;

    let place = document.createElement("p");
    place.setAttribute("class", "place");
    place.innerHTML = `Place : ${el.place}`;

    let batch_name = document.createElement("p");
    batch_name.setAttribute("class", "batch");
    batch_name.innerHTML = `BatchName : ${el.batch_name}`;

    let profession = document.createElement("p");
    profession.setAttribute("class", "prof");
    profession.innerHTML = `Profession : ${el.profession}`;

    let edit = document.createElement("p");
    edit.className = "edit";
    edit.innerHTML = `<i class="fa fa-edit" style="font-size:24px"></i>`;
    edit.addEventListener("click", function () {
      editUser(el);
    });

    let delete_user = document.createElement("p");
    delete_user.className = "delete";
    delete_user.innerHTML = `<i class="fa fa-trash-o" style="font-size:24px"></i>`;
    delete_user.addEventListener("click", function () {
      deleteUser(el.id);
    });

    let div2 = document.createElement("div");
    div2.className = "ED";
    div2.append(edit, delete_user);

    div.append(img, name, age, place, batch_name, profession, div2);

    display.append(div);
  });
};

displayData(data);

//DELETE FUNCTIONALITY
async function deleteUser(id) {
  let res = await fetch(`https://masaiverse123321.herokuapp.com/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      replace: true,
    },
  });

  let data = await getDatas("https://masaiverse123321.herokuapp.com/users");
  displayData(data);
}

//EDIT FUNCTIONALITY

let batchName = ["WEB-13", "WEB-14", "WEB-15"];

let profession = ["FSD", "Fronted", "Backend", "Student"];

function editUser(el) {
 
  let span = document.getElementsByClassName("close")[0];

  span.onclick = function () {
    editDiv.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == editDiv) {
      editDiv.style.display = "none";
    }
  };

  let editDiv = document.getElementById("editsec");
  editDiv.style.display = "block";

  let editSection = document.getElementById("edit-modal");
  editSection.innerHTML = "";

  let name = document.createElement("input");
  name.setAttribute("type", "text");
  name.setAttribute("placeholder", "Enter Name");
  name.value = el.name;

  let age = document.createElement("input");
  age.setAttribute("type", "text");
  age.setAttribute("placeholder", "Enter Age");
  age.value = el.age;

  let place = document.createElement("input");
  place.setAttribute("type", "text");
  place.setAttribute("placeholder", "Enter Place");
  place.value = el.place;

  let select = document.createElement("select");

  batchName.map((e) => {
    if (e == el.batch_name) {
      select.innerHTML += `<option selected value=${e}>${e}</option>`;
    } else {
      select.innerHTML += `<option value=${e}>${e}</option>`;
    }
  });
  select.append(batchName);

  let select2 = document.createElement("select");
  profession.map((e) => {
    if (e == el.profession) {
      select2.innerHTML += `<option selected value=${e}>${e}</option>`;
    } else {
      select2.innerHTML += `<option value=${e}>${e}</option>`;
    }
  });

  select2.append(profession);

  let btn = document.createElement("button");
  btn.innerHTML = "Submit";
  btn.addEventListener("click", () => {
    let modalObject = {
      name: name.value,
      age: age.value,
      place: place.value,
      batch_name: select.value,
      profession: select2.value,
    };
    modalObject = JSON.stringify(modalObject);

    fetch(`https://masaiverse123321.herokuapp.com/users/${el.id}`, {
      method: "PATCH",
      body: modalObject,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      editDiv.style.display = "none";
      getData();
    });
  });

  editSection.append(name, age, place, select, select2, btn);
}

//FILTER BY CATEGORY FUNCTIONALITY
let filterValue = document.getElementById("filter");

const filterByBatch = () => {
  let slcFilterValue = filterValue.value;
  // console.log(slcFilterValue);
  let filterList = gloabalArr.filter((elem) => {
    return elem.batch_name == slcFilterValue;
  });
  //   gloabalArr = [...filterList];

  displayData(filterList);
};
filterValue.addEventListener("change", filterByBatch);

//SORT BY SALARY FUNCTIONALITY
let sortValue = document.getElementById("sort");

let sortData;
const sortByAge = () => {
  let sortSalaryValue = sortValue.value;
  // console.log(sort);

  if (sortSalaryValue == "asc") {
    sortData = gloabalArr.sort((a, b) => a.age - b.age);
  } else if (sortSalaryValue == "desc") {
    sortData = gloabalArr.sort((a, b) => b.age - a.age);
  }
  gloabalArr = [...sortData];
  displayData(sortData);
};
sortValue.addEventListener("change", sortByAge);

//SEARCH FUNCTIONALITY

let searchValue = document.getElementById("input_search");

const searchName = () => {
  let searchVal = searchValue.value.toUpperCase();
  let searchResult = gloabalArr.filter(
    (el) => el.name.toUpperCase().indexOf(searchVal) > -1
  );
  displayData(searchResult);
};
document.getElementById("input_search").addEventListener("keyup", searchName);
