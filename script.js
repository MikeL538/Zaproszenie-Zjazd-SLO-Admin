import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://fmesivvwhqitrmlbwcdb.supabase.co";
const supabaseKey = "sb_publishable_kSmSt52th8XAYGbce3CtwA_uIdN8fKL";

const supabase = createClient(supabaseUrl, supabaseKey);
const table = document.querySelector("table");
const buttonShowList = document.querySelector("#buttonShowList");
const buttonSignOut = document.querySelector("#buttonSignOut");
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
      <th class="additional">Dodatkowe informacje</th>
      <th>Edukacja</th>
      <th>Zawód</th>
      <th>Kraj pracy</th>
    `;
  createData(
    1,
    "Jan",
    "Kowalski",
    "2004",
    "Członek samorządu szkolnego",
    "Politechnika Warszawska – Informatyka",
    "Programista",
    "Polska",
    false,
  );

  createData(
    2,
    "Anna",
    "Nowak",
    "2008",
    "Organizatorka szkolnych wydarzeń",
    "Uniwersytet Warszawski – Zarządzanie",
    "Project Manager",
    "Niemcy",
    false,
  );

  createData(
    3,
    "Piotr",
    "Wiśniewski",
    "1999",
    "Uczestnik konkursów informatycznych",
    "AGH – Informatyka",
    "Inżynier oprogramowania",
    "USA",
    false,
  );

  createData(
    4,
    "Katarzyna",
    "Zielińska",
    "2012",
    "Aktywna w szkolnym wolontariacie",
    "Uniwersytet Jagielloński – Psychologia",
    "Psycholog",
    "Polska",
    false,
  );

  createData(
    5,
    "Michał",
    "Kamiński",
    "1995",
    "Kapitan drużyny sportowej",
    "AWF – Wychowanie fizyczne",
    "Trener personalny",
    "Wielka Brytania",
    false,
  );
}

function createData(
  id,
  name,
  surname,
  graduation,
  addInfo,
  school,
  profession,
  work_country,
  isPaid,
) {
  const tr = document.createElement("tr");
  tr.classList.add("tr-data");
  tr.dataset.id = id;

  tr.innerHTML = `
  <td><button class="btn-delete" type="button">USUŃ</BUTTON>
  <td>${surname.charAt(0).toUpperCase() + surname.slice(1).toLowerCase()}</td>
  <td>${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</td>
  <td class="td-graduation">${graduation}</td>
  <td class="additional">${addInfo}</td>
  <td>${school}</td>
  <td>${profession}</td>
  <td>${work_country}</td>
  <td class="additional"><input type="checkbox"></td>
  `;
  // ===================================================== ^^^

  table.appendChild(tr);
}

async function getData() {
  table.innerHTML = "";

  const { data, error } = await supabase
    .from("guest_data")
    .select(
      "id, name, surname, graduation, add_info, e_mail, school, profession, work_country",
    )
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
      <th class="additional">Dodatkowe informacje</th>
      <th>Edukacja</th>
      <th>Zawód</th>
      <th>Kraj pracy</th>
      <th class="additional">$</th>
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
      guest.school,
      guest.profession,
      guest.work_country,
      // guest.isPaid, ================================================
    );
  });
}

async function signOut() {
  const { error } = await supabase.auth.signOut();
  table.innerHTML = ``;
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

buttonSignOut.addEventListener("click", () => {
  signOut();
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  email.value = "";
  password.value = "";
  searchInput.value = "";
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

      return yearA - yearB;
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
