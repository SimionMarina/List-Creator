let mainSection = document.getElementById("main_section");
let listNameInput = document.getElementById("list_name_input");
listNameInput.addEventListener("click", (e) => RemoveInvalidInputStyle(e));

window.addEventListener("load", () => {
  const savedContent = localStorage.getItem("mainSectionContent");
  if (savedContent) {
    mainSection.innerHTML = savedContent;
    // Add event listeners to the dynamically created elements 
    reassignEventListeners();
  }
});

function AddList() {
  let listName = listNameInput.value;

  if (listNameInput.value !== "") {
    // Create elements
    let listContainer = document.createElement("div");
    let listTitle = document.createElement("h2");
    listTitle.innerText = listName;
    let removeListButton = document.createElement("button");
    removeListButton.textContent = "Remove";

    let itemInput = document.createElement("input");
    itemInput.setAttribute("id", "item_input");
    itemInput.addEventListener("click", RemoveInvalidInputStyle);

    let addItemButton = document.createElement("button");
    addItemButton.textContent = "Add item";

    let itemsList = document.createElement("ul");

    //Add classes on elements
    listContainer.classList.add("list_container");
    listTitle.classList.add("list_title");
    removeListButton.classList.add("remove_list_button");
    itemInput.classList.add("item_input");
    addItemButton.classList.add("add_item_button");

    //Add elements in dom
    listContainer.appendChild(listTitle);
    listContainer.appendChild(removeListButton);
    listContainer.appendChild(itemInput);
    listContainer.appendChild(addItemButton);
    listContainer.appendChild(itemsList);

    mainSection.appendChild(listContainer);

    //Add events on buttons
    removeListButton.addEventListener("click", RemoveList);
    addItemButton.addEventListener("click", (e) => AddItemList(e, itemsList));

    //Convert the HTML content to a string and store it in localStorage
    localStorage.setItem("mainSectionContent", mainSection.innerHTML);
    
  } else {
    //Style for empty inputs
    listNameInput.style.border = "2px solid red";
    listNameInput.placeholder = "Choose a name";
  }
}

function AddItemList(e, list) {
  let listContainer = e.target.parentElement;
  let itemInput = listContainer.querySelector("#item_input");
  let itemInputValue = itemInput.value;

  if (itemInputValue !== "") {
    // Create elements
    let listItem = document.createElement("li");

    let listItemParagraph = document.createElement("p");
    listItemParagraph.innerText = itemInputValue;
    listItemParagraph.classList.add("list_item");

    let deleteItemButton = document.createElement("button");
    deleteItemButton.textContent = "X";
    deleteItemButton.classList.add("delete_item_button");
    deleteItemButton.addEventListener("click", (e) => RemoveItemList(e, list));

    //Add elements in dom
    listItem.appendChild(listItemParagraph);
    listItem.appendChild(deleteItemButton);
    list.appendChild(listItem);
    listContainer.appendChild(list);

     //Store content in localStorage
    localStorage.setItem("mainSectionContent", mainSection.innerHTML);
    
  } else {
    //Style for empty inputs
    itemInput.style.border = "2px solid red";
    itemInput.placeholder = "Choose a name";
  }
}

function removeAllLists() {
  let listContainers = document.querySelectorAll(".list_container");
  listContainers.forEach((container) => {
    container.remove();
  });

  localStorage.setItem("mainSectionContent", mainSection.innerHTML);
  reassignEventListeners();
}

function RemoveItemList(e, itemContainer) {
  let listParagraph = e.target.parentElement;
  itemContainer.removeChild(listParagraph);

  localStorage.setItem("mainSectionContent", mainSection.innerHTML);
}

function RemoveList(e) {
  let listContainer = e.target.parentElement;
  mainSection.removeChild(listContainer);

  localStorage.setItem("mainSectionContent", mainSection.innerHTML);
  reassignEventListeners();
}

function RemoveInvalidInputStyle(event) {
  let input = event.target;
  input.style.border = "2px solid #72c2e9";
  input.placeholder = " ";
  input.value = "";
}

function reassignEventListeners() {
  // Reassign event listeners to specific elements
  document.querySelectorAll(".remove_list_button").forEach((button) => {
    button.addEventListener("click", RemoveList);
  });

  document.querySelectorAll(".add_item_button").forEach((button) => {
    const itemsList = button.parentElement.querySelector("ul");
    button.addEventListener("click", (e) => AddItemList(e, itemsList));
  });

  document.querySelectorAll(".delete_item_button").forEach((button) => {
    const listItem = button.parentElement;
    const list = listItem.parentElement;
    button.addEventListener("click", (e) => RemoveItemList(e, list));
  });
}
