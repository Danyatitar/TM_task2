const add_btn = document.querySelector(".add-btn");
const remove_btn = document.querySelector(".remove-btn");
const input = document.querySelector(".input");
const box = document.querySelector(".box");
const err = document.querySelector(".error");
const clear_btn = document.querySelector(".clear-btn");

const max_length = 19;
let queue = {
  items: [],
  addIndex: 0,
  removeIndex: 0,
};

function load() {
  window.addEventListener("load", () => {
    const result = localStorage.getItem("items");
    if (result) {
      queue.items = result.split(",").map((item) => parseFloat(item));
      renderQueue(queue);
      queue.addIndex = queue.items.length;
    }
  });
}

function renderQueue(queue) {
  queue.items.forEach((item, index) => {
    addItem(item, queue, index + 1);
  });
}

function handleAdd() {
  add_btn.addEventListener("click", () => {
    if (!input.value) {
      err.classList.remove("hidden");
      err.innerHTML = "Error! Empty input!";
    } else if (queue.items.length === max_length) {
      err.classList.remove("hidden");
      err.innerHTML = "Error! Queue size is 19!";
    } else {
      err.classList.add("hidden");
      queue.items.push(input.value);
      queue.addIndex++;
      addItem(input.value, queue, queue.addIndex);
      localStorage.setItem("items", queue.items);
      input.value = null;
    }
  });
}

function handleRemove() {
  remove_btn.addEventListener("click", () => {
    if (!queue.items.length) {
      err.classList.remove("hidden");
      err.innerHTML = "Error! The Queue is already empty!";
    } else {
      err.classList.add("hidden");
      queue.removeIndex++;
      removeItem(queue);
      queue.items.shift();
      localStorage.setItem("items", queue.items);
    }
  });
}

function handleClear() {
  clear_btn.addEventListener("click", () => {
    if (queue.items.length !== 0) {
      err.classList.add("hidden");
      queue.removeIndex += queue.items.length;
      queue.items = [];
      const removedItems = document.querySelectorAll(".box-item");
      removedItems.forEach((item) => item.remove());
      localStorage.setItem("items", queue.items);
    }
  });
}

function addItem(value, queue, index) {
  const queueItem = document.createElement("p");
  queueItem.classList.add("box-item");
  queueItem.classList.add(`item-${index}`);
  queueItem.innerHTML = value;
  box.append(queueItem);
}

function removeItem(queue) {
  document.querySelector(`.item-${queue.removeIndex}`).remove();
}

const main = () => {
  load();
  handleAdd();
  handleRemove();
  handleClear();
};

main();
