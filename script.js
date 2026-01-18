import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://fmesivvwhqitrmlbwcdb.supabase.co";
const supabaseKey = "sb_publishable_kSmSt52th8XAYGbce3CtwA_uIdN8fKL";

const supabase = createClient(supabaseUrl, supabaseKey);
const table = document.querySelector("table");
const buttonShowList = document.querySelector("#buttonShowList");
const searchInput = document.querySelector("#search");

// Example of the APP
function example() {
  table.innerHTML = `<tr>
    <th>Nazwisko</th>
    <th>Imię</th>
    <th>Rok Ukończenia</th>
    <th>Dodatkowe informacje</th>
    `;
  createData("Jan", "Kowalski", "2004", "Członek samorządu szkolnego");
  createData("Anna", "Nowak", "2008", "Organizatorka szkolnych wydarzeń");
  createData(
    "Piotr",
    "Wiśniewski",
    "1999",
    "Uczestnik konkursów informatycznych",
  );
  createData(
    "Katarzyna",
    "Zielińska",
    "2012",
    "Aktywna w szkolnym wolontariacie",
  );
  createData("Michał", "Kamiński", "1995", "Kapitan drużyny sportowej");
}

function createData(name, surname, graduation, addInfo) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
  <td>${surname}</td>
  <td>${name}</td>
  <td>${graduation}</td>
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

  table.innerHTML = `<tr>
    <th>Nazwisko</th>
    <th>Imię</th>
    <th>Rok Ukończenia</th>
    <th>Dodatkowe informacje</th>
    `;
  data.forEach((guest) => {
    createData(guest.name, guest.surname, guest.graduation, guest.add_info);
  });
}

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

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  const rows = table.querySelectorAll("tr");

  rows.forEach((row, index) => {
    if (index == 0) return;

    const rowText = row.textContent.toLowerCase();

    row.style.display = rowText.includes(query) ? "" : "none";
  });
});
