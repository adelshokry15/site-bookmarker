var siteName = document.querySelector("#siteName");
var siteURL = document.querySelector("#siteURL");
var insert = document.querySelector("#insert");
var closeBtn = document.getElementById("closeBtn");
var overlay = document.querySelector(".overlay");
var list;
if (localStorage.getItem("list")) {
  list = JSON.parse(localStorage.getItem("list"));
  display();
} else {
  list = [];
}
function display() {
  var cartona = "";
  for (let i = 0; i < list.length; i++) {
    cartona += `<tr>
              <td class="align-middle">${i + 1}</td>
              <td class="align-middle">${list[i].name}</td>
              <td>
                <button onclick="visitWebsite(this.dataset.index)" class="btn btn-success btn-visit" data-index="${i}">
                  <i class="fa-solid fa-eye pe-2"></i> Visit
                </button>
              </td>
              <td>
                <button class="btn btn-danger" onclick="deleteP(${i})">
                  <a href="" class="text-white text-decoration-none"
                    ><i class="fa-solid fa-trash-can pe-2"></i> Delete</a
                  >
                </button>
              </td>
            </tr>`;
  }
  insert.innerHTML = cartona;
}
function addSite() {
  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    var site = {
      name: siteName.value.charAt(0).toUpperCase() + siteName.value.slice(1),
      siteURL: siteURL.value,
    };
    list.push(site);
    localStorage.setItem("list", JSON.stringify(list));
    clearForm();
    display();
  } else {
    overlay.classList.remove("d-none");
  }
}
function clearForm() {
  siteName.value = "";
  siteURL.value = "";
  siteName.classList.remove("is-valid");
  siteName.classList.remove("is-invalid");
  siteURL.classList.remove("is-valid");
  siteURL.classList.remove("is-invalid");
}
function deleteP(i) {
  list.splice(i, 1);
  display();
  localStorage.setItem("list", JSON.stringify(list));
}
function validateName(value) {
  var regex = new RegExp("\\S{3,}", "gi");
  if (regex.test(value)) {
    console.log("hi");
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
  } else {
    console.log("by");
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
  }
}
function validateSite(value) {
  var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  if (urlRegex.test(value)) {
    console.log("hi");
    siteURL.classList.add("is-valid");
    siteURL.classList.remove("is-invalid");
  } else {
    console.log("by");
    siteURL.classList.add("is-invalid");
    siteURL.classList.remove("is-valid");
  }
}

function visitWebsite(e) {
  var websiteIndex = e;
  var httpsRegex = /^https?:\/\//;
  // console.log(e.target.dataset.index);
  if (httpsRegex.test(list[websiteIndex].siteURL)) {
    open(list[websiteIndex].siteURL);
  } else {
    open(`https://${list[websiteIndex].siteURL}`);
  }
}

function closeModal() {
  overlay.classList.add("d-none");
}

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeModal();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("overlay")) {
    closeModal();
  }
});
