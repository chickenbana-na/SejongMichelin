const canvas=document.getElementById("roulette"),
      ctx=canvas.getContext("2d"),
      menuInput=document.getElementById("menuInput"),
      addBtn=document.getElementById("addBtn"),
      menuList=document.getElementById("menuList"),
      spinBtn=document.getElementById("spinBtn");


let rouletteList=[],colors=[];
let rotationAngle = 0;
let isSpinning = false;

function genColor() {
    return `rgb(${Math.random() * 255 | 0},${Math.random() * 255 | 0},${Math.random() * 255 | 0})`;
}

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!rouletteList.length) return;

    const cx = canvas.width / 2, cy = canvas.height / 2;
    const arc = (Math.PI * 2) / rouletteList.length;
    const startAngle = Math.PI / 2 + rotationAngle; // 회전 각도 반영

    rouletteList.forEach((item, i) => {
        const start = startAngle + arc * i;
        const end = startAngle + arc * (i + 1);
        ctx.beginPath();
        ctx.fillStyle = colors[i];
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, cx, start, end);
        ctx.fill();
        ctx.closePath();

        const angle = start + arc / 2;
        ctx.save();
        ctx.translate(cx + Math.cos(angle) * (cx - 60), cy + Math.sin(angle) * (cy - 60));
        ctx.rotate(angle + Math.PI / 2);
        ctx.fillStyle = "#fff";
        ctx.font = "16px Pretendard,sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item, 0, 0);
        ctx.restore();
    });
}

function addMenuItem(){
    const val = menuInput.value.trim();
    if (!val) return alert("메뉴를 추가해 주세요!");
    if (rouletteList.length >= 10) return alert("메뉴는 최대 10개까지 추가할 수 있습니다.");

    rouletteList.push(val);
    colors.push(genColor()); // ❗️색상 추가
    menuInput.value = "";
    drawWheel();
}

function addMenuItemFromList(name){
    if (rouletteList.length >= 10) return alert("메뉴는 최대 10개까지 추가할 수 있습니다.");

    rouletteList.push(name);
    colors.push(genColor()); // ❗️색상 추가
    drawWheel();
}

function spinWheel() {
    if (!rouletteList.length) return alert("먼저 메뉴를 추가하세요!");
    if (isSpinning) return; // 중복 방지

    isSpinning = true;
    const anglePer = (Math.PI * 2) / rouletteList.length;
    const targetIndex = Math.floor(Math.random() * rouletteList.length);
    const extraSpins = 10;
    const targetAngle = (targetIndex + Math.random()) * anglePer;
    const finalRotation = (Math.PI * 2) * extraSpins + targetAngle;
    const duration = 2000;
    const startTime = performance.now();

    function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3); // ease-out
        rotationAngle = finalRotation * easeOut;
        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
        }
    }

    requestAnimationFrame(animate);
}

addBtn.onclick=addMenuItem;
menuInput.onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();addMenuItem();}};
spinBtn.onclick=spinWheel;

drawWheel();