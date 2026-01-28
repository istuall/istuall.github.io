function changeColor(row1) {
    document.getElementById(row1).style.backgroundColor = '#CCCCFF';
}

function resetColor(row1) {
    document.getElementById(row1).style.backgroundColor = '';
}

const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    item.addEventListener('click', function() {
        const subMenu = this.querySelector('.sub-menu');
        if (subMenu.style.display === 'block') {
            subMenu.style.display = 'none';
        } else {
            subMenu.style.display = 'block';
        }
    });
});

function validateForm() {
    const name = document.getElementById('name').value;
    const nameRegex = /^[a-zA-Z\s\u4e00-\u9fa5]+$/;
    if (!nameRegex.test(name)) {
        alert('姓名只能包含中文、英文和空格');
        return false;
    }
    const birthdate = document.getElementById('birthdate').value;
    if (birthdate === '') {
        alert('请输入出生日期');
        return false;
    }
    const school = document.getElementById('school').value;
    const schoolRegex = /^[a-zA-Z\s\u4e00-\u9fa5]+$/;
    if (!schoolRegex.test(school)) {
        alert('学校名称只能包含中文、英文和空格');
        return false;
    }
    const password = document.getElementById('password').value;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
        alert('密码至少 6 位，且必须包含字母和数字');
        return false;
    }
    return true;
}