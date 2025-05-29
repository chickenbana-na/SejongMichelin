const canvas=document.getElementById("roulette"),
      ctx=canvas.getContext("2d"),
      menuInput=document.getElementById("menuInput"),
      addBtn=document.getElementById("addBtn"),
      menuList=document.getElementById("menuList"),
      spinBtn=document.getElementById("spinBtn");

let rouletteList=[],colors=[];

function genColor() {
    return `rgb(${100 + Math.random() * 155 | 0},${100 + Math.random() * 155 | 0},${100 + Math.random() * 155 | 0})`;
}

function drawWheel() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(!rouletteList.length)return;

    const cx=canvas.width/2, cy=canvas.height/2,
          arc=(Math.PI*2)/rouletteList.length,
          startAngle=Math.PI/2;

    rouletteList.forEach((item,i)=>{
        const start=startAngle+arc*i,
            end=startAngle+arc*(i+1);
        ctx.beginPath();
        ctx.fillStyle=colors[i];
        ctx.moveTo(cx,cy);
        ctx.arc(cx,cy,cx,start,end);
        ctx.fill();
        ctx.closePath();

        const angle=startAngle+arc*(i+0.5);
        ctx.save();
        ctx.translate(cx+Math.cos(angle)*(cx-60),cy+Math.sin(angle)*(cy-60));
        ctx.rotate(angle+Math.PI/2);
        ctx.fillStyle="#fff";
        ctx.font="16px Pretendard,sans-serif";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.fillText(item,0,0);
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

function spinWheel(){
    if(!rouletteList.length)return alert("먼저 메뉴를 추가하세요!");
    canvas.style.transition="none";
    canvas.style.transform="rotate(0deg)";
    const anglePer=360/rouletteList.length;
    const randomIndex=Math.floor(Math.random()*rouletteList.length);
    const randomOffset=Math.random()*anglePer;
    const finalAngle=(randomIndex*anglePer)+3600+randomOffset;
    setTimeout(()=>{
      canvas.style.transition="2s ease";
      canvas.style.transform=`rotate(${finalAngle}deg)`;
    },20);
}

addBtn.onclick=addMenuItem;
menuInput.onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();addMenuItem();}};
spinBtn.onclick=spinWheel;

drawWheel();