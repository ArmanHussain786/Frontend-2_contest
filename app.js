const apiUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function renderGridView(cryptoData) {
  const gridViewContainer = document.getElementById("grid-view");
  gridViewContainer.innerHTML = "";

  cryptoData.forEach((crypto) => {
    const card = document.createElement("div");
    card.className = "card";

    const image = document.createElement("img");
    image.src = crypto.image;
    image.alt = crypto.name;
    card.appendChild(image);

    const name = document.createElement("p");
    name.textContent = crypto.name;
    card.appendChild(name);

    const price = document.createElement("p");
    price.textContent = `$${crypto.current_price.toFixed(2)}`;
    card.appendChild(price);

    const marketCap = document.createElement("p");
    marketCap.textContent = `Market Cap: $${crypto.market_cap.toLocaleString()}`;
    card.appendChild(marketCap);

    const priceChange = document.createElement("p");
    priceChange.textContent = `24h Change: ${crypto.price_change_percentage_24h.toFixed(
      2
    )}%`;
    card.appendChild(priceChange);

    gridViewContainer.appendChild(card);
  });
}

function renderListView(cryptoData) {
  const listViewContainer = document.getElementById("list-view");
  listViewContainer.innerHTML = "";

  const table = document.createElement("table");
  table.className = "table";

  const headerRow = document.createElement("tr");
  const headers = ["Name", "Price (USD)", "Market Cap", "24h Change"];
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  cryptoData.forEach((crypto) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = crypto.name;
    row.appendChild(nameCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = `$${crypto.current_price.toFixed(2)}`;
    row.appendChild(priceCell);

    const marketCapCell = document.createElement("td");
    marketCapCell.textContent = `$${crypto.market_cap.toLocaleString()}`;
    row.appendChild(marketCapCell);

    const priceChangeCell = document.createElement("td");
    priceChangeCell.textContent = `${crypto.price_change_percentage_24h.toFixed(
      2
    )}%`;
    row.appendChild(priceChangeCell);

    table.appendChild(row);
  });

  listViewContainer.appendChild(table);
}

function updateActiveTab(tabId) {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    if (tab.id === tabId) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const gridViewTab = document.getElementById("grid-view-tab");
  const listViewTab = document.getElementById("list-view-tab");

  gridViewTab.addEventListener("click", async () => {
    updateActiveTab("grid-view-tab");
    const cryptoData = await fetchData();
    if (cryptoData) {
      renderGridView(cryptoData);
    }
  });

  listViewTab.addEventListener("click", async () => {
    updateActiveTab("list-view-tab");
    const cryptoData = await fetchData();
    if (cryptoData) {
      renderListView(cryptoData);
    }
  });

  // Initial rendering
  const cryptoData = await fetchData();
  if (cryptoData) {
    renderGridView(cryptoData);
  }
});
