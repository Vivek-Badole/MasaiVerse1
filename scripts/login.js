document.getElementById("submit").addEventListener("click", loginForm);
let login_gif = false;
let gifShow = document.getElementById("gif_img");
async function loginForm() {
  try {
    let loginData = {
      email: form.elements[0].value,
      password: form.elements[1].value,
    };
    let loginDataJson = JSON.stringify(loginData);
    login_gif = true;
    if (login_gif == true) {
      gifShow.src = "/loading.gif";
    }
    let res = await fetch("https://reqres.in/api/login", {
      method: "POST",
      body: loginDataJson,
      headers: {
        "Content-Type": "application/json",
      },
    });
    gifShow.src = "";
    let data = await res.json();
    if (data.token) {
      alert("login successfully");
      window.location.href = "/admin.html";
    } else if (data.error) {
      alert(data.error);
    }
  } catch (error) {
    console.log(error);
  }
}
