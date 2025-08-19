
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
    showModal('add-user-modal');
    document.getElementById('add-user-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const newClass = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        try {
            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newClass)
            });

            if (!res.ok) {
                throw showNotification('Failed to add user', 'error');
            }

            const data = await res.json();
            showNotification(data.message, 'success');
            loadMembersTable();
            hideModal('add-user-modal');
            showModal('add-member-modal');
            e.target.reset();
        } catch (error) {
            
        }
    });
}

function closeAddMemberModal() {
    hideModal('add-user-modal');
    hideModal('add-member-modal');
}

// Xử lý sự kiện khi thêm thành viên
// document.getElementById("add-member-form").addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const name = document.getElementById("membershipName").value;
//     const price = document.getElementById("membershipPrice").value;
//     const duration = document.getElementById("membershipDuration").value;

//     try {
//         const res = await fetch("http://localhost:3000/api/memberships", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ name, price, duration })
//         });

//         const result = await res.json();
//         if (result.success) {
//             showNotification(`Thêm gói tập ${name} thành công`);
//             closeAddMembershipModal();
//             loadMemberships();
//         } else {
//             alert("Failed to add membership");
//         }
//     } catch (err) {
//         console.error("Error adding membership:", err);
//         alert(err.message || "An error occurred while adding membership");
//     }
// });

function showAddTrainerModal() {
    showModal('add-trainer-modal');
}

function showEditTrainerModal(trainer) {
    showModal('edit-trainer-modal');
}

async function showAddClassModal() {
    const trainerSelect = document.querySelector('#add-class-form datalist#trainers');
    trainerSelect.innerHTML = '<option value="">Select trainer</option>';
    const levelSelect = document.querySelector('#add-class-form datalist#levels');
    levelSelect.innerHTML = '<option value="">Select level</option>';

    try {
        const trainerRes = await fetch('http://localhost:3000/api/trainers');
        const levelRes = await fetch('http://localhost:3000/api/classes/levels');
        if (!trainerRes.ok) throw new Error('Không thể lấy danh sách');
        if (!levelRes.ok) throw new Error('Không thể lấy danh sách cấp độ');

        const data = await trainerRes.json();
        const levels = await levelRes.json();

        data.forEach(trainer => {
            const option = document.createElement('option');
            option.value = trainer.trainer_id;
            option.textContent = trainer.full_name;
            trainerSelect.appendChild(option);
        });

        levels.forEach(level => {
            const option = document.createElement('option');
            option.value = level.level_id;
            option.textContent = level.level_name;
            levelSelect.appendChild(option);
        });

        showModal('add-class-modal');
    } catch (error) {
        console.error('Lỗi khi tải danh sách huấn luyện viên:', error);
        showNotification('Không thể tải danh sách huấn luyện viên', 'error');
    }
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
// document.addEventListener("DOMContentLoaded", () => {
//     const port = 3000;
//     const statsUrl = `http://localhost:${port}/api/stats`;

//     fetch(statsUrl)
//         .then((res) => {
//             if (!res.ok) throw new Error("Failed to fetch stats");
//             return res.json();
//         })
//         .then((data) => {
//             const totalMembers = data.totalMembers;
//             // console.log("Số lượng thành viên:", totalMembers);

//             const totalMembersElement = document.getElementById("total-members");
//             if (totalMembersElement) {
//                 totalMembersElement.textContent = totalMembers;
//             } else {
//                 console.warn("Không tìm thấy phần tử có id='total-members'");
//             }

//             // const totalTrainers = data.totalTrainers;
//             const activeTrainers = data.activeTrainers;
//             // const inactiveTrainers = data.inactiveTrainers;
//             console.log("Số lượng huấn luyện viên:", activeTrainers);

//             const activeTrainersElement = document.getElementById("active-trainers");
//             if (activeTrainersElement) {
//                 activeTrainersElement.textContent = activeTrainers;
//             } else {
//                 console.warn("Không tìm thấy phần tử có id='active-trainers'");
//             }
//         })
//         .catch((err) => {
//             console.error("Error loading stats:", err);
//         });
// });

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', function () {
    window.location.href = "/Login.html";
});

// Hiển thị thông báo
// Tạo container nếu chưa có
function ensureNotificationContainer() {
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 1000;
        `;
        document.body.appendChild(container);
    }
    return container;
}

function showNotification(message, type = 'success') {
    const container = ensureNotificationContainer();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        padding: 12px 24px;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        background-color: ${type === 'success' ? '#10B981' : '#EF4444'};
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        opacity: 0;
        animation: slideIn 0.5s ease-out forwards;
    `;

    container.appendChild(notification);

    // Sau 2.5s, bắt đầu hiệu ứng trượt ra
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-in forwards';
    }, 2500);

    // Sau 3s, xóa phần tử
    setTimeout(() => {
        notification.remove();
    }, 3000);
}


// Thêm animation vào CSS
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

function showWIP(id) {
    showNotification('Feature coming soon');
}

// function loadTrainersGrid() {
//     const grid = document.getElementById('trainers-grid');
//     grid.innerHTML = '';

//     mockData.trainers.forEach(trainer => {
//         const card = document.createElement('div');
//         card.className = 'card p-6';
//         card.innerHTML = `
//             <div class="flex items-center mb-4">
//                 <img src="${trainer.avatar}" alt="${trainer.name}" class="w-16 h-16 rounded-full mr-4">
//                 <div>
//                     <h3 class="text-lg font-semibold text-gray-900">${trainer.name}</h3>
//                     <p class="text-sm text-gray-500">${trainer.specialty}</p>
//                 </div>
//             </div>
//             <div class="space-y-2">
//                 <div class="flex justify-between">
//                     <span class="text-sm text-gray-600">Rating</span>
//                     <span class="text-sm font-medium">${trainer.rating}/5</span>
//                 </div>
//                 <div class="flex justify-between">
//                     <span class="text-sm text-gray-600">Active Clients</span>
//                     <span class="text-sm font-medium">${trainer.activeClients}</span>
//                 </div>
//                 <div class="flex justify-between">
//                     <span class="text-sm text-gray-600">Assigned Classes</span>
//                     <span class="text-sm font-medium">${trainer.assignedClasses}</span>
//                 </div>
//             </div>
//             <div class="mt-4 flex space-x-2">
//                 <button class="btn-secondary flex-1">Edit</button>
//                 <button class="btn-secondary flex-1">Delete</button>
//             </div>
//         `;
//         grid.appendChild(card);
//     });
// }

// function loadScheduleTable() {
//     const tbody = document.getElementById('schedule-table');
//     tbody.innerHTML = '';

//     mockData.classes.forEach(cls => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td class="font-medium text-gray-900">${cls.name}</td>
//             <td>${cls.day}</td>
//             <td>${cls.time}</td>
//             <td>${cls.trainerName}</td>
//             <td>${cls.enrolled}/${cls.capacity}</td>
//             <td><span class="badge badge-success">${cls.status}</span></td>
//             <td>
//                 <button class="btn-secondary mr-2">Edit</button>
//                 <button class="btn-secondary">Delete</button>
//             </td>
//         `;
//         tbody.appendChild(row);
//     });
// }

// Xử lý gửi form
function setupFormHandlers() {
    
    document.getElementById('add-member-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const newClass = {
            full_name: formData.get('full_name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            date_of_birth: formData.get('date_of_birth'),
            description: formData.get('description')
        };

        try {
            const res = await fetch("http://localhost:3000/api/members", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newClass)
            });

            if (!res.ok) {
                throw showNotification('Failed to add member', 'error');
            }

            const data = await res.json();
            showNotification(data.message, 'success');
            loadMembersTable();
            hideModal('add-member-modal');
            e.target.reset();
        } catch (error) {
            console.error('Error adding member:', error);
            alert('Error adding member');
        }
    });

    document.getElementById('edit-member-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const memberId = this.getAttribute('data-member-id');
        const formData = new FormData(e.target);
        const updatedMember = {};

        for (const [key, value] of formData.entries()) {
            if (value.trim() !== '') {
                if (key === 'date_of_birth') {
                    if (!isValidDateFormat(value)) {
                        showNotification('Invalid date format. Please use YYYY-MM-DD.', 'error');
                        return;
                    }
                    updatedMember[key] = parseDateToISO(value.trim());
                } else {
                    updatedMember[key] = value.trim();
                }
            }
            console.log(`Key: ${key}, Value: ${value}`);
        }
        if (Object.keys(updatedMember).length === 0) {
            showNotification('No changes made to update.', 'error');
            return;
        }
        console.log('Updated Member Data:', updatedMember);
        try {
            const res = await fetch(`http://localhost:3000/api/members/${memberId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedMember)
            });

            if (!res.ok) {
                throw showNotification('Failed to update member', 'error');
            }

            const data = await res.json();
            showNotification(data.message, 'success');
            loadMembersTable();
            hideModal('edit-member-modal');
            e.target.reset();
        } catch (error) {
            console.error('Error updating member:', error);
            alert('Error updating member');
        }
    });

    document.getElementById('add-trainer-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        // const formData = new FormData(e.target);

        // const newTrainer = {
        //     name: formData.get('name'),
        //     specialty: formData.get('specialty')
        // };

        const full_name = document.getElementById("trainerName").value;
        const specialization = document.getElementById("trainerSpecialty").value;

        try {
            const res = await fetch("http://localhost:3000/api/trainers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ full_name, specialization })
            });

            if (!res.ok) {
                throw new Error('Failed to add trainer');
            }

            const data = await res.json();
            showNotification(data.message, 'success');
            loadTrainers();
            hideModal('add-trainer-modal');
            e.target.reset();
        } catch (error) {
            console.error('Error adding trainer:', error);
            alert('Error adding trainer');
        }
    });

    document.getElementById('edit-trainer-form').addEventListener('submit', async function (e) {
        e.preventDefault();

        const trainerId = this.getAttribute('data-trainer-id');
        const full_name = document.getElementById("editTrainerName").value.trim();
        const specialization = document.getElementById("editTrainerSpecialty").value.trim();

        try {
            const res = await fetch(`http://localhost:3000/api/trainers/${trainerId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ full_name, specialization })
            });

            if (!res.ok) {
                throw new Error('Failed to update trainer');
            }

            const data = await res.json();
            showNotification(data.message, 'success');
            loadTrainers();
            hideModal('edit-trainer-modal');
            e.target.reset();
        } catch (error) {
            console.error('Error updating trainer:', error);
            alert('Error updating trainer');
        }
    });

    document.getElementById('add-class-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const rawTime = formData.get('time'); // "05:00"
        const [hours, minutes] = rawTime.split(':').map(Number);
        console.log('Raw Time:', rawTime);
        const utcDate = new Date(Date.UTC(1970, 0, 1, hours, minutes, 0));
        console.log('Base Date:', utcDate);
        const formattedTime = utcDate.toISOString();


        const newClass = {
            name: formData.get('name'),
            schedule: formData.get('day'),
            time: formattedTime,
            trainer_id: parseInt(formData.get('trainerId')),
            level_id: parseInt(formData.get('levelId')),
            max_capacity: parseInt(formData.get('capacity'))
        };
        console.log('Form Data:', typeof newClass.time, newClass.time);
        console.log(newClass);
        try {
            const response = await fetch('http://localhost:3000/api/classes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newClass)
            });

            if (!response.ok) throw new Error('Không thể tạo lớp học');

            const data = await response.json();
            showNotification(data.message, 'success');
            loadScheduleTable();
            hideModal('add-class-modal');
            e.target.reset();
        } catch (error) {
            console.error('Lỗi khi tạo lớp học:', error);
            showNotification('Đã xảy ra lỗi khi tạo lớp học. Vui lòng thử lại.', 'error');
        }
    });

    document.getElementById('edit-class-form').addEventListener('submit', async function (e) {
        e.preventDefault();

        const classId = this.getAttribute('data-class-id');
        const formData = new FormData(e.target);
        const updateData = {};

        for (const [key, value] of formData.entries()) {
            if (value.trim() !== '') {
                updateData[key] = value;
            }
            console.log(`Key: ${key}, Value: ${value}`);
        }

        // Nếu không có gì để cập nhật
        if (Object.keys(updateData).length === 0) {
            showNotification('Không có thay đổi nào để cập nhật', 'warning');
            return;
        }
        console.log('Update Data:', updateData);
        try {
            const response = await fetch(`http://localhost:3000/api/classes/${classId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) throw new Error('Không thể cập nhật lớp học');

            const data = await response.json();
            showNotification(data.message, 'success');
            loadScheduleTable();
            hideModal('edit-class-modal');
            e.target.reset();
        } catch (error) {
            console.error('Lỗi khi cập nhật lớp học:', error);
            showNotification('Đã xảy ra lỗi khi cập nhật lớp học. Vui lòng thử lại.', 'error');
        }
    });

    document.getElementById('add-payment-form').addEventListener('submit', function (e) {
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

    document.getElementById("addMembershipForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("membershipName").value;
        const price = document.getElementById("membershipPrice").value;
        const duration = document.getElementById("membershipDuration").value;

        try {
            const res = await fetch(`http://localhost:3000/api/memberships/${membershipId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, price, duration })
            });

            const result = await res.json();
            if (result.success) {
                showNotification(`Thêm gói tập ${name} thành công`);
                closeAddMembershipModal();
                loadMemberships();
            } else {
                alert("Failed to add membership");
            }
        } catch (err) {
            console.error("Error adding membership:", err);
            alert(err.message || "An error occurred while adding membership");
        }
    });

    document.getElementById("editMembershipForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const membershipId = this.getAttribute('data-membership-id');
        const name = document.getElementById("editMembershipName").value;
        const price = document.getElementById("editMembershipPrice").value;
        const duration = document.getElementById("editMembershipDuration").value;
        console.log(`Updating membership ${membershipId} with name: ${name}, price: ${price}, duration: ${duration}`);

        try {
            const res = await fetch(`http://localhost:3000/api/memberships/${membershipId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, price, duration })
            });

            const result = await res.json();
            if (result.success) {
                showNotification(`Cập nhật gói tập ${name} thành công`);
                hideModal('editMembershipModal');
                loadMemberships();
            } else {
                alert("Failed to update membership");
            }
        } catch (err) {
            console.error("Error updating membership:", err);
            alert(err.message || "An error occurred while updating membership");
        }
    });

}

// Đóng modal khi bấm ra ngoài
function setupModalClosing() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function (e) {
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
    loadMembersTable();
    loadStats();
    loadMemberships();
    loadTrainers();
    loadScheduleTable();
    loadPaymentsTable();
}

async function loadStats() {
    try {
        const response = await fetch("http://localhost:3000/api/stats");
        if (!response.ok) throw new Error("Failed to fetch stats");

        const data = await response.json();

        // Số lượng thành viên
        const memberCountElement = document.getElementById("total-members");
        if (memberCountElement) {
            memberCountElement.textContent = data.totalMembers;
        }

        // Số lượng huấn luyện viên
        const activeTrainersElement = document.getElementById("active-trainers");
        if (activeTrainersElement) {
            activeTrainersElement.textContent = data.activeTrainers;
        }

        // Số lượng lớp học
        const classCountElement = document.getElementById("total-classes");
        if (classCountElement) {
            classCountElement.textContent = data.totalClasses;
        }

        // Số lượng gói tập
        const membershipCountElement = document.getElementById("total-memberships");
        if (membershipCountElement) {
            membershipCountElement.textContent = data.totalMemberships;
        }

    } catch (error) {
        console.error("Error loading stats:", error);
    }
}

// Load memberships
async function deleteMembership(membershipId) {
    if (!confirm("Bạn có chắc chắn muốn xóa gói tập này?")) return;

    try {
        const res = await fetch(`http://localhost:3000/api/memberships/${membershipId}`, {
            method: 'DELETE'
        });

        if (!res.ok) throw new Error('Failed to delete membership');

        const data = await res.json();
        showNotification(data.message, 'success');
        loadMemberships();
    } catch (error) {
        console.error('Error deleting membership:', error);
    }
}

function editMembership(membershipId) {
    try {
        const form = document.getElementById('editMembershipForm');
        form.setAttribute('data-membership-id', membershipId);

        showModal('editMembershipModal');
    } catch (error) {
        console.error('Error updating membership:', error);
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
                <td>${m.price.toLocaleString('vi-VN')}₫</td>
                <td>${m.duration} ngày</td>
                <td>
                    <button class="btn-secondary mr-2 text-blue-600 hover:underline" onclick="editMembership(${m.membership_id})">Edit</button>
                    <button class="btn-secondary text-red-600 hover:underline" onclick="deleteMembership(${m.membership_id})">Delete</button>
                </td>
            `;
            table.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading memberships:", error);
        return;
    }
}

// Load trainers
async function toggleTrainerStatus(trainerId, currentStatus) {
    console.log(`Toggling status for trainer ${trainerId} from ${currentStatus}`);
    const newStatus = !currentStatus;

    try {
        const res = await fetch(`http://localhost:3000/api/trainers/${trainerId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        });

        if (!res.ok) throw new Error('Failed to update trainer status');

        const data = await res.json();
        showNotification(data.message, 'success');
        loadTrainers();
    } catch (error) {
        console.error('Error toggling trainer status:', error);
    }
}

async function deleteTrainer(trainerId) {
    if (!confirm("Bạn có chắc chắn muốn xóa huấn luyện viên này?")) return;

    try {
        const res = await fetch(`http://localhost:3000/api/trainers/${trainerId}`, {
            method: 'DELETE'
        });

        if (!res.ok) throw new Error('Failed to delete trainer');

        const data = await res.json();
        showNotification(data.message, 'success');
        loadTrainers();
    } catch (error) {
        console.error('Error deleting trainer:', error);
    }
}

function editTrainer(trainerId) {
    try {
        const form = document.getElementById('edit-trainer-form');
        form.setAttribute('data-trainer-id', trainerId);

        showModal('edit-trainer-modal');
    } catch (error) {
        console.error('Error updating trainer:', error);
    }
}

async function loadTrainers() {
    try {
        const res = await fetch('http://localhost:3000/api/trainers');
        const trainers = await res.json();

        const trainerContainer = document.getElementById('trainers-grid');
        trainerContainer.innerHTML = '';

        trainers.forEach(trainer => {
            const avatarUrl = 'https://apiaampsicologiamilano.it/wp-content/uploads/2023/07/test-team5.jpg';
            const card = document.createElement('div');
            card.classList.add('trainer-card');
            card.className = 'card p-6';
            card.innerHTML = `
                <div class="flex items-center mb-4">
                <img src="${avatarUrl}" alt="${trainer.full_name}" class="w-16 h-16 rounded-full mr-4">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900">${trainer.full_name}</h3>
                        <p class="text-sm text-gray-500">${trainer.specialization}</p>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">Trạng thái:</span>
                        <span class="${trainer.status === true ? 'text-green-600' : 'text-red-600'}">
                            ${trainer.status === true ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                        </span> 
                    </div>
                </div>
                <div class="mt-4 flex space-x-2">
                    <button class="btn-secondary flex-1 text-blue-600 hover:underline" onclick="editTrainer(${trainer.trainer_id})">Edit</button>
                    <button class="btn-secondary flex-1 text-red-600 hover:underline" onclick="deleteTrainer(${trainer.trainer_id})">Delete</button>
                    <button class="btn-secondary flex-1 ${trainer.status === true ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-green-50 text-green-700 hover:bg-green-100'}" 
                        onclick="toggleTrainerStatus(${trainer.trainer_id}, ${trainer.status})">
                        ${trainer.status === true ? 'Deactivate' : 'Activate'}
                    </button>
                </div>
            `;
            trainerContainer.appendChild(card);
        });
    } catch (err) {
        console.error("Error loading trainers:", err);
    }
}

// Load members
function isValidDateFormat(dateString) {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(dateString)) return false;

    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(`${year}-${month}-${day}`);

    return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        date.getDate() === day
    );
}
function parseDateToISO(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`).toISOString();
}

function editMember(memberId) {
    try {
        const form = document.getElementById('edit-member-form');
        form.setAttribute('data-member-id', memberId);

        showModal('edit-member-modal');
    } catch (error) {
        console.error('Error updating membership:', error);
    }
}
async function deleteMember(memberId) {
    if (!confirm("Bạn có chắc chắn muốn xóa thành viên này?")) return;

    try {
        const res = await fetch(`http://localhost:3000/api/members/${memberId}`, {
            method: "DELETE"
        });

        const result = await res.json();
        if (result.success) {
            showNotification(`Xóa thành viên thành công`);
            loadMembersTable();
        } else {
            alert("Failed to delete member");
        }
    } catch (err) {
        console.error("Error deleting member:", err);
        alert(err.message || "An error occurred while deleting member");
    }
}

async function loadMembersTable() {
    try {
        const res = await fetch("http://localhost:3000/api/members/memberships");
        const members = await res.json();
        console.log(members);

        const tbody = document.getElementById('members-table');
        const avatarUrl = 'https://tinyurl.com/bdzz4yjw';
        tbody.innerHTML = '';

        members.forEach(member => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="flex items-center">
                        <img src="${avatarUrl}" alt="${member.full_name}" class="w-10 h-10 rounded-full mr-3">
                        <div class="tooltip">
                            <div class="tooltip-text font-medium text-gray-900">${member.full_name}</div>
                            <div class="text-sm text-gray-500">${member.email}</div>
                            <div class="text-sm text-gray-500">${member.phone}</div>
                            <div class="tooltip-description">${member.description || 'No description available'}</div>
                        </div>
                    </div>
                </td>
                <td><span class="badge badge-${member.membership === 'No Membership' ? 'warning' : 'success'}">${member.membership}</span></td>
                <td>${formatDateUTC(member.date_created)}</td>
                <td>${formatDateUTC(member.date_of_birth)}</td>
                <td>
                    <button class="btn-secondary text-blue-600 hover:underline mr-2" onclick="editMember(${member.id})">Edit</button>
                    <button class="btn-secondary text-red-600 hover:underline" onclick="deleteMember(${member.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (err) {
        console.error("Error loading members:", err);
    }
}

// Load schedule
function formatTime(timeString) {
    if (!timeString) return 'N/A';

    try {
        const date = new Date(timeString);
        // Extract hours and minutes
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    } catch (error) {
        // Fallback for other formats
        if (typeof timeString === 'string' && timeString.includes(':')) {
            return timeString.substring(0, 5);
        }
        return 'N/A';
    }
}
function getBadgeClass(level) {
    switch (level.toLowerCase()) {
        case 'basic': return 'warning';
        case 'standard': return 'warning';
        case 'premium': return 'success';
        case 'vip': return 'success';
        case 'elite': return 'primary';
        default: return 'dark';
    }
}

async function deleteClass(classId) {
    if (!confirm("Bạn có chắc chắn muốn xóa lớp học này?")) return;

    try {
        const res = await fetch(`http://localhost:3000/api/classes/${classId}`, {
            method: "DELETE"
        });

        const result = await res.json();
        if (result.success) {
            showNotification(`Xóa lớp học thành công`);
            loadScheduleTable();
        } else {
            alert("Failed to delete class");
        }
    } catch (err) {
        console.error("Error deleting class:", err);
        alert(err.message || "An error occurred while deleting class");
    }
}

function editClass(classId) {
    try {
        const form = document.getElementById('edit-class-form');
        form.setAttribute('data-class-id', classId);

        showModal('edit-class-modal');
    } catch (err) {
        console.error("Error editing class:", err);
    }
}

async function loadScheduleTable() {
    try {
        const res = await fetch("http://localhost:3000/api/classes");
        const classes = await res.json();

        const tbody = document.getElementById('schedule-table');
        tbody.innerHTML = '';

        classes.forEach(classItem => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="tooltip">
                    <span class="tooltip-text">${classItem.name || 'N/A'}</span>
                    <span class="tooltip-description">${classItem.description || 'N/A'}</span>
                </td>
                <td>${classItem.schedule || 'N/A'}</td>
                <td>${formatTime(classItem.time)}</td>
                <td>${classItem.full_name || 'N/A'}</td>
                <td>${classItem.capacity || '0'}/${classItem.max_capacity || '0'}</td>
                <td><span class="badge badge-pill badge-${getBadgeClass(classItem.level_name)}">${classItem.level_name || 'N/A'}</span></td>
                <td>
                    <button class="btn-secondary text-blue-600 hover:underline mr-2" onclick="editClass(${classItem.class_id})">Edit</button>
                    <button class="btn-secondary text-red-600 hover:underline" onclick="deleteClass(${classItem.class_id})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (err) {
        console.error("Error loading classes:", err);
    }
}

// Load payment
function formatDateUTC(isoString) {
  if (!isoString) return '—'; // xử lý giá trị null hoặc undefined

  const date = new Date(isoString);
  if (isNaN(date)) return 'Invalid Date';

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
}


async function loadPaymentsTable() {
    try {
        const res = await fetch("http://localhost:3000/api/payments");
        const payments = await res.json();
        console.log(payments);
        const tbody = document.getElementById('payments-table');
        tbody.innerHTML = '';

        payments.forEach(payment => {
            const row = document.createElement('tr');
            // const formattedDate = formatDateUTC(payment.payment_date);
            // const statusBadge = payment.status === 'Paid' ? 'badge-success' :
            //     payment.status === 'Pending' ? 'badge-warning' : 'badge-error';
            row.innerHTML = `
                <td>
                    <div class="flex items-center">
                        <div class="font-medium text-gray-900">${payment.full_name}</div>
                    </div>
                </td>
                <td class="font-medium">${payment.amount.toLocaleString('vi-VN')}₫</td>
                <td>${payment.dueDate}</td>
                <td>
                    <span class="${payment.payment_status === true ? 'badge badge-success' : 'badge badge-error'}">
                        ${payment.payment_status === true ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </span>
                </td>
                <td>${payment.payment_date || '-'}</td>
                <td>
                    <button class="btn-secondary mr-2">Edit</button>
                    <button class="btn-secondary">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (err) {
        console.error("Error loading payments:", err);
    }
}

function showAddMembershipModal() {
    document.getElementById("addMembershipModal").classList.remove("hidden");
}
function closeAddMembershipModal() {
    document.getElementById("addMembershipModal").classList.add("hidden");
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

// 