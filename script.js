const $ = document.querySelector.bind(document);

const color = $("#color");
const createBtn = $("#createBtn");
const list = $("#list");

createBtn.onclick = () => {
    const newNote = document.createElement("div");
    newNote.classList.add("note");
    newNote.innerHTML = `
    <span class="close">x</span>
    <textarea
        placeholder="Write content..."
        id=""
        cols="30"
        rows="10"
    ></textarea>`;
    newNote.style.borderColor = color.value;
    list.appendChild(newNote);
};

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("close")) {
        e.target.parentNode.remove();
    }
});

let cursor = {
    x: null,
    y: null,
};

let note = {
    dom: null,
    x: null,
    y: null,
};

function activeNote(targetNote) {
    const notes = document.getElementsByClassName("note");
    Array.from(notes).forEach((note) => note.classList.remove("active"));
    targetNote.classList.add("active");
}

document.addEventListener("mousedown", (e) => {
    let targetNote = null;

    if (e.target.classList.contains("note")) {
        targetNote = e.target;
        cursor = {
            x: e.clientX,
            y: e.clientY,
        };
        note = {
            dom: targetNote,
            x: targetNote.getBoundingClientRect().left,
            y: targetNote.getBoundingClientRect().top,
        };
        activeNote(targetNote);
    } else if (e.target.offsetParent.classList.contains("note")) {
        targetNote = e.target.offsetParent;
        activeNote(targetNote);
    }
});

document.addEventListener("mousemove", (e) => {
    if (note.dom === null) return;
    let currentCursor = {
        x: e.clientX,
        y: e.clientY,
    };
    let distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y,
    };
    note.dom.style.left = note.x + distance.x + "px";
    note.dom.style.top = note.y + distance.y + "px";
    note.dom.style.cursor = "grab";
});

document.addEventListener("mouseup", (e) => {
    if (e.target === note.dom) {
        note.dom.style.cursor = "auto";
        note.dom = null;
    }
});
