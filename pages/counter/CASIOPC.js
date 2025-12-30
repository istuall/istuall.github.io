const display2 = document.getElementById("display2");
const display1 = document.getElementById("display1");
const image = document.getElementById("img");
const body = document.body;
let img_visibility = "hidden";
let history = []; // Array to store history of display2 states
const buttons = document.querySelectorAll('.button_n input[type="button"]'); // 获取所有按钮

function appendTodisplay2(value) {
    // Save the current state to history before making changes (except for undo)
    if (value !== "back") {
        history.push(display2.value);
        if (history.length > 10) history.shift(); // Limit history to last 10 states
    }

    switch (value) {
        case "back":
            display1.value = "Be Happy!";
            display2.value = "";
            break;
        case "ON":
            display2.value = "";
            display1.value = "ON";
            history = []; // Clear history on ON
            enableButtons(); // 启用所有按钮
            break;
        case "CP":
            navigator.clipboard.writeText(display1.value);
            display2.value = "";
            display1.value = "Result is copied!";
            break;
        case "OFF":
            display2.value = "";
            display1.value = "OFF";
            history = []; // Clear history on OFF
            disableButtons(); // 禁用除特定按钮外的所有按钮
            break;
        case "←":
            display2.value = display2.value.slice(0, -1);
            break;
        case "→":
            display2.value = display2.value.slice(1);
            break;
        case "AC":
            display2.value = "";
            display1.value = "0";
            history = []; // Clear history on AC
            break;
        case "DEL":
            display2.value = display2.value.slice(0, -1);
            break;
        case "÷":
            display2.value += "/";
            break;
        case "×":
            display2.value += "*";
            break;
        case "π":
            display2.value += "3.14";
            break;
        case "+":
            display2.value += "+";
            break;
        case "-":
            display2.value += "-";
            break;
        case "outlook":
            alert('作者信箱：zero180t@qq.com\n请跳转至邮箱客户端发送邮件');
            const recipient = 'zero180t@qq.com';
            const subject = '关于计算器的问题';
            const body = '我在使用计算器时遇到了以下问题：' + display2.value;
            const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
            break;
        case "i":
            alert('作者：zero180t@qq.com\n制作日期2025/3/28\n版本号V1.0\n功能：基本运算');
            break;
        case "?":
            alert('作者：zero180t@qq.com\n关于计算器结果过长查看不全问题，\n请点击计算器屏幕，然后移动键盘左键右键即可');
            break;
        case "img":
            if (img_visibility === "hidden") {
                image.style.visibility = "visible";
                img_visibility = "visible";
            } else {
                image.style.visibility = "hidden";
                img_visibility = "hidden";
            }
            break;
        case "=":
            if (display1.value === "OFF") {
                display1.value = "OFF";
                break;
            } else {
                try {
                    display1.value = eval(display2.value);
                } catch (error) {
                    display1.value = "Error";
                }
            }
            break;
        default:
            if (display1.value === "OFF") {
                display1.value = "OFF";
                break;
            } else {
                display2.value += value;
                // 让输入框滚动到最右侧
                display2.scrollLeft = display2.scrollWidth;
            }
            break;
    }
}

function disableButtons() {
    buttons.forEach(button => {
        const value = button.value;
        if (value !== "ON" && value !== "?" && value !== "🎲" && value !== "👁" && value !== "ⓘ" && value !== "✉") {
            button.disabled = true;
        }
    });
}

function enableButtons() {
    buttons.forEach(button => {
        button.disabled = false;
    });
}

//ios禁止缩放
window.onload = function() {
    // 禁止缩放
    var lastTouchEnd = 0;
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    });
    document.addEventListener('touchend', function(event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    // 阻止双指放大
    document.addEventListener('gesturestart', function(event) {
        event.preventDefault();
    });
}