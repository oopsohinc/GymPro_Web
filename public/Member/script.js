// GymPro Static Web Application JavaScript

// Mock Data - In a real application, this would come from an API
const mockData = {

};

// State Management
let currentPage = 'dashboard';
let filteredClasses = mockData.classes;
let selectedClass = null;
let selectedMembership = null;

// Utility Functions
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function showLoading() {
    $('#loading-spinner').classList.remove('hidden');
}

function hideLoading() {
    $('#loading-spinner').classList.add('hidden');
}

function showToast(title, message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
    `;

    $('#toast-container').appendChild(toast);

    // Animate in
    setTimeout(() => toast.classList.add('show'), 100);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function openModal(modalId) {
    $('#modal-overlay').classList.add('show');
    $(`#${modalId}`).style.display = 'block';
}

function closeModal(modalId) {
    $('#modal-overlay').classList.remove('show');
    $(`#${modalId}`).style.display = 'none';
}

// Navigation Functions
function showPage(pageId) {
    // Hide all pages
    $$('.page').forEach(page => page.classList.remove('active'));

    // Show selected page
    $(`#${pageId}-page`).classList.add('active');

    // Update navigation
    $$('.nav-link').forEach(link => link.classList.remove('active'));
    $$(`[data-page="${pageId}"]`).forEach(link => link.classList.add('active'));

    currentPage = pageId;

    // Load page content
    switch (pageId) {
        case 'dashboard':
            loadDashboardAlt(userId);
            break;
        case 'memberships':
            loadMemberships();
            break;
        case 'classes':
            loadClasses();
            break;
        case 'profile':
            loadProfile();
            break;
    }

    // Close mobile menu
    closeMobileMenu();
}

function toggleMobileMenu() {
    const mobileMenu = $('#mobile-menu');
    const navToggle = $('#nav-toggle');

    mobileMenu.classList.toggle('show');
    navToggle.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = $('#mobile-menu');
    const navToggle = $('#nav-toggle');

    mobileMenu.classList.remove('show');
    navToggle.classList.remove('active');
}

// Dashboard Functions
function loadDashboard() {
    // Update stats
    $('#active-membership').textContent = mockData.user.currentPlan;
    $('#classes-booked').textContent = mockData.todaysClasses.filter(c => c.isBooked).length;
    $('#available-memberships').textContent = mockData.memberships.length;

    // Load today's classes
    const classesContainer = $('#classes-today');
    if (mockData.todaysClasses.length === 0) {
        classesContainer.innerHTML = `
            <div class="text-center py-8">
                <div class="class-meta mb-4">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                        <path d="M8 14h.01"></path>
                        <path d="M12 14h.01"></path>
                        <path d="M16 14h.01"></path>
                        <path d="M8 18h.01"></path>
                        <path d="M12 18h.01"></path>
                        <path d="M16 18h.01"></path>
                    </svg>
                </div>
                <p>No classes scheduled for today</p>
                <button class="btn-secondary mt-4" onclick="showPage('classes')">Browse Classes</button>
            </div>
        `;
    } else {
        classesContainer.innerHTML = mockData.todaysClasses.map(classItem => `
            <div class="class-item">
                <div class="class-info">
                    <h4>${classItem.name}</h4>
                    <p>with ${classItem.trainer}</p>
                    <p class="class-time">${classItem.startTime} - ${classItem.endTime}</p>
                </div>
                ${classItem.isBooked ?
                '<span class="badge badge-booked">Booked</span>' :
                classItem.spotsLeft <= 2 ?
                    `<span class="badge badge-warning">${classItem.spotsLeft} spots left</span>` :
                    '<button class="btn-primary" onclick="showPage(\'classes\')">Join Class</button>'
            }
            </div>
        `).join('');
    }
}
async function loadDashboardAlt(userId) {
    try {
        const [resProfile, resStats, resClasses, resClassesMembers] = await Promise.all([
            fetch(`http://localhost:3000/api/members/${userId}`),
            fetch('http://localhost:3000/api/stats'),
            fetch('http://localhost:3000/api/classes'),
            fetch(`http://localhost:3000/api/classes/members`)
        ]);

        if (!resProfile.ok || !resStats.ok || !resClasses.ok || !resClassesMembers.ok) {
            throw showToast('Error', 'Failed to load dashboard data.', 'error');
        }

        const dataProfile = await resProfile.json();
        const dataStats = await resStats.json();
        const dataClasses = await resClasses.json();
        const dataClassesMembers = await resClassesMembers.json();

        // === Cập nhật thống kê ===
        $('#active-membership').textContent = dataProfile.membership || 'N/A';
        $('#classes-booked').textContent = dataStats.enrolled || 0;
        $('#available-memberships').textContent = dataStats.totalMemberships || 0;

        // === Lọc lớp học hôm nay ===
        const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' }); // Monday, Tuesday...
        console.log('Today\'s name:', todayName);
        const todaysClasses = dataClasses.filter(c => c.schedule === todayName);
        const todaysClassesMembers = dataClassesMembers.filter(cm => cm.schedule === todayName);

        console.log('Todays classes:', todaysClasses);
        console.log('Todays classes members:', todaysClassesMembers);

        const classesContainer = $('#classes-today');

        if (todaysClasses.length === 0) {
            classesContainer.innerHTML = `
                <div class="text-center py-8">
                    <div class="class-meta mb-4">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2">
                            <path d="M8 2v4"></path>
                            <path d="M16 2v4"></path>
                            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                            <path d="M3 10h18"></path>
                            <path d="M8 14h.01"></path>
                            <path d="M12 14h.01"></path>
                            <path d="M16 14h.01"></path>
                            <path d="M8 18h.01"></path>
                            <path d="M12 18h.01"></path>
                            <path d="M16 18h.01"></path>
                        </svg>
                    </div>
                    <p>No classes scheduled for today</p>
                    <button class="btn-secondary mt-4" onclick="showPage('classes')">Browse Classes</button>
                </div>
            `;
        } else {
            classesContainer.innerHTML = todaysClasses.map(c => {
                const classId = c.class_id; // đảm bảo dùng đúng key
                return `
            <div class="class-item" data-class-id="${classId}">
                <div class="class-info">
                    <h4>${c.name}</h4>
                    <p>with ${c.full_name}</p>
                    <p class="class-time">${formatTime(c.time)}</p>
                </div>
                <div class="class-status"></div> <!-- để chèn sau -->
            </div>
        `;
            }).join('');

            todaysClasses.forEach(c => {
                const classId = c.class_id;
                const cm = todaysClassesMembers.find(m => m.class_id === classId);
                const statusHtml = renderClassStatus(cm, userId);

                const statusContainer = classesContainer.querySelector(
                    `.class-item[data-class-id="${classId}"] .class-status`
                );
                if (statusContainer) {
                    statusContainer.innerHTML = statusHtml;
                }
            });
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}
function renderClassStatus(cm, userId) {
    if (!cm) {
        return `<button class="btn-primary" onclick="showPage('classes')">Join Class</button>`;
    }

    if (cm.user_id == userId) {
        return '<span class="badge badge-booked">Booked</span>';
    }

    if (cm.capacity >= cm.max_capacity) {
        return '<span class="badge badge-full">Hết chỗ</span>';
    }

    if ((cm.max_capacity - cm.capacity) <= 2) {
        return `
            <span class="badge badge-warning">${cm.max_capacity - cm.capacity} chỗ trống</span>
            <button class="btn-primary" onclick="showPage('classes')">Join Class</button>
        `;
    }

    return `<button class="btn-primary" onclick="showPage('classes')">Join Class</button>`;
}





// Membership Functions
// function loadMemberships() {
//     const container = $('#memberships-grid');
//     container.innerHTML = mockData.memberships.map(membership => `
//         <div class="membership-card ${membership.popular ? 'popular' : ''} ${membership.current ? 'current' : ''}">
//             ${membership.current ? '<div class="membership-popular-badge">Current Plan</div>' : ''}
//             ${membership.popular && !membership.current ? '<div class="membership-popular-badge">Most Popular</div>' : ''}

//             <div class="membership-header">
//                 <h3>${membership.name}</h3>
//                 <div class="membership-price">
//                     $${membership.price}
//                     <span class="period">/month</span>
//                 </div>
//             </div>

//             <p>${membership.description}</p>

//             <ul class="membership-features">
//                 ${membership.features.map(feature => `
//                     <li>
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                             <path d="M20 6L9 17l-5-5"></path>
//                         </svg>
//                         ${feature}
//                     </li>
//                 `).join('')}
//             </ul>

//             ${membership.current ?
//             '<button class="btn-secondary" disabled>Current Plan</button>' :
//             `<button class="btn-primary" onclick="openUpgradeModal('${membership.id}')">
//                     ${membership.name === 'Elite' ? 'Upgrade Now' : 'Select Plan'}
//                 </button>`
//         }
//         </div>
//     `).join('');
// }
async function loadMemberships() {
    try {
        const response = await fetch('http://localhost:3000/api/memberships');
        if (!response.ok) {
            throw showToast('Error', 'Failed to load memberships.', 'error');
        }
        const data = await response.json();
        // Update the UI with the fetched memberships
        $('#memberships-grid').innerHTML = data.map(membership => `
            <div class="membership-card">
                <div class="membership-header">
                    <h3>${membership.name}</h3>
                    <div class="membership-price">
                        ${membership.price.toLocaleString('vi-VN')}₫
                        <span class="period">/ ${membership.duration / 30} month</span>
                    </div>
                </div>
                <p>No description available</p>
                <ul class="membership-features">
                    <li>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                        No features available
                    </li>
                </ul>
                <button class="btn-primary" onclick="openUpgradeModal('${membership.id}')">
                    Select Plan
                </button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading memberships:', error);
    }
}

function openUpgradeModal(membershipId) {
    selectedMembership = mockData.memberships.find(m => m.id === membershipId);
    if (!selectedMembership) return;
    // Đảm bảo chỉ mở upgrade modal, đóng booking modal nếu đang mở
    closeModal('class-booking-modal');
    $('#upgrade-title').textContent = `Upgrade to ${selectedMembership.name}`;

    $('#membership-preview').innerHTML = `
        <div class="card" style="background: linear-gradient(135deg, rgb(147, 51, 234), rgb(236, 72, 153)); color: white; margin-bottom: 1rem;">
            <div class="card-content">
                <h4 style="color: white; margin-bottom: 0.5rem;">${selectedMembership.name} Membership</h4>
                <p style="color: rgba(255, 255, 255, 0.8);">Unlock premium features and unlimited access</p>
            </div>
        </div>
        
        <div style="margin-bottom: 1rem;">
            ${selectedMembership.features.map(feature => `
                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(34, 197, 94)" stroke-width="2" style="margin-right: 0.75rem;">
                        <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                    <span>${feature}</span>
                </div>
            `).join('')}
        </div>
    `;

    openModal('membership-upgrade-modal');
}

function processUpgrade() {
    const form = $('#payment-form');
    const formData = new FormData(form);

    // Basic validation
    const requiredFields = ['cardholderName', 'cardNumber', 'expiryDate', 'cvv'];
    const missingFields = requiredFields.filter(field => !$(`#${field}`).value.trim());

    if (missingFields.length > 0) {
        showToast('Error', 'Please fill in all payment details.', 'error');
        return;
    }

    showLoading();

    // Simulate API call
    setTimeout(() => {
        hideLoading();

        // Update user's membership
        mockData.user.currentPlan = selectedMembership.name;
        mockData.user.planExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        // Update membership current status
        mockData.memberships.forEach(m => m.current = m.id === selectedMembership.id);

        showToast('Success', 'Membership upgraded successfully!');
        closeModal('membership-upgrade-modal');

        // Refresh current page
        if (currentPage === 'memberships') {
            loadMemberships();
        } else if (currentPage === 'dashboard') {
            loadDashboard();
        }

        // Reset form
        form.reset();
    }, 2000);
}

// Classes Functions
let allClasses = [];
async function loadClasses() {
    try {
        const response = await fetch('http://localhost:3000/api/classes');
        const res = await fetch('http://localhost:3000/api/trainers');
        if (!response.ok || !res.ok) {
            throw showToast('Error', 'Failed to load classes.', 'error');
        }
        const dataClasses = await response.json();
        const dataTrainers = await res.json();

        // Load trainers in filter
        const trainerFilter = $('#trainer-filter');
        trainerFilter.innerHTML = '<option value="">All Instructors</option>' +
            dataTrainers.map(trainer => `<option value="${trainer.trainer_id}">${trainer.full_name}</option>`).join('');

        allClasses = dataClasses;

        applyClassFilters();
    } catch (error) {
        console.error('Error loading classes:', error);
    }
}

// function loadClasses() {
//     // Load trainers in filter
//     const trainerFilter = $('#trainer-filter');
//     trainerFilter.innerHTML = '<option value="">All Instructors</option>';

//     // Apply current filters
//     applyClassFilters();
// }

function applyClassFilters() {
    const searchQuery = $('#search-classes').value.toLowerCase();
    // const categoryFilter = $('#category-filter').value;
    const trainerFilter = $('#trainer-filter').value;
    const timeFilter = $('#time-filter').value; // morning, afternoon, evening

    if (!Array.isArray(allClasses)) {
        console.error('No classes data available to filter.');
        return;
    }

    const filteredClasses = allClasses.filter(classItem => {
        const matchesSearch = !searchQuery ||
            classItem.name.toLowerCase().includes(searchQuery) ||
            (classItem.description || '').toLowerCase().includes(searchQuery);

        // const matchesCategory = !categoryFilter || classItem.level_name === categoryFilter;
        const matchesTrainer = !trainerFilter || String(classItem.trainer_id) === trainerFilter;

        const formattedTime = formatTime(classItem.time);
        const [h, m] = formattedTime.split(':').map(Number);
        const totalMinutes = h * 60 + m;

        const matchesTime =
            !timeFilter ||
            (timeFilter === 'morning' && totalMinutes >= 5 * 60 && totalMinutes < 12 * 60) ||
            (timeFilter === 'afternoon' && totalMinutes >= 12 * 60 && totalMinutes < 18 * 60) ||
            (timeFilter === 'evening' && totalMinutes >= 18 * 60 && totalMinutes < 22 * 60);

        return matchesSearch && matchesTrainer && matchesTime;
    });

    renderClasses(filteredClasses);
}


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
function renderClasses(classes) {
    const container = $('#classes-grid');

    if (!classes || classes.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <div class="class-meta mb-4">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="M21 21l-4.35-4.35"></path>
                    </svg>
                </div>
                <h3>No classes found</h3>
                <p>Try adjusting your search criteria to find more classes.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = classes.map(classItem => {
        const spotsLeft = classItem.max_capacity - classItem.capacity;

        return `
            <div class="card class-card">
                <div class="class-image">
                    ${classItem.name}
                </div>
                <div class="class-details">
                    <h3>
                        ${classItem.name}
                        ${spotsLeft <= 2 ?
                `<span class="badge badge-warning">${spotsLeft} spots left</span>` :
                '<span class="badge badge-available">Available</span>'
            }
                    </h3>
                    
                    <div class="class-meta">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span>${classItem.full_name}</span>
                    </div>
                    
                    <div class="class-meta">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12,6 12,12 16,14"></polyline>
                        </svg>
                        <span>${formatTime(classItem.time)}</span>
                    </div>
                    
                    <div class="class-meta">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span>${classItem.capacity}/${classItem.max_capacity} spots filled</span>
                    </div>

                    <div class="class-meta">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>${classItem.schedule || 'No schedule available'}</span>
                    </div>

                    <div class="class-meta">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2v20M2 12h20"></path>
                        </svg>
                        <span>${classItem.level_name.toUpperCase() || 'No level specified'}</span>
                    </div>

                    <div class="class-description">
                        <p>${classItem.description || 'No description available'}</p>
                    </div>
                    
                    <button class="btn-primary" onclick="openBookingModal('${classItem.class_id}')" 
                            ${spotsLeft <= 0 ? 'disabled' : ''}>
                        ${spotsLeft <= 0 ? 'Class Full' : 'Book Class'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}
async function openBookingModal(classId) {
    try {
        const response = await fetch(`http://localhost:3000/api/classes/${classId}`);
        const classItem = await response.json();

        if (!classItem) return;

        const trainer = classItem.full_name;

        $('#booking-class-name').textContent = classItem.name;
        $('#booking-trainer-name').textContent = `with ${trainer}`;

        // Generate time slots
        const timeSlotsContainer = $('#time-slots');
        timeSlotsContainer.innerHTML = `
            <div class="time-slot">
                <input type="radio" name="timeSlot" value="${classItem.class_id}" id="slot-${classItem.class_id}">
                <label for="slot-${classItem.class_id}" class="time-slot-info">
                    <div class="time-slot-label">
                        ${classItem.schedule} - ${classItem.time}
                    </div>
                    <div class="time-slot-spots">${classItem.max_capacity - classItem.capacity} spots available</div>
                </label>
            </div>
        `;

        openModal('class-booking-modal');
    } catch (error) {
        console.error('Error loading class:', error);
    }
}
async function confirmBooking() {
    const selectedSlot = $('input[name="timeSlot"]:checked');

    if (!selectedSlot) {
        showToast('Error', 'Please select a time slot.', 'error');
        return;
    }

    showLoading();

    try {
        const response = await fetch(`http://localhost:3000/api/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                class_id: selectedSlot.value
            })
        });

        const data = await response.json();

        if (data.success) {
            hideLoading();
            showToast('Success', 'Class booked successfully!');
            closeModal('class-booking-modal');
        } else {
            hideLoading();
            showToast('Error', 'Failed to book class.', 'error');
        }
    } catch (error) {
        hideLoading();
        console.error('Error booking class:', error);
    }
}

// function loadClasses() {
//     // Load trainers in filter
//     const trainerFilter = $('#trainer-filter');
//     trainerFilter.innerHTML = '<option value="">All Instructors</option>' +
//         mockData.trainers.map(trainer => `<option value="${trainer.id}">${trainer.name}</option>`).join('');

//     // Apply current filters
//     applyClassFilters();
// }

// function applyClassFilters() {
//     const searchQuery = $('#search-classes').value.toLowerCase();
//     const categoryFilter = $('#category-filter').value;
//     const trainerFilter = $('#trainer-filter').value;

//     filteredClasses = mockData.classes.filter(classItem => {
//         const matchesSearch = !searchQuery ||
//             classItem.name.toLowerCase().includes(searchQuery) ||
//             classItem.description.toLowerCase().includes(searchQuery);

//         const matchesCategory = !categoryFilter || classItem.category === categoryFilter;

//         const matchesTrainer = !trainerFilter || classItem.trainerId === trainerFilter;

//         return matchesSearch && matchesCategory && matchesTrainer;
//     });

//     renderClasses();
// }

// function renderClasses() {
//     const container = $('#classes-grid');

//     if (filteredClasses.length === 0) {
//         container.innerHTML = `
//             <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
//                 <div class="class-meta mb-4">
//                     <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                         <circle cx="11" cy="11" r="8"></circle>
//                         <path d="M21 21l-4.35-4.35"></path>
//                     </svg>
//                 </div>
//                 <h3>No classes found</h3>
//                 <p>Try adjusting your search criteria to find more classes.</p>
//             </div>
//         `;
//         return;
//     }

//     container.innerHTML = filteredClasses.map(classItem => {
//         const trainer = mockData.trainers.find(t => t.id === classItem.trainerId);
//         const spotsLeft = classItem.maxParticipants - classItem.currentParticipants;

//         return `
//             <div class="card class-card">
//                 <div class="class-image">
//                     ${classItem.name}
//                 </div>
//                 <div class="class-details">
//                     <h3>
//                         ${classItem.name}
//                         ${spotsLeft <= 2 ?
//                 `<span class="badge badge-warning">${spotsLeft} spots left</span>` :
//                 '<span class="badge badge-available">Available</span>'
//             }
//                     </h3>

//                     <div class="class-meta">
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                             <circle cx="12" cy="7" r="4"></circle>
//                         </svg>
//                         <span>${trainer ? trainer.name : 'Unknown Trainer'}</span>
//                     </div>

//                     <div class="class-meta">
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                             <circle cx="12" cy="12" r="10"></circle>
//                             <polyline points="12,6 12,12 16,14"></polyline>
//                         </svg>
//                         <span>${classItem.duration} minutes</span>
//                     </div>

//                     <div class="class-meta">
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
//                             <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//                             <circle cx="9" cy="7" r="4"></circle>
//                             <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//                             <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//                         </svg>
//                         <span>${classItem.currentParticipants}/${classItem.maxParticipants} spots filled</span>
//                     </div>

//                     <p class="class-description">${classItem.description}</p>

//                     <button class="btn-primary" onclick="openBookingModal('${classItem.id}')" 
//                             ${spotsLeft <= 0 ? 'disabled' : ''}>
//                         ${spotsLeft <= 0 ? 'Class Full' : 'Book Class'}
//                     </button>
//                 </div>
//             </div>
//         `;
//     }).join('');
// }

// function openBookingModal(classId) {
//     selectedClass = mockData.classes.find(c => c.id === classId);
//     if (!selectedClass) return;

//     const trainer = mockData.trainers.find(t => t.id === selectedClass.trainerId);

//     $('#booking-class-name').textContent = selectedClass.name;
//     $('#booking-trainer-name').textContent = `with ${trainer ? trainer.name : 'Unknown Trainer'}`;

//     // Generate time slots
//     const timeSlotsContainer = $('#time-slots');
//     timeSlotsContainer.innerHTML = selectedClass.schedules.map((schedule, index) => `
//         <div class="time-slot">
//             <input type="radio" name="timeSlot" value="${index}" id="slot-${index}">
//             <label for="slot-${index}" class="time-slot-info">
//                 <div class="time-slot-label">
//                     ${schedule.date === 'today' ? 'Today' :
//             schedule.date === 'tomorrow' ? 'Tomorrow' :
//                 schedule.date.charAt(0).toUpperCase() + schedule.date.slice(1)} - ${schedule.time}
//                 </div>
//                 <div class="time-slot-spots">${schedule.spots} spots available</div>
//             </label>
//         </div>
//     `).join('');

//     openModal('class-booking-modal');
// }

// function confirmBooking() {
//     const selectedSlot = $('input[name="timeSlot"]:checked');

//     if (!selectedSlot) {
//         showToast('Error', 'Please select a time slot.', 'error');
//         return;
//     }

//     showLoading();

//     // Simulate API call
//     setTimeout(() => {
//         hideLoading();

//         // Update class as booked in today's classes if it's a today slot
//         const slotIndex = parseInt(selectedSlot.value);
//         const selectedSchedule = selectedClass.schedules[slotIndex];

//         if (selectedSchedule.date === 'today') {
//             const todayClass = mockData.todaysClasses.find(c => c.name === selectedClass.name);
//             if (todayClass) {
//                 todayClass.isBooked = true;
//             }
//         }
//         // Thêm lịch vào bảng Schedule
//         addScheduleRow(
//             selectedClass.name,
//             selectedSchedule.date,
//             selectedSchedule.time,
//             (mockData.trainers.find(t => t.id === selectedClass.trainerId)?.name || "Unknown"),
//             "Registered"
//         );
//         showToast('Success', 'Class booked successfully!');
//         closeModal('class-booking-modal');

//         // Refresh dashboard if currently on dashboard
//         if (currentPage === 'dashboard') {
//             loadDashboard();
//         }
//     }, 1500);
// }

// Schedule function
function addScheduleRow(className, date, time, trainer, status = "Registered") {
    const tbody = document.getElementById('schedule-body');
    if (!tbody) return;
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${className}</td>
        <td>${formatScheduleDate(date)}</td>
        <td>${time}</td>
        <td>${trainer}</td>
        <td>${status}</td>
    `;
    tbody.appendChild(tr);
}

// Hàm chuyển đổi thứ/ngày
function formatScheduleDate(dateStr) {
    if (dateStr === 'today') return 'Today';
    if (dateStr === 'tomorrow') return 'Tomorrow';
    const days = {
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday'
    };
    return days[dateStr.toLowerCase()] || dateStr;
}
// Modal overlay click to close
const logoutLink = document.getElementById('logout-link');
if (logoutLink) {
    logoutLink.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = '/login.html';
    });
}
// Schedule function
function addScheduleRow(className, date, time, trainer, status = "Registered") {
    const tbody = document.getElementById('schedule-body');
    if (!tbody) return;
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${className}</td>
        <td>${formatScheduleDate(date)}</td>
        <td>${time}</td>
        <td>${trainer}</td>
        <td>${status}</td>
    `;
    tbody.appendChild(tr);
}

// Hàm chuyển đổi thứ/ngày
function formatScheduleDate(dateStr) {
    if (dateStr === 'today') return 'Today';
    if (dateStr === 'tomorrow') return 'Tomorrow';
    const days = {
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday'
    };
    return days[dateStr.toLowerCase()] || dateStr;
}
// Modal overlay click to close
if (logoutLink) {
    logoutLink.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = '/login.html';
    });
}
// Profile Functions
const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

function loadProfile() {
    loadProfileData(userId);
}

function formatDate(dateString) {
    if (!dateString) return 'Unknown';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
function formatDateUTC(isoString) {
    if (!isoString) return '—'; // xử lý giá trị null hoặc undefined

    const date = new Date(isoString);
    if (isNaN(date)) return 'Invalid Date';

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
}
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

async function loadProfileData(userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/members/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch profile data");
        const user = await response.json();
        console.log(user);

        // Update form fields
        $('#fullName').value = user.full_name;
        $('#email').value = user.email;
        $('#phone').value = user.phone;
        $('#birthDate').value = formatDateUTC(user.date_of_birth);
        $('#fitnessGoals').value = user.description;

        // Update preferences
        // $('#emailNotifications').checked = user.emailNotifications;
        // $('#smsReminders').checked = user.smsReminders;
        // $('#classReminders').checked = user.classReminders;

        // Update profile summary
        $('#avatar-initials').textContent = user.full_name[0] || 'N/A';
        $('#profile-name').textContent = user.full_name || 'N/A';
        $('#profile-membership').textContent = `${user.membership} Member` || 'N/A';
        $('#enrolled-classes').textContent = user.enrolled || 0;
        $('#member-since').textContent = formatDate(user.date_created);

    } catch (error) {
        console.error('Error loading profile data:', error.message);
    }
}

async function saveProfile(e) {
    e.preventDefault();

    showLoading();
    setTimeout(async () => {
        hideLoading();

        const formData = new FormData(e.target);
        const updateData = {};

        for (const [key, value] of formData.entries()) {
            if (value.trim() !== '') {
                if (key === 'date_of_birth') {
                    if (!isValidDateFormat(value.trim())) {
                        showToast('Error', 'Invalid date format. Use DD/MM/YYYY.', 'error');
                        return;
                    }
                    updateData[key] = parseDateToISO(value.trim());
                } else {
                    updateData[key] = value.trim();
                }
            }
            console.log(`Key: ${key}, Value: ${value}`);
        }
        if (Object.keys(updateData).length === 0) {
            showToast('Error', 'No changes made to update.', 'error');
            return;
        }
        try {
            console.log(userId, updateData);
            const response = await fetch(`http://localhost:3000/api/members/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });
            if (!response.ok) throw showToast('Error', 'Failed to update profile', 'error');

            const result = await response.json();
            showToast('Success', result.message);
        } catch (error) {
            console.error('Error updating profile:', error.message);
        }
    }, 1500);
}

// Quick Actions
function handleQuickAction(action) {
    switch (action) {
        case 'register-membership':
            showPage('memberships');
            break;
        case 'book-classes':
            showPage('classes');
            break;
        case 'view-schedule':
            showPage('schedule');
            break;
        case 'update-profile':
            showPage('profile');
            break;
        case 'track-progress':
            showPage('progress');
            break;
        case 'view-schedule':
            showPage('schedule');
            break;
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    // Navigation event listeners
    $$('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(link.dataset.page);
        });
    });

    // Mobile menu toggles
    $('#nav-toggle').addEventListener('click', toggleMobileMenu);
    $('#close-menu-button').addEventListener('click', closeMobileMenu);

    // Quick action buttons
    $$('[data-action]').forEach(button => {
        button.addEventListener('click', (e) => {
            handleQuickAction(button.dataset.action);
        });
    });

    // Class filters
    $('#search-classes').addEventListener('input', applyClassFilters);
    // $('#category-filter').addEventListener('change', applyClassFilters);
    $('#trainer-filter').addEventListener('change', applyClassFilters);
    $('#time-filter').addEventListener('change', applyClassFilters);

    // Profile form
    $('#profile-form').addEventListener('submit', saveProfile);

    // Modal overlay click to close
    $('#modal-overlay').addEventListener('click', (e) => {
        if (e.target === $('#modal-overlay')) {
            closeModal('class-booking-modal');
            closeModal('membership-upgrade-modal');
        }
    });

    // Initial page load
    loadDashboardAlt(userId);
});

// Global functions for onclick handlers
window.showPage = showPage;
window.openUpgradeModal = openUpgradeModal;
window.processUpgrade = processUpgrade;
window.openBookingModal = openBookingModal;
window.confirmBooking = confirmBooking;
window.openModal = openModal;
window.closeModal = closeModal;
window.loadProfileData = loadProfileData;