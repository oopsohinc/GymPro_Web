// GymPro Static Web Application JavaScript

// Mock Data - In a real application, this would come from an API
const mockData = {
    user: {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567',
        birthDate: '1990-05-15',
        emergencyContact: '+1 (555) 987-6543',
        fitnessGoals: 'Weight loss, strength building, and improved cardiovascular health.',
        memberSince: 'Jan 2023',
        currentPlan: 'Premium',
        planExpiry: 'Mar 15, 2024',
        classesAttended: 127,
        currentStreak: 12,
        emailNotifications: true,
        smsReminders: false,
        classReminders: true
    },
    
    memberships: [
        {
            id: 'basic',
            name: 'Basic',
            price: 29,
            description: 'Perfect for getting started with your fitness journey',
            features: [
                'Access to gym equipment',
                'Locker room access',
                '2 guest passes per month'
            ],
            popular: false
        },
        {
            id: 'premium',
            name: 'Premium',
            price: 59,
            description: 'Everything you need for a complete fitness experience',
            features: [
                'Everything in Basic',
                'Unlimited group classes',
                'Personal trainer sessions',
                'Nutrition consultation'
            ],
            popular: true,
            current: true
        },
        {
            id: 'elite',
            name: 'Elite',
            price: 99,
            description: 'The ultimate fitness membership with premium perks',
            features: [
                'Everything in Premium',
                'Unlimited personal training',
                'Spa & recovery services',
                'Priority class booking'
            ],
            popular: false
        }
    ],
    
    trainers: [
        {
            id: 'sarah',
            name: 'Sarah Johnson',
            specialties: ['Yoga', 'Mindfulness', 'Flexibility'],
            experience: '5 years'
        },
        {
            id: 'mike',
            name: 'Mike Wilson',
            specialties: ['HIIT', 'Cardio', 'Weight Loss'],
            experience: '8 years'
        },
        {
            id: 'alex',
            name: 'Alex Chen',
            specialties: ['Strength Training', 'Powerlifting', 'Muscle Building'],
            experience: '6 years'
        },
        {
            id: 'emma',
            name: 'Emma Davis',
            specialties: ['Aqua Fitness', 'Low Impact', 'Rehabilitation'],
            experience: '4 years'
        }
    ],
    
    classes: [
        {
            id: 'yoga',
            name: 'Morning Yoga',
            description: 'Start your day with peaceful yoga flows and mindfulness exercises.',
            trainerId: 'sarah',
            category: 'Yoga',
            duration: 60,
            maxParticipants: 15,
            currentParticipants: 12,
            schedules: [
                { date: 'today', time: '08:00 - 09:00', spots: 3, available: true },
                { date: 'tomorrow', time: '08:00 - 09:00', spots: 5, available: true }
            ]
        },
        {
            id: 'hiit',
            name: 'HIIT Training',
            description: 'High-intensity intervals to boost your metabolism and burn calories.',
            trainerId: 'mike',
            category: 'HIIT',
            duration: 60,
            maxParticipants: 20,
            currentParticipants: 18,
            schedules: [
                { date: 'today', time: '18:00 - 19:00', spots: 2, available: true }
            ]
        },
        {
            id: 'strength',
            name: 'Strength Training',
            description: 'Build muscle and increase strength with progressive resistance training.',
            trainerId: 'alex',
            category: 'Strength',
            duration: 60,
            maxParticipants: 12,
            currentParticipants: 8,
            schedules: [
                { date: 'today', time: '19:30 - 20:30', spots: 4, available: true }
            ]
        },
        {
            id: 'aqua',
            name: 'Aqua Fitness',
            description: 'Low-impact water-based exercises perfect for all fitness levels.',
            trainerId: 'emma',
            category: 'Cardio',
            duration: 60,
            maxParticipants: 10,
            currentParticipants: 6,
            schedules: [
                { date: 'friday', time: '10:00 - 11:00', spots: 4, available: true }
            ]
        }
    ],
    
    todaysClasses: [
        {
            id: 'yoga-today',
            name: 'Morning Yoga',
            trainer: 'Sarah Johnson',
            startTime: '08:00',
            endTime: '09:00',
            spotsLeft: 3,
            isBooked: true
        },
        {
            id: 'hiit-today',
            name: 'HIIT Training',
            trainer: 'Mike Wilson',
            startTime: '18:00',
            endTime: '19:00',
            spotsLeft: 2,
            isBooked: false
        },
        {
            id: 'strength-today',
            name: 'Strength Training',
            trainer: 'Alex Chen',
            startTime: '19:30',
            endTime: '20:30',
            spotsLeft: 4,
            isBooked: false
        }
    ]
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
            loadDashboard();
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

// Membership Functions
function loadMemberships() {
    const container = $('#memberships-grid');
    container.innerHTML = mockData.memberships.map(membership => `
        <div class="membership-card ${membership.popular ? 'popular' : ''} ${membership.current ? 'current' : ''}">
            ${membership.current ? '<div class="membership-popular-badge">Current Plan</div>' : ''}
            ${membership.popular && !membership.current ? '<div class="membership-popular-badge">Most Popular</div>' : ''}
            
            <div class="membership-header">
                <h3>${membership.name}</h3>
                <div class="membership-price">
                    $${membership.price}
                    <span class="period">/month</span>
                </div>
            </div>
            
            <p>${membership.description}</p>
            
            <ul class="membership-features">
                ${membership.features.map(feature => `
                    <li>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                        ${feature}
                    </li>
                `).join('')}
            </ul>
            
            ${membership.current ?
                '<button class="btn-secondary" disabled>Current Plan</button>' :
                `<button class="btn-primary" onclick="openUpgradeModal('${membership.id}')">
                    ${membership.name === 'Elite' ? 'Upgrade Now' : 'Select Plan'}
                </button>`
            }
        </div>
    `).join('');
}

function openUpgradeModal(membershipId) {
    selectedMembership = mockData.memberships.find(m => m.id === membershipId);
    if (!selectedMembership) return;
    
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
function loadClasses() {
    // Load trainers in filter
    const trainerFilter = $('#trainer-filter');
    trainerFilter.innerHTML = '<option value="">All Instructors</option>' +
        mockData.trainers.map(trainer => `<option value="${trainer.id}">${trainer.name}</option>`).join('');
    
    // Apply current filters
    applyClassFilters();
}

function applyClassFilters() {
    const searchQuery = $('#search-classes').value.toLowerCase();
    const categoryFilter = $('#category-filter').value;
    const trainerFilter = $('#trainer-filter').value;
    
    filteredClasses = mockData.classes.filter(classItem => {
        const matchesSearch = !searchQuery || 
            classItem.name.toLowerCase().includes(searchQuery) ||
            classItem.description.toLowerCase().includes(searchQuery);
        
        const matchesCategory = !categoryFilter || classItem.category === categoryFilter;
        
        const matchesTrainer = !trainerFilter || classItem.trainerId === trainerFilter;
        
        return matchesSearch && matchesCategory && matchesTrainer;
    });
    
    renderClasses();
}

function renderClasses() {
    const container = $('#classes-grid');
    
    if (filteredClasses.length === 0) {
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
    
    container.innerHTML = filteredClasses.map(classItem => {
        const trainer = mockData.trainers.find(t => t.id === classItem.trainerId);
        const spotsLeft = classItem.maxParticipants - classItem.currentParticipants;
        
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
                        <span>${trainer ? trainer.name : 'Unknown Trainer'}</span>
                    </div>
                    
                    <div class="class-meta">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12,6 12,12 16,14"></polyline>
                        </svg>
                        <span>${classItem.duration} minutes</span>
                    </div>
                    
                    <div class="class-meta">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span>${classItem.currentParticipants}/${classItem.maxParticipants} spots filled</span>
                    </div>
                    
                    <p class="class-description">${classItem.description}</p>
                    
                    <button class="btn-primary" onclick="openBookingModal('${classItem.id}')" 
                            ${spotsLeft <= 0 ? 'disabled' : ''}>
                        ${spotsLeft <= 0 ? 'Class Full' : 'Book Class'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function openBookingModal(classId) {
    selectedClass = mockData.classes.find(c => c.id === classId);
    if (!selectedClass) return;
    
    const trainer = mockData.trainers.find(t => t.id === selectedClass.trainerId);
    
    $('#booking-class-name').textContent = selectedClass.name;
    $('#booking-trainer-name').textContent = `with ${trainer ? trainer.name : 'Unknown Trainer'}`;
    
    // Generate time slots
    const timeSlotsContainer = $('#time-slots');
    timeSlotsContainer.innerHTML = selectedClass.schedules.map((schedule, index) => `
        <div class="time-slot">
            <input type="radio" name="timeSlot" value="${index}" id="slot-${index}">
            <label for="slot-${index}" class="time-slot-info">
                <div class="time-slot-label">
                    ${schedule.date === 'today' ? 'Today' : 
                      schedule.date === 'tomorrow' ? 'Tomorrow' : 
                      schedule.date.charAt(0).toUpperCase() + schedule.date.slice(1)} - ${schedule.time}
                </div>
                <div class="time-slot-spots">${schedule.spots} spots available</div>
            </label>
        </div>
    `).join('');
    
    openModal('class-booking-modal');
}

function confirmBooking() {
    const selectedSlot = $('input[name="timeSlot"]:checked');
    
    if (!selectedSlot) {
        showToast('Error', 'Please select a time slot.', 'error');
        return;
    }
    
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        
        // Update class as booked in today's classes if it's a today slot
        const slotIndex = parseInt(selectedSlot.value);
        const selectedSchedule = selectedClass.schedules[slotIndex];
        
        if (selectedSchedule.date === 'today') {
            const todayClass = mockData.todaysClasses.find(c => c.name === selectedClass.name);
            if (todayClass) {
                todayClass.isBooked = true;
            }
        }
        // Thêm lịch vào bảng Schedule
        addScheduleRow(
        selectedClass.name,
        selectedSchedule.date,
        selectedSchedule.time,
        (mockData.trainers.find(t => t.id === selectedClass.trainerId)?.name || "Unknown"),
        "Registered"
        );
        showToast('Success', 'Class booked successfully!');
        closeModal('class-booking-modal');
        
        // Refresh dashboard if currently on dashboard
        if (currentPage === 'dashboard') {
            loadDashboard();
        }
    }, 1500);
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
    const logoutLink = document.getElementById('logout-link');
if (logoutLink) {
    logoutLink.addEventListener('click', function(e) {
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
        $('#fitnessGoals').value = user.description;

        // Update preferences
        // $('#emailNotifications').checked = user.emailNotifications;
        // $('#smsReminders').checked = user.smsReminders;
        // $('#classReminders').checked = user.classReminders;

        // Update profile summary
        $('#avatar-initials').textContent = user.full_name[0];
        $('#profile-name').textContent = user.full_name;
        $('#profile-membership').textContent = `${user.membership} Member`;
        $('#enrolled-classes').textContent = user.enrolled || 0;
        $('#member-since').textContent = formatDate(user.date_created);

    } catch (error) {
        console.error('Error loading profile data:', error.message);
    }
}

function saveProfile(event) {
    event.preventDefault();
    
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        
        // Update mock data
        const form = event.target;
        const formData = new FormData(form);
        
        Object.keys(mockData.user).forEach(key => {
            if (formData.has(key)) {
                mockData.user[key] = formData.get(key);
            }
        });
        
        // Update preferences
        mockData.user.emailNotifications = $('#emailNotifications').checked;
        mockData.user.smsReminders = $('#smsReminders').checked;
        mockData.user.classReminders = $('#classReminders').checked;
        
        // Update profile display
        $('#avatar-initials').textContent = mockData.user.firstName[0] + mockData.user.lastName[0];
        $('#profile-name').textContent = `${mockData.user.firstName} ${mockData.user.lastName}`;
        
        showToast('Success', 'Profile updated successfully!');
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
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
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
    $('#category-filter').addEventListener('change', applyClassFilters);
    $('#trainer-filter').addEventListener('change', applyClassFilters);
    
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
    loadDashboard();
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