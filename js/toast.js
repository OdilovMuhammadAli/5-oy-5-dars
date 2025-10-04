import { elToastContainer } from "./html-elements.js";

export function toast(text) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  const p = document.createElement("p");
  const span = document.createElement("span");
  li.append(p, button, span);
  span.style.cssText = `
    display:block;
    transition:width 0.1ms ease;
    position:absolute;
    bottom:0;
    height:2px;
    width:100%;
    background-color:black;
`;
  li.style.position = "relative";
  p.innerText = text;

  button.innerText = "Close";
  button.addEventListener("click", (e) => {
    e.target.parentElement.remove();
  });

  const id = setInterval(() => {
    const array = span.style.width.split("");
    array.pop();
    const num = Number(array.join(""));
    if (num === 0) {
      clearInterval(id);
      li.remove();
    } else {
      span.style.width = `${num - 1}%`;
    }
  }, 30);
  setTimeout(() => {
    li.remove();
  }, 3000);

  elToastContainer.appendChild(li);
}
