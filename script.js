import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://fmesivvwhqitrmlbwcdb.supabase.co";
const supabaseKey = "sb_publishable_kSmSt52th8XAYGbce3CtwA_uIdN8fKL";

const supabase = createClient(supabaseUrl, supabaseKey);
const table = document.querySelector("table");
const buttonShowList = document.querySelector("#buttonShowList");

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
