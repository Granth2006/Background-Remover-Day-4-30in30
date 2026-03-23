// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const apiKeyInput = document.getElementById('apiKeyInput');
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');

const uploadSection = document.getElementById('uploadSection');
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');

const actionSection = document.getElementById('actionSection');
const originalPreview = document.getElementById('originalPreview');
const statSize = document.getElementById('statSize');
const statRes = document.getElementById('statRes');
const removeBgBtn = document.getElementById('removeBgBtn');
const resetBtn1 = document.getElementById('resetBtn1');

const loadingSection = document.getElementById('loadingSection');
const progressFill = document.getElementById('progressFill');

const resultSection = document.getElementById('resultSection');
const sliderInput = document.getElementById('sliderInput');
const originalLayer = document.getElementById('originalLayer');
const sliderHandle = document.getElementById('sliderHandle');
const sliderOriginalImage = document.getElementById('sliderOriginalImage');
const resultImage = document.getElementById('resultImage');
const resultLayer = document.getElementById('resultLayer');
const colorBtns = document.querySelectorAll('.color-btn');
const customColorPicker = document.getElementById('customColorPicker');
const resetBtn2 = document.getElementById('resetBtn2');
const downloadBtn = document.getElementById('downloadBtn');

const toastContainer = document.getElementById('toastContainer');

// State
let currentFile = null;
let processedBlobUrl = null;
let currentSettings = {
    apiKey: localStorage.getItem('removeBgApiKey') || '',
    backgroundColor: 'transparent'
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Set stored API key
    if (currentSettings.apiKey) {
        apiKeyInput.value = currentSettings.apiKey;
    }

    // Set theme
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.setAttribute('data-theme', 'dark');
    }
});

// Theme Management
themeToggle.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// API Key Management
saveApiKeyBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (key) {
        localStorage.setItem('removeBgApiKey', key);
        currentSettings.apiKey = key;
        showToast('API Key saved successfully', 'success');
    } else {
        localStorage.removeItem('removeBgApiKey');
        currentSettings.apiKey = '';
        showToast('API Key removed', 'success');
    }
});

// Helpers
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'info';
    if (type === 'error') icon = 'error';
    if (type === 'success') icon = 'check_circle';

    toast.innerHTML = `
        <span class="material-icons">${icon}</span>
        <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease both';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

// File Upload Logic
browseBtn.addEventListener('click', () => fileInput.click());
dropzone.addEventListener('click', (e) => {
    if(e.target !== browseBtn) fileInput.click();
});

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, () => {
        dropzone.classList.add('dragover');
    }, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, () => {
        dropzone.classList.remove('dragover');
    }, false);
});

dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFile(files[0]);
});

fileInput.addEventListener('change', function() {
    handleFile(this.files[0]);
    this.value = ''; // Reset input to allow choosing same file
});

function handleFile(file) {
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        showToast('Invalid file type. Please upload JPG, PNG, or WEBP.', 'error');
        return;
    }

    // Validate size (Max 5MB = 5 * 1024 * 1024 bytes)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
        showToast('File too large (Max 5MB)', 'error');
        return;
    }

    currentFile = file;

    // Show Preview
    const reader = new FileReader();
    reader.onload = (e) => {
        originalPreview.src = e.target.result;
        sliderOriginalImage.src = e.target.result;
        
        statSize.textContent = formatBytes(file.size);
        
        // Get dimensions
        const img = new Image();
        img.onload = () => {
            statRes.textContent = `${img.width} × ${img.height}`;
            showSection('action');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Section Management
function showSection(section) {
    uploadSection.classList.add('hidden');
    actionSection.classList.add('hidden');
    loadingSection.classList.add('hidden');
    resultSection.classList.add('hidden');

    switch (section) {
        case 'upload':
            uploadSection.classList.remove('hidden');
            break;
        case 'action':
            actionSection.classList.remove('hidden');
            break;
        case 'loading':
            loadingSection.classList.remove('hidden');
            break;
        case 'result':
            resultSection.classList.remove('hidden');
            break;
    }
}

resetBtn1.addEventListener('click', resetApp);
resetBtn2.addEventListener('click', resetApp);

function resetApp() {
    currentFile = null;
    processedBlobUrl = null;
    showSection('upload');
}

// Background Removal Process
removeBgBtn.addEventListener('click', async () => {
    if (!currentSettings.apiKey) {
        showToast('Please configure your Remove.bg API key first.', 'error');
        apiKeyInput.focus();
        return;
    }

    if (!currentFile) return;

    showSection('loading');
    progressFill.style.width = '20%';

    try {
        const formData = new FormData();
        formData.append('image_file', currentFile);
        formData.append('size', 'auto');
        
        // Simulating upload progress
        setTimeout(() => progressFill.style.width = '60%', 1000);

        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': currentSettings.apiKey
            },
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errMsg = 'Failed to remove background.';
            try {
                const errorJson = JSON.parse(errorText);
                if (errorJson.errors && errorJson.errors.length > 0) {
                    errMsg = errorJson.errors[0].title;
                }
            } catch (e) {}
            throw new Error(errMsg);
        }

        progressFill.style.width = '90%';

        const blob = await response.blob();
        processedBlobUrl = URL.createObjectURL(blob);
        
        // Apply to result
        resultImage.src = processedBlobUrl;
        
        progressFill.style.width = '100%';
        setTimeout(() => showSection('result'), 300);

    } catch (error) {
        showToast(error.message, 'error');
        showSection('action');
    }
});

// Slider logic
sliderInput.addEventListener('input', (e) => {
    const value = e.target.value;
    // Use clip-path to prevent image squishing/distortion
    originalLayer.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
    sliderHandle.style.left = `${value}%`;
});

// Background Color Logic
colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        colorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const color = btn.getAttribute('data-color');
        updateBgColor(color);
    });
});

customColorPicker.addEventListener('input', (e) => {
    colorBtns.forEach(b => b.classList.remove('active'));
    updateBgColor(e.target.value);
});

function updateBgColor(color) {
    currentSettings.backgroundColor = color;
    if (color === 'transparent') {
        resultLayer.style.backgroundColor = 'transparent';
    } else {
        resultLayer.style.backgroundColor = color;
    }
}

// Download Logic
downloadBtn.addEventListener('click', () => {
    if (!processedBlobUrl) return;

    if (currentSettings.backgroundColor !== 'transparent') {
        // We need to render it onto a canvas
        const canvas = document.getElementById('exportCanvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw background
            ctx.fillStyle = currentSettings.backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw image over it
            ctx.drawImage(img, 0, 0);
            
            // Export
            triggerDownload(canvas.toDataURL('image/png'));
        };
        img.src = processedBlobUrl;
        
    } else {
        // Direct download
        triggerDownload(processedBlobUrl);
    }
});

function triggerDownload(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = `bg-removed-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Image downloaded!', 'success');
}
