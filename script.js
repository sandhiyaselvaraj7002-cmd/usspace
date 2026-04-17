// Navigation
function openChat(){ window.location.href="chat.html"; }
function goHome(){ window.location.href="home.html"; }
function openNotes(){ window.location.href="notes.html"; }
function goChat(){ window.location.href="chat.html"; }

// Time
function getTime(){ return new Date().toLocaleString(); }

// Load
window.onload=function(){
    loadMessages();
    loadNotes();
    loadName();
    loadBackground();
    loadProfile();
}

// Chat
function sendMessage(){
    let msg=document.getElementById("message").value;
    if(!msg)return;

    let data={text:msg,time:getTime(),type:"me"};
    saveMessage(data);
    displayMessage(data);

    document.getElementById("message").value="";
}

function missYou(){
    let data={text:"Missing you ❤️",time:getTime(),type:"me"};
    saveMessage(data);
    displayMessage(data);
    setTimeout(autoReply,1000);
}

function autoReply(){
    let replies=["Miss you too ❤️","Take care 💜","Thinking of you 💭"];
    let reply=replies[Math.floor(Math.random()*replies.length)];

    let data={text:reply,time:getTime(),type:"other"};
    saveMessage(data);
    displayMessage(data);
}

// Storage
function saveMessage(m){
    let d=JSON.parse(localStorage.getItem("messages"))||[];
    d.push(m);
    localStorage.setItem("messages",JSON.stringify(d));
}

function loadMessages(){
    let d=JSON.parse(localStorage.getItem("messages"))||[];
    d.forEach(displayMessage);
}

function displayMessage(m){
    if(!document.getElementById("chatBox")) return;

    let div=document.createElement("div");
    div.className="message "+(m.type==="me"?"my-msg":"other-msg");
    div.innerHTML=`${m.text}<br><small>${m.time}</small>`;
    document.getElementById("chatBox").appendChild(div);
}

// Notes
function addNote(){
    let note=prompt("Enter note:");
    if(!note)return;

    let data={text:note,time:getTime()};
    let n=JSON.parse(localStorage.getItem("notes"))||[];
    n.push(data);
    localStorage.setItem("notes",JSON.stringify(n));
    displayNote(data);
}

function loadNotes(){
    let n=JSON.parse(localStorage.getItem("notes"))||[];
    n.forEach(displayNote);
}

function displayNote(n){
    if(!document.getElementById("notesList")) return;

    let div=document.createElement("div");
    div.innerHTML=`${n.text}<br><small>${n.time}</small><hr>`;
    document.getElementById("notesList").appendChild(div);
}

// Name
function changeName(){
    let name=prompt("Enter name:");
    if(!name)return;
    localStorage.setItem("chatName",name);
    document.getElementById("chatName").innerText=name;
}

function loadName(){
    let name=localStorage.getItem("chatName");
    if(name && document.getElementById("chatName"))
        document.getElementById("chatName").innerText=name;
}

// Background
function setBackground(e){
    let reader=new FileReader();
    reader.onload=function(ev){
        let img=ev.target.result;
        document.querySelector(".chat-box").style.backgroundImage=`url(${img})`;
        localStorage.setItem("chatBg",img);
    }
    reader.readAsDataURL(e.target.files[0]);
}

function loadBackground(){
    let bg=localStorage.getItem("chatBg");
    if(bg && document.querySelector(".chat-box"))
        document.querySelector(".chat-box").style.backgroundImage=`url(${bg})`;
}

// Profile
function setProfile(e){
    let reader=new FileReader();
    reader.onload=function(ev){
        let img=ev.target.result;
        document.getElementById("profilePic").src=img;
        localStorage.setItem("profilePic",img);
    }
    reader.readAsDataURL(e.target.files[0]);
}

function loadProfile(){
    let pic=localStorage.getItem("profilePic");
    if(pic && document.getElementById("profilePic"))
        document.getElementById("profilePic").src=pic;
}