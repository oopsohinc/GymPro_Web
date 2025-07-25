// Dữ liệu giả lập cho hệ thống quản lý phòng tập
const mockData = {
    members: [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            membership: "Premium",
            startDate: "2025-01-01",
            status: "Active",
            phone: "+1-555-0123",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            membership: "Basic",
            startDate: "2024-12-15",
            status: "Active",
            phone: "+1-555-0124",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b0d5f0e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 3,
            name: "Mike Johnson",
            email: "mike@example.com",
            membership: "Student",
            startDate: "2025-01-10",
            status: "Active",
            phone: "+1-555-0125",
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }
    ],
    trainers: [
        {
            id: 1,
            name: "Sarah Wilson",
            email: "sarah@gymfitness.com",
            specialty: "Yoga",
            assignedClasses: 4,
            rating: "4.8",
            activeClients: 25,
            avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400"
        },
        {
            id: 2,
            name: "David Brown",
            email: "david@gymfitness.com",
            specialty: "HIIT",
            assignedClasses: 3,
            rating: "4.9",
            activeClients: 30,
            avatar: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400"
        }
    ],
    classes: [
        {
            id: 1,
            name: "Morning Yoga",
            day: "Monday",
            time: "08:00",
            trainerId: 1,
            trainerName: "Sarah Wilson",
            capacity: 20,
            enrolled: 15,
            status: "Active"
        },
        {
            id: 2,
            name: "HIIT Training",
            day: "Wednesday",
            time: "18:00",
            trainerId: 2,
            trainerName: "David Brown",
            capacity: 25,
            enrolled: 20,
            status: "Active"
        },
        {
            id: 3,
            name: "Evening Yoga",
            day: "Friday",
            time: "19:00",
            trainerId: 1,
            trainerName: "Sarah Wilson",
            capacity: 15,
            enrolled: 12,
            status: "Active"
        }
    ],
    payments: [
        {
            id: 1,
            memberId: 1,
            memberName: "John Doe",
            amount: "100.00",
            dueDate: "2025-02-01",
            status: "Paid",
            paymentDate: "2025-01-15",
            memberAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 2,
            memberId: 2,
            memberName: "Jane Smith",
            amount: "80.00",
            dueDate: "2025-01-20",
            status: "Pending",
            paymentDate: null,
            memberAvatar: "https://images.unsplash.com/photo-1494790108755-2616b0d5f0e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            id: 3,
            memberId: 3,
            memberName: "Mike Johnson",
            amount: "60.00",
            dueDate: "2025-01-05",
            status: "Overdue",
            paymentDate: null,
            memberAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }
    ]
};

// Navigation functions
function showPage(pageId) {
    // Ẩn tất cả các trang
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });

    // Hiển thị trang được chọn
    document.getElementById(`${pageId}-page`).classList.remove('hidden');

    // Xóa trạng thái active khỏi tất cả các liên kết trong header
    document.querySelectorAll('.desktop-nav a').forEach(link => {
        link.classList.remove('nav-link-active');
    });

    // Thêm trạng thái active vào liên kết được chọn
    document.querySelector(`.desktop-nav a[onclick="showPage('${pageId}')"]`).classList.add('nav-link-active');
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('show');
}

function toggleMobileMenu(show) {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');

    if (show) {
        menu.classList.remove('hidden');
        overlay.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
        overlay.classList.add('hidden');
    }
}
// Khi bấm nút menu (menu icon)
document.getElementById('menu-button').addEventListener('click', () => toggleMobileMenu(true));
// Khi bấm nút close (x icon)
document.getElementById('close-menu-button').addEventListener('click', () => toggleMobileMenu(false));
// Khi bấm ra ngoài menu
document.getElementById('mobile-menu-overlay').addEventListener('click', () => toggleMobileMenu(false));

// Modal functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
}

function showAddMemberModal() {
    showModal('add-member-modal');
}

function showAddTrainerModal() {
    showModal('add-trainer-modal');
}

function showAddClassModal() {
    // Điền thông tin huấn luyện viên
    const trainerSelect = document.querySelector('#add-class-form select[name="trainerId"]');
    trainerSelect.innerHTML = '<option value="">Select trainer</option>';
    mockData.trainers.forEach(trainer => {
        const option = document.createElement('option');
        option.value = trainer.id;
        option.textContent = trainer.name;
        trainerSelect.appendChild(option);
    });
    
    showModal('add-class-modal');
}

function showAddPaymentModal() {
    // Điền thông tin hội viên
    const memberSelect = document.querySelector('#add-payment-form select[name="memberId"]');
    memberSelect.innerHTML = '<option value="">Select member</option>';
    mockData.members.forEach(member => {
        const option = document.createElement('option');
        option.value = member.id;
        option.textContent = member.name;
        memberSelect.appendChild(option);
    });
    
    showModal('add-payment-modal');
}

// Fetch stats from the backend API
document.addEventListener("DOMContentLoaded", () => {
  const port = 3000; 
  const statsUrl = `http://localhost:${port}/api/stats`;

  fetch(statsUrl)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    })
    .then((data) => {
      const totalMembers = data.totalMembers;
      console.log("Số lượng thành viên:", totalMembers);

      const totalMembersElement = document.getElementById("total-members");
      if (totalMembersElement) {
        totalMembersElement.textContent = totalMembers;
      } else {
        console.warn("Không tìm thấy phần tử có id='total-members'");
      }
    })
    .catch((err) => {
      console.error("Error loading stats:", err);
    });
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', function () {
  window.location.href = "/Login.html";
});
// Data loading functions
function loadMembersTable() {
    const tbody = document.getElementById('members-table');
    tbody.innerHTML = '';
    
    mockData.members.forEach(member => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="flex items-center">
                    <img src="${member.avatar}" alt="${member.name}" class="w-10 h-10 rounded-full mr-3">
                    <div>
                        <div class="font-medium text-gray-900">${member.name}</div>
                        <div class="text-sm text-gray-500">${member.email}</div>
                    </div>
                </div>
            </td>
            <td><span class="badge badge-${member.membership === 'Premium' ? 'success' : 'warning'}">${member.membership}</span></td>
            <td><span class="badge badge-success">${member.status}</span></td>
            <td>${member.startDate}</td>
            <td>
                <button class="btn-secondary mr-2" onclick="showWIP(${member.id})">Edit</button>
                <button class="btn-secondary onclick="showWIP(${member.id})">Delete</button>
                
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Hiển thị thông báo
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        background-color: ${type === 'success' ? '#10B981' : '#EF4444'};
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showWIP(id) {
    showNotification('Feature coming soon');
}

function loadTrainersGrid() {
    const grid = document.getElementById('trainers-grid');
    grid.innerHTML = '';
    
    mockData.trainers.forEach(trainer => {
        const card = document.createElement('div');
        card.className = 'card p-6';
        card.innerHTML = `
            <div class="flex items-center mb-4">
                <img src="${trainer.avatar}" alt="${trainer.name}" class="w-16 h-16 rounded-full mr-4">
                <div>
                    <h3 class="text-lg font-semibold text-gray-900">${trainer.name}</h3>
                    <p class="text-sm text-gray-500">${trainer.specialty}</p>
                </div>
            </div>
            <div class="space-y-2">
                <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Rating</span>
                    <span class="text-sm font-medium">${trainer.rating}/5</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Active Clients</span>
                    <span class="text-sm font-medium">${trainer.activeClients}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Assigned Classes</span>
                    <span class="text-sm font-medium">${trainer.assignedClasses}</span>
                </div>
            </div>
            <div class="mt-4 flex space-x-2">
                <button class="btn-secondary flex-1">Edit</button>
                <button class="btn-secondary flex-1">Delete</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function loadScheduleTable() {
    const tbody = document.getElementById('schedule-table');
    tbody.innerHTML = '';
    
    mockData.classes.forEach(cls => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="font-medium text-gray-900">${cls.name}</td>
            <td>${cls.day}</td>
            <td>${cls.time}</td>
            <td>${cls.trainerName}</td>
            <td>${cls.enrolled}/${cls.capacity}</td>
            <td><span class="badge badge-success">${cls.status}</span></td>
            <td>
                <button class="btn-secondary mr-2">Edit</button>
                <button class="btn-secondary">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadPaymentsTable() {
    const tbody = document.getElementById('payments-table');
    tbody.innerHTML = '';
    
    mockData.payments.forEach(payment => {
        const row = document.createElement('tr');
        const statusBadge = payment.status === 'Paid' ? 'badge-success' : 
                           payment.status === 'Pending' ? 'badge-warning' : 'badge-error';
        row.innerHTML = `
            <td>
                <div class="flex items-center">
                    <img src="${payment.memberAvatar}" alt="${payment.memberName}" class="w-10 h-10 rounded-full mr-3">
                    <div class="font-medium text-gray-900">${payment.memberName}</div>
                </div>
            </td>
            <td class="font-medium">$${payment.amount}</td>
            <td>${payment.dueDate}</td>
            <td><span class="badge ${statusBadge}">${payment.status}</span></td>
            <td>${payment.paymentDate || '-'}</td>
            <td>
                <button class="btn-secondary mr-2">Edit</button>
                <button class="btn-secondary">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Xử lý gửi form
function setupFormHandlers() {
    document.getElementById('add-member-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newMember = {
            id: mockData.members.length + 1,
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            membership: formData.get('membership'),
            startDate: formData.get('startDate'),
            status: 'Active',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        };
        mockData.members.push(newMember);
        loadMembersTable();
        hideModal('add-member-modal');
        e.target.reset();
        alert('Member added successfully!');
    });

    document.getElementById('add-trainer-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTrainer = {
            id: mockData.trainers.length + 1,
            name: formData.get('name'),
            email: formData.get('email'),
            specialty: formData.get('specialty'),
            assignedClasses: 0,
            rating: '0.0',
            activeClients: 0,
            avatar: 'https://images.unsplash.com/photo-1567515004624-219c11d31f2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400'
        };
        mockData.trainers.push(newTrainer);
        loadTrainersGrid();
        hideModal('add-trainer-modal');
        e.target.reset();
        alert('Trainer added successfully!');
    });

    document.getElementById('add-class-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const trainerId = parseInt(formData.get('trainerId'));
        const trainer = mockData.trainers.find(t => t.id === trainerId);
        const newClass = {
            id: mockData.classes.length + 1,
            name: formData.get('name'),
            day: formData.get('day'),
            time: formData.get('time'),
            trainerId: trainerId,
            trainerName: trainer.name,
            capacity: parseInt(formData.get('capacity')),
            enrolled: 0,
            status: 'Active'
        };
        mockData.classes.push(newClass);
        loadScheduleTable();
        hideModal('add-class-modal');
        e.target.reset();
        alert('Class scheduled successfully!');
    });

    document.getElementById('add-payment-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const memberId = parseInt(formData.get('memberId'));
        const member = mockData.members.find(m => m.id === memberId);
        const newPayment = {
            id: mockData.payments.length + 1,
            memberId: memberId,
            memberName: member.name,
            amount: formData.get('amount'),
            dueDate: formData.get('dueDate'),
            status: formData.get('status'),
            paymentDate: formData.get('status') === 'Paid' ? new Date().toISOString().split('T')[0] : null,
            memberAvatar: member.avatar
        };
        mockData.payments.push(newPayment);
        loadPaymentsTable();
        hideModal('add-payment-modal');
        e.target.reset();
        alert('Payment recorded successfully!');
    });
}

// Đóng modal khi bấm ra ngoài
function setupModalClosing() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });
}

// Khởi tạo ứng dụng
function initializeApp() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Setup event handlers
    setupFormHandlers();
    setupModalClosing();
    
    // Load initial data
    // loadMembersTable();
    loadStats();
    loadMemberships();
}

async function loadStats() {
    try {
        const response = await fetch("http://localhost:3000/api/stats");
        if (!response.ok) throw new Error("Failed to fetch stats");

        const data = await response.json();

        // Cập nhật giao diện
        const memberCountElement = document.getElementById("totalMembersCount");
        if (memberCountElement) {
            memberCountElement.textContent = data.totalMembers;
        }

    } catch (error) {
        console.error("Error loading stats:", error);
    }
}

async function loadMemberships() {
    try {
        const res = await fetch("http://localhost:3000/api/memberships");
        const memberships = await res.json();
    
        const table = document.getElementById("membership-table");
        table.innerHTML = "";
    
        memberships.forEach(m => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${m.name}</td>
                <td>${m.price}đ</td>
                <td>${m.duration} ngày</td>
                <td>
                    <button class="btn-secondary mr-2 text-blue-600 hover:underline">Edit</button>
                    <button class="btn-secondary mr-2 text-red-600 hover:underline ml-2">Delete</button>
                </td>
            `;
            table.appendChild(row);
        });
        
    } catch (error) {
        console.error("Error loading memberships:", error);
        return;
    }
}

function showAddMembershipModal() {
    document.getElementById("addMembershipModal").classList.remove("hidden");
}
function closeAddMembershipModal() {
    document.getElementById("addMembershipModal").classList.add("hidden");
}

document.getElementById("addMembershipForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("membershipName").value;
    const price = document.getElementById("membershipPrice").value;
    const duration = document.getElementById("membershipDuration").value;

    try {
        const res = await fetch("http://localhost:3000/api/memberships", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price, duration })
        });

        const result = await res.json();
        if (result.success) {
            closeAddMembershipModal();
            loadMemberships();
        } else {
            alert("Failed to add membership");
        }
    } catch (err) {
        console.error("Error adding membership:", err);
    }
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

// 