// function login() {
//   const role = document.getElementById("role").value;
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   if (username === "" || password === "") {
//     alert("Vui lòng nhập đầy đủ thông tin!");
//     return;
//   }

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
}

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
// Hàm xử lý đăng ký 
function handleRegister() {
    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value.trim();

    if (!username || !password) {
        document.getElementById('register-message').textContent = "Vui lòng nhập đầy đủ thông tin.";
        document.getElementById('register-message').style.display = "block";
        return;
    }

    // Hiển thị bảng thông báo thành công
    document.getElementById('register-success-modal').style.display = "flex";
}

function closeRegisterSuccess() {
    document.getElementById('register-success-modal').style.display = "none";
    document.getElementById('register-section').classList.add('hidden');
    document.getElementById('member-tab').classList.remove('hidden');
    // Ẩn overlay nếu có
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.classList.add('hidden');
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

async function loginMember(username, password) {
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
            if (data.role === "member") {
                window.location.href = `Member/index.html?id=${data.id}`;
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

async function loginOwner(username, password) {
    const usernameInput = document.getElementById("usernameMember");
    const passwordInput = document.getElementById("passwordMember");
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

async function registerUser(username, password) {
    const usernameInput = document.getElementById("registerUsername");
    const passwordInput = document.getElementById("registerPassword");
    const registerMessage = document.getElementById("register-message");

    // Reset lỗi
    usernameInput.classList.remove("error");
    passwordInput.classList.remove("error");
    registerMessage.style.display = "none";

    const serverRunning = await checkServerStatus();
    if (!serverRunning) {
        registerMessage.textContent = "Server chưa được khởi động.";
        registerMessage.style.display = "block";
        return;
    }

    try {
        const res = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (data.success) {
            showModal('register-success-modal');
            hideModal('register-modal');
            handleRegister();
        } else {
            registerMessage.textContent = data.message || "Đăng ký không thành công";
            registerMessage.style.display = "block";
        }
    } catch (error) {
        registerMessage.textContent = "Có lỗi xảy ra. Vui lòng thử lại.";
        registerMessage.style.display = "block";
        console.error("Error during registration:", error);
    }
}

document.getElementById("owner-tab").addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    await loginOwner(username, password);
});

document.getElementById("member-tab").addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = document.getElementById("usernameMember").value;
    const password = document.getElementById("passwordMember").value;
    await loginMember(username, password);
});

document.getElementById("register-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    await registerUser(username, password);
});

// document.addEventListener("DOMContentLoaded", function () {
//     // Initialize tooltips or any other JavaScript here
//     lucide.createIcons();

//     document.getElementById("username").textContent = " ";
//     document.getElementById("password").textContent = " ";
//     document.getElementById("usernameMember").textContent = " ";
//     document.getElementById("passwordMember").textContent = " ";
//     document.getElementById("registerUsername").textContent = " ";
//     document.getElementById("registerPassword").textContent = " ";
// });
