let isLogin = true;
let token = "";

function showAuth(){
    landing.classList.add("hidden");
    auth.classList.remove("hidden");
}

function toggleAuth(){
    isLogin = !isLogin;
    authTitle.innerText = isLogin ? "Login" : "Signup";
}

async function submitAuth(){
    const url = isLogin ? "login" : "signup";

    const res = await fetch("http://localhost:5000/auth/"+url,{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify({
            username:username.value,
            password:password.value
        })
    });

    const data = await res.json();

    if(data.token){
        token = data.token;
        auth.classList.add("hidden");
        dashboard.classList.remove("hidden");
    } else {
        alert(data.msg || "Error");
    }
}

function logout(){
    location.reload();
}

async function upload(){
    let file = document.getElementById("file").files[0];
    let formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/upload",{
        method:"POST",
        headers:{ Authorization: "Bearer " + token },
        body:formData
    });

    const data = await res.json();

    result.innerHTML = `
        <h3>${data.result}</h3>
        <p>${data.ai_probability}% AI</p>
        <p>${data.reason}</p>
    `;
}