class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" }); // allows access to the component using .shadowRoot
  }

  connectedCallback() { // runs when custom element is added to DOM
    this.render(); // builds inside of component after its mounted
  }

  render() {
    const title = this.getAttribute("title");
    const img = this.getAttribute("img") || "";
    const alt = this.getAttribute("alt") || title;
    const desc = this.getAttribute("desc");
    const skillsAttr = this.getAttribute("skills");
    const link = this.getAttribute("link");

    const skills = skillsAttr.split(",").map(s => s.trim());

    this.root.innerHTML = `
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        :host {
          display: block;
          background-color: var(--bg-color, #080808);
          border: 2px solid var(--main-color, #1e6cb0);
          border-radius: 3rem;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 0 5px var(--main-color, #1e6cb0);
          transition: 0.3s ease;
          height: 50rem;
        }

        
        :host(:hover) {
          box-shadow: 0 0 25px var(--main-color, #1e6cb0),
          0 0 50px var(--main-color, #1e6cb0);
          transform: scale(1.02);
        }

        a {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 100%;
          height: 100%;
          padding: 5rem 2rem; 
          gap: 2rem;
          text-decoration: none;
          color: inherit;
        }

        picture img {
          max-width: 300px;
          border-radius: 2em;
          object-fit: cover;
        }

        h2 {
          font-size: 3rem;
        }

        p {
          font-size: 1.6rem;
        }

        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }

        li {
          display: inline-block;
          padding: 0.2rem 1rem;
          background-color: var(--main-color, #1e6cb0);
          border-radius: 3rem;
          font-size: 1.5rem;
          color: black;
          border: 2px solid transparent;
          font-weight: 600;
          transition: 0.3s ease-in-out;
        }
      </style>

        <a href="${link}" target="_blank">
          <picture><img src="${img}" alt="${alt}"></picture>
          <h2>${title}</h2>
          <p>${desc}</p>
          <ul>
            ${skills.map(skill => `<li>${skill}</li>`).join("")}
          </ul>
        </a>
    `;
  }
}

customElements.define("project-card", ProjectCard);

