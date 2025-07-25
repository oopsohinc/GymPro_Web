// function login() {
//   const role = document.getElementById("role").value;
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   if (username === "" || password === "") {
//     alert("Vui lòng nhập đầy đủ thông tin!");
//     return;
//   }



function showTab(tabId) {
  document.getElementById('owner-tab').classList.add('hidden');
  document.getElementById('member-tab').classList.add('hidden');
  document.getElementById(tabId + '-tab').classList.remove('hidden');

  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add('active');
}

function toggleRegister(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định
  const registerSection = document.getElementById('register-section');
  const overlay = document.getElementById('overlay');

  if (registerSection.classList.contains('hidden')) {
    registerSection.classList.remove('hidden');
    overlay.classList.remove('hidden'); // Hiển thị overlay
  } else {
    registerSection.classList.add('hidden');
    overlay.classList.add('hidden'); // Ẩn overlay
  }
}

function closeRegister() {
  const registerSection = document.getElementById('register-section');
  const overlay = document.getElementById('overlay');

  registerSection.classList.add('hidden'); // Ẩn form đăng ký
  overlay.classList.add('hidden'); // Ẩn overlay
}

async function checkServerStatus() {
        try {
            const res = await fetch("http://localhost:3000/api/login", {
                method: "OPTIONS" // Gửi yêu cầu kiểm tra server
            });
            return res.ok; // Trả về true nếu server hoạt động
        } catch (error) {
            return false; // Trả về false nếu không kết nối được
        }
    }

    // async function login(username, password) {
    //     const serverRunning = await checkServerStatus();
    //     if (!serverRunning) {
    //         alert("Server chưa được khởi động. Vui lòng khởi động server trước khi đăng nhập.");
    //         return;
    //     }

    //     try {
    //         const res = await fetch("http://localhost:3000/api/login", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ username, password })
    //         });

    //         const data = await res.json();

    //         if (data.success) {
    //             if (data.role === "chuphong") {
    //                 window.location.href = "html/index.html";
    //             } else if (data.role === "member") {
    //                 window.location.href = "member.html";
    //             }
    //         } else {
    //             alert(data.message || "Sai tài khoản hoặc mật khẩu");
    //         }
    //     } catch (error) {
    //         console.error("Error during login:", error);
    //         alert("Có lỗi xảy ra. Vui lòng thử lại.");
    //     }
    // }

    // document.getElementById("owner-tab").addEventListener("submit", async function (e) {
    //     e.preventDefault();
    //     const username = document.getElementById("username").value;
    //     const password = document.getElementById("password").value;
    //     await login(username, password);
    // });

    async function login(username, password) {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const usernameError = document.getElementById("username-error");
    const passwordError = document.getElementById("password-error");

    // Reset lỗi
    usernameInput.classList.remove("error");
    passwordInput.classList.remove("error");
    usernameError.style.display = "none";
    passwordError.style.display = "none";

    const serverRunning = await checkServerStatus();
    if (!serverRunning) {
        passwordError.textContent = "Server chưa được khởi động.";
        passwordInput.classList.add("error");
        passwordError.style.display = "block";
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (data.success) {
            if (data.role === "chuphong") {
                window.location.href = "html/index.html";
            } else if (data.role === "member") {
                window.location.href = "member.html";
            }
        } else {
            passwordInput.classList.add("error");
            passwordError.textContent = data.message || "Sai tài khoản hoặc mật khẩu";
            passwordError.style.display = "block";
        }
    } catch (error) {
        passwordInput.classList.add("error");
        passwordError.textContent = "Có lỗi xảy ra. Vui lòng thử lại.";
        passwordError.style.display = "block";
        console.error("Error during login:", error);
    }
  }
document.getElementById("owner-tab").addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    await login(username, password);
});
