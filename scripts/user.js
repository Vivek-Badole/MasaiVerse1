document.getElementById("submit").addEventListener("click",formSubmit);

async function formSubmit(){
   try {
    let formData = {
        name : form.elements[0].value,
        age : form.elements[1].value,
        place : form.elements[2].value,
        batch_name : form.elements[3].value,
        profession : form.elements[4].value,
    }
    console.log(formData);
    formData = JSON.stringify(formData);
    let res = await fetch("https://masaiverse123321.herokuapp.com/users",{
        method:"POST",
        body : formData,
        headers : {
            "Content-Type" : "application/json"
        }
    })

    let data = await res.json();
    alert("successfully registered");
} catch (error) {
    console.log(error);
}
}

