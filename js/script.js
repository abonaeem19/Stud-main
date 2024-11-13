let currentSection = "";

function openPopup(title) {
    document.getElementById("popup").style.display = "flex";
    document.getElementById("popup-title").innerText = title;
    currentSection = title;

    const savedContent = localStorage.getItem(title);
    if (savedContent) {
        document.querySelector("#popup textarea").value = savedContent;
    } else {
        document.querySelector("#popup textarea").value = "";
    }
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function saveContent() {
    const content = document.querySelector("#popup textarea").value;
    if (content.trim()) {
        localStorage.setItem(currentSection, content);
        showToast("تم حفظ المحتوى بنجاح!");
    } else {
        alert("الرجاء إدخال محتوى قبل الحفظ.");
    }
    closePopup();
    displayStoredContent();
}

function deleteContent(section) {
    localStorage.removeItem(section);
    showToast("تم حذف المحتوى بنجاح!");
    displayStoredContent();
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.className = "toast show";
    toast.innerText = message;

    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

window.onload = function() {
    displayStoredContent();
};

function displayStoredContent() {
    const sections = ["جدول المحاضرات", "مهام اليوم", "الملاحظات", "المراجع الدراسية"];
    sections.forEach(section => {
        const content = localStorage.getItem(section);
        const elementId = section === "جدول المحاضرات" ? "schedule-text" :
                          section === "مهام اليوم" ? "tasks-text" :
                          section === "الملاحظات" ? "notes-text" :
                          "references-text";
        document.getElementById(elementId).innerText = content ? content : "لا يوجد محتوى محفوظ.";
    });
}
