const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sName = document.querySelector('#m-name');
const sPosition = document.querySelector('#m-position');
const sSalary = document.querySelector('#m-salary');
const btnSave = document.querySelector('#btnSave');
const employeeCountElement = document.querySelector('#employeeCount');

let items;
let id;
let employeeCount = 0; // Counter variable for total employees

function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  };

  if (edit) {
    sName.value = items[index].name;
    sPosition.value = items[index].position;
    sSalary.value = items[index].salary;
    id = index;
  } else {
    sName.value = '';
    sPosition.value = '';
    sSalary.value = '';
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  items.splice(index, 1);
  setItemsInLocalStorage();
  loadItems();
  updateEmployeeCount();
}

function insertItem(item, index) {
  let tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.position}</td>
    <td>$ ${item.salary}</td>
    <td class="action">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="action">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;
  tbody.appendChild(tr);
}

btnSave.onclick = e => {
  if (sName.value === '' || sPosition.value === '' || sSalary.value === '') {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    items[id].name = sName.value;
    items[id].position = sPosition.value;
    items[id].salary = sSalary.value;
  } else {
    items.push({'name': sName.value, 'position': sPosition.value, 'salary': sSalary.value});
  }

  setItemsInLocalStorage();

  modal.classList.remove('active');
  loadItems();
  updateEmployeeCount();
  id = undefined;
};

function loadItems() {
  items = getItemsFromLocalStorage();
  tbody.innerHTML = '';
  items.forEach((item, index) => {
    insertItem(item, index);
  });
  updateEmployeeCount();
}

const getItemsFromLocalStorage = () => JSON.parse(localStorage.getItem('dbfunc')) || [];
const setItemsInLocalStorage = () => localStorage.setItem('dbfunc', JSON.stringify(items));

function updateEmployeeCount() {
  employeeCount = items.length;
  employeeCountElement.innerText = employeeCount;
}

loadItems();
