import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://fmesivvwhqitrmlbwcdb.supabase.co";
const supabaseKey = "sb_publishable_kSmSt52th8XAYGbce3CtwA_uIdN8fKL";

const supabase = createClient(supabaseUrl, supabaseKey);
const table = document.querySelector("table");
const buttonShowList = document.querySelector("#buttonShowList");
const buttonSignOut = document.querySelector("#buttonSignOut");
const buttonBackup = document.querySelector("#buttonBackup");
const searchInput = document.querySelector("#search");
const selectSort = document.querySelector("#selectSort");
const resultsP = document.querySelector("#amountFound");
const paidP = document.querySelector("#paidFound");
let resultsAmount = 0;
let paidOnly = 0;
let isFetchingData = false;

document.addEventListener("DOMContentLoaded", function () {
  selectSort.value = "1";
});

// Example of the APP
function example() {
  resultsAmount = 0;
  paidOnly = 0;
  table.innerHTML = `
  <thead>
    <tr>
      <th></th>
      <th class="additional cash">$</th>
      <th>Nazwisko</th>
      <th>Imię</th>
      <th>Rok Ukończenia</th>
      <th>Kontakt</th>
      <th class="additional">Dodatkowe informacje</th>
      <th>Edukacja</th>
      <th>Zawód</th>
      <th>Kraj pracy</th>

    `;
  createData(
    undefined,
    false,
    "Jan",
    "Kowalski",
    "2004",
    "jan.kowalski@gmail.com",
    "Członek samorządu szkolnego",
    "Politechnika Warszawska – Informatyka",
    "Programista",
    "Polska",
  );

  createData(
    undefined,
    true,
    "Anna",
    "Nowak",
    "2008",
    "kontakt@gmail.com",
    "Organizatorka szkolnych wydarzeń",
    "Uniwersytet Warszawski – Zarządzanie",
    "Project Manager",
    "Niemcy",
  );

  createData(
    undefined,
    true,
    "Piotr",
    "Wiśniewski",
    "1999",
    "kontakt@gmail.com",
    "Uczestnik konkursów informatycznych",
    "AGH – Informatyka",
    "Inżynier oprogramowania",
    "USA",
  );

  createData(
    undefined,
    false,
    "Katarzyna",
    "Zielińska",
    "2012",
    "kontakt@gmail.com",
    "Aktywna w szkolnym wolontariacie",
    "Uniwersytet Jagielloński – Psychologia",
    "Psycholog",
    "Polska",
  );

  createData(
    undefined,
    true,
    "Michał",
    "Kamiński",
    "1995",
    "kontakt@gmail.com",
    "Kapitan drużyny sportowej",
    "AWF – Wychowanie fizyczne",
    "Trener personalny",
    "Wielka Brytania",
  );

  resultsP.innerHTML = `<p>Znaleziono: ${resultsAmount}`;
  paidP.innerHTML = `<p>Opłaconych: ${paidOnly}`;
}

function createCell(text, className = "") {
  const td = document.createElement("td");
  td.textContent = text ?? "";
  if (className) td.className = className;
  return td;
}

function createIsPaidCell(isPaid) {
  const td = document.createElement("td");
  td.className = "additional cash";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "isPaid";
  checkbox.checked = isPaid;

  td.appendChild(checkbox);

  return td;
}

function formatName(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function createData(
  id,
  is_paid,
  name,
  surname,
  graduation,
  contact,
  addInfo,
  school,
  profession,
  work_country,
) {
  const tr = document.createElement("tr");
  tr.classList.add("tr-data");
  tr.dataset.id = id;

  const tdButton = document.createElement("td");
  const button = document.createElement("button");
  button.className = "btn-delete";
  button.type = "button";
  button.textContent = "USUŃ";
  tdButton.appendChild(button);
  resultsAmount++;
  const isPaid = is_paid === true || is_paid === "true";
  if (isPaid) {
    paidOnly++;
  }

  tr.appendChild(tdButton);
  tr.appendChild(createIsPaidCell(isPaid));
  tr.appendChild(createCell(formatName(surname)));
  tr.appendChild(createCell(formatName(name)));
  tr.appendChild(createCell(graduation, "td-graduation"));
  tr.appendChild(createCell(contact, "td-graduation"));
  tr.appendChild(createCell(addInfo, "additional"));
  tr.appendChild(createCell(school));
  tr.appendChild(createCell(profession));
  tr.appendChild(createCell(work_country));

  table.appendChild(tr);
}

async function getData() {
  if (isFetchingData) return;
  isFetchingData = true;
  try {
    table.innerHTML = "";
    resultsAmount = 0;
    paidOnly = 0;
    const { data, error } = await supabase
      .from("guest_data")
      .select(
        "id, is_paid, name, surname, graduation, contact, add_info, school, profession, work_country",
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
      <th class="additional cash">$</th>
      <th>Nazwisko</th>
      <th>Imię</th>
      <th>Rok Ukończenia</th>
      <th>Kontakt</th>
      <th class="additional">Dodatkowe informacje</th>
      <th>Edukacja</th>
      <th>Zawód</th>
      <th>Kraj pracy</th>

    </tr>
  </thead>
    `;
    data.forEach((guest) => {
      createData(
        guest.id,
        guest.is_paid,
        guest.name,
        guest.surname,
        guest.graduation,
        guest.contact,
        guest.add_info,
        guest.school,
        guest.profession,
        guest.work_country,
      );
    });
    resultsP.innerHTML = `<p>Znaleziono: ${resultsAmount}`;
    paidP.innerHTML = `<p>Oplaciło: ${paidOnly}`;
  } finally {
    isFetchingData = false;
  }
}
// Sign Out + onAuth
function clearAdminView() {
  table.innerHTML = "";
  searchInput.value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#password").value = "";
}

async function signOut() {
  const { error } = await supabase.auth.signOut();
  table.innerHTML = ``;
}

supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_OUT" || !session) {
    clearAdminView();
    return;
  }

  if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
    getData();
  }
});

async function initAuth() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return;
  } else {
    clearAdminView();
  }
}

initAuth();

buttonSignOut.addEventListener("click", () => {
  signOut();
  clearAdminView();
});
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
  // sort by name
  if (selectSort.value === "1") {
    const rows = Array.from(document.querySelectorAll(".tr-data"));

    rows.sort((a, b) => {
      const surnameA = a.children[2].textContent;
      const surnameB = b.children[2].textContent;

      return surnameA.localeCompare(surnameB, "pl");
    });

    rows.forEach((row) => {
      table.appendChild(row);

      row.style.display = "";
    });
  }
  // sort by year
  if (selectSort.value === "2") {
    const rows = Array.from(document.querySelectorAll(".tr-data"));

    rows.sort((a, b) => {
      const yearA = Number(a.children[4].textContent);
      const yearB = Number(b.children[4].textContent);

      return yearA - yearB;
    });

    rows.forEach((row) => {
      table.appendChild(row);

      row.style.display = "";
    });
  }
  // sort by paid
  if (selectSort.value === "3") {
    const rows = Array.from(document.querySelectorAll(".tr-data"));

    rows.forEach((row) => {
      const checkbox = row.querySelector(".isPaid");
      row.style.display = checkbox && checkbox.checked ? "" : "none";
    });
  }

  // sort by not paid
  if (selectSort.value === "4") {
    const rows = Array.from(document.querySelectorAll(".tr-data"));

    rows.forEach((row) => {
      const checkbox = row.querySelector(".isPaid");
      row.style.display = checkbox && !checkbox.checked ? "" : "none";
    });
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

async function saveIsPaid(id, isPaid) {
  const { error } = await supabase
    .from("guest_data")
    .update({ is_paid: isPaid })
    .eq("id", id);

  if (error) {
    console.error(error);
    alert("Wystąpił błąd");
    return false;
  }

  return true;
}

document.addEventListener("change", async (e) => {
  if (!e.target.classList.contains("isPaid")) return;

  const checkbox = e.target;
  const row = checkbox.closest("tr");
  const id = row.dataset.id;
  const newValue = checkbox.checked;

  const success = await saveIsPaid(id, newValue);

  if (!success) {
    checkbox.checked = !newValue;
  }
});

// BACCKUP
async function exportBackupCsv() {
  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("guest_data")
    .select(
      "id, is_paid, name, surname, graduation, contact, add_info, school, profession, work_country",
    )
    .order("surname", { ascending: true })
    .csv();

  if (error) {
    console.error(error);
    alert("Nie udało się pobrać backupu CSV.");
    return;
  }

  const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `guest_data_backup_${today}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

buttonBackup.addEventListener("click", async () => {
  await exportBackupCsv();
});
