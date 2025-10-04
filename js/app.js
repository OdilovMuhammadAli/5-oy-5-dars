import {
  elContainer,
  elForm,
  elLoader,
  elTemplateCard,
  elToastContainer,
} from "./html-elements.js";
import { toast } from "./toast.js";

function ui(cars) {
  elContainer.innerHTML = "";
  cars.forEach((element) => {
    const clone = elTemplateCard.cloneNode(true).content;
    const elTitle = clone.querySelector("h2");
    const elDescription = clone.querySelector("p");
    const elDeleteButton = clone.querySelector(".delete-js");

    // Content
    elTitle.innerText = element.name;
    elDescription.innerText = element.description;
    elDeleteButton.id = element.id;

    elContainer.appendChild(clone);
  });
}

function init() {
  elLoader.style.display = "block";
  fetch("https://json-api.uz/api/project/fn43/cars")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      ui(res.data);
    })
    .catch(() => {
      alert("Xotolik bor");
    })
    .finally(() => {
      elLoader.style.display = "none";
    });
}
function deleteCars(id) {
  fetch(`https://json-api.uz/api/project/fn43/cars/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      return res.text;
    })
    .then((res) => {
      // ui(res.data);
      toast(res);
      elContainer.innerHTML = "";
      init();
    });
  // .catch(() => {})
  // .finally(() => {
  //   elLoader.style.display = "none";
  // });
}
function addCars(car) {
  fetch("https://json-api.uz/api/project/fn43/cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      elContainer.innerHTML = "";
      init();
    });
}
init();

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(elForm);
  const result = {};
  formData.forEach((value, key) => {
    console.log(key, value);
    result[key] = value;
  });
  addCars(result);
});

elContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-js")) {
    if (confirm("Ochirasmi?qolis teymadimi?")) {
      e.target.innerHTML = "Loading...";
      deleteCars(e.target.id);
    }
  }
});
