import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://fmesivvwhqitrmlbwcdb.supabase.co";
const supabaseKey = "sb_publishable_kSmSt52th8XAYGbce3CtwA_uIdN8fKL";

const supabase = createClient(supabaseUrl, supabaseKey);
const table = document.querySelector("table");
const buttonShowList = document.querySelector("#buttonShowList");
const searchInput = document.querySelector("#search");
const selectSort = document.querySelector("#selectSort");

// Example of the APP
function example() {
  table.innerHTML = `
  <thead>
    <tr>
      <th></th>
      <th>Nazwisko</th>
      <th>Imię</th>
      <th>Rok Ukończenia</th>
      <th>Dodatkowe informacje</th>
    `;
  createData(1, "Jan", "Kowalski", "2004", "Członek samorządu szkolnego");
  createData(2, "Anna", "Nowak", "2008", "Organizatorka szkolnych wydarzeń");
  createData(
    3,
    "Piotr",
    "Wiśniewski",
    "1999",
    "Uczestnik konkursów informatycznych",
  );
  createData(
    4,
    "Katarzyna",
    "Zielińska",
    "2012",
    "Aktywna w szkolnym wolontariacie",
  );
  createData(5, "Michał", "Kamiński", "1995", "Kapitan drużyny sportowej");
}

function createData(id, name, surname, graduation, addInfo) {
  const tr = document.createElement("tr");
  tr.classList.add("tr-data");
  tr.dataset.id = id;

  tr.innerHTML = `
  <td><button class="btn-delete" type="button">USUŃ</BUTTON>
  <td>${surname.toUpperCase()}</td>
  <td>${name.toUpperCase()}</td>
  <td class="td-graduation">${graduation}</td>
  <td>${addInfo}</td>
  `;

  table.appendChild(tr);
}

async function getData() {
  table.innerHTML = "";

  const { data, error } = await supabase
    .from("guest_data")
    .select("id, name, surname, graduation, add_info, e_mail")
    .order("surname", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  table.innerHTML = `
  <thead>
    <tr>
      <th></th>
      <th>Nazwisko</th>
      <th>Imię</th>
      <th>Rok Ukończenia</th>
      <th>Dodatkowe informacje</th>
    </tr>
  </thead>
    `;
  data.forEach((guest) => {
    createData(
      guest.id,
      guest.name,
      guest.surname,
      guest.graduation,
      guest.add_info,
    );
  });
}

// Logining
buttonShowList.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (email == "test" && password == "test") {
    example();
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    table.innerHTML = "";
    alert("Złe dane!");
    console.error(error);
    return;
  }

  getData();
});

// Searching
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  const rows = table.querySelectorAll("tr");

  rows.forEach((row, index) => {
    if (index == 0) return;

    const rowText = row.textContent.toLowerCase();

    row.style.display = rowText.includes(query) ? "" : "none";
  });
});

// Sort Table
selectSort.addEventListener("change", () => {
  if (selectSort.value === "1") {
    const rows = Array.from(document.querySelectorAll(".tr-data"));

    rows.sort((a, b) => {
      const surnameA = a.children[1].textContent;
      const surnameB = b.children[1].textContent;

      return surnameA.localeCompare(surnameB, "pl");
    });

    rows.forEach((row) => table.appendChild(row));
  }

  if (selectSort.value === "2") {
    const rows = Array.from(document.querySelectorAll(".tr-data"));

    rows.sort((a, b) => {
      const yearA = Number(a.children[3].textContent);
      const yearB = Number(b.children[3].textContent);

      return yearB - yearA;
    });

    rows.forEach((row) => table.appendChild(row));
  }
});

// Delete from SQL

async function deleteGuest(id) {
  const { error } = await supabase.from("guest_data").delete().eq("id", id);

  if (error) {
    console.error(error);
    alert("Błąd podczas usuwania");
    return false;
  }

  return true;
}

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const row = e.target.closest("tr");
    const id = row.dataset.id;

    if (!confirm("Czy na pewno chcesz usunąć ten wpis?")) return;

    const success = await deleteGuest(id);

    if (success) {
      row.remove();
    }
  }
});
