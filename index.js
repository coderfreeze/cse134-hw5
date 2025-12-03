const projectsContainer = document.getElementById("projects-box");
const buttonsContainer = document.getElementById("button-row");

const projects  = [
    {
        title: "Chat Server",
        img: "images/chat_project.png",
        alt: "Chat Server Project",
        desc: "Developed a high-performance chat server in C with custom TCP/IP sockets and persistent storage optimized for concurrent requests.",
        skills: "C/C++,GDB,Vim,Systems Programming",
        link: "https://github.com/coderfreeze?tab=repositories"
    },
    {
        title: "Stock Portfolio Project",
        img: "images/stock-app.png",
        alt: "Dashboard of Stock Portfolio Project",
        desc: "Built a comprehensive MERN stack app that seamlessly combined dynamic stock searches, secure authentication, and real-time data visualization.",
        skills: "JavaScript,React,MongoDB,Express,Node,Tailwind",
        link: "https://github.com/coderfreeze/stock-portfolio-manager-app"
    }
];

if (!localStorage.getItem("projectsLocal")) {
  localStorage.setItem("projectsLocal", JSON.stringify(projects));
}

function renderProjects(projects) {
  projectsContainer.innerHTML = "";
  projects.forEach(p => {
    const card = document.createElement("project-card");
    card.setAttribute("title", p.title);
    card.setAttribute("img", p.img);
    card.setAttribute("alt", p.alt);
    card.setAttribute("desc", p.desc);
    card.setAttribute("skills", p.skills);
    card.setAttribute("link", p.link);
    projectsContainer.appendChild(card);
  });
};

const REMOTE_URL = "https://api.jsonbin.io/v3/b/692fcd57ae596e708f800447/latest"

// event delegation by adding 1 event listener rather than 2 for each btn
buttonsContainer.addEventListener("click", async function (e) {
    const btn = e.target.closest("button");
    if (!btn) return;

    if (btn.id === "load-local") {
        const stored = localStorage.getItem("projectsLocal");
        if (!stored) return console.warn("projectsLocal not in local storage");
        renderProjects(JSON.parse(stored));
    }

    if (btn.id === "load-remote") {
        try {
            const res = await fetch(REMOTE_URL);
            if (!res.ok) throw new Error("Failed to fetch");
            renderProjects((await res.json()).record);
        } catch (err) {
            console.error("Remote load error:", err);
        }
    }
});
