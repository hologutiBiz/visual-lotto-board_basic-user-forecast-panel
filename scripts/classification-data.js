export async function fetchClassificationChart() {
    showLoading("Loading...");

    try {
        const res = await fetch("https://lotto-classification-api.netlify.app/.netlify/functions/classification")
        if(!res.ok) throw new Error(`fetch failded: ${res.status}`);
            
        const data = await res.json();
        if (!data || !data.one_to_fortyfive) throw new Error("No valid data received");

        const fillTable = (dataset, tbodyId) => {
            const tbody = document.getElementById(tbodyId);
            dataset.forEach(num => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="num">${num.number}</td>
                    <td>${num.counterpart}</td>
                    <td>${num.bonanza}</td>
                    <td>${num.malta}</td>
                    <td>${num.stringkey}</td>
                    <td>${num.shadow}</td>
                    <td>${num.partner}</td>
                    <td>${num.equivalent}</td>
                    <td>${num.code}</td>
                    <td>${num.turning}</td>
                `;

                tbody.appendChild(row);
            });
        };

        fillTable(data.one_to_fortyfive, "oneToFortyfive");
        fillTable(data.fortysix_to_ninety, "fortysixToNinety");
    
    } catch (err) {
        console.error("🔥 Classification fetch failed:", err);

        const chartError = document.querySelector(".chart-error");
        const chartContainer = document.querySelector(".lcc-data-container");

        if (chartError && chartContainer) {
            chartContainer.style.display = "none";

            if (err.message.includes("CORS")) {
                chartError.textContent = "Server Error: Failed to load Chart data due to Restriction policy";
            } else if (err.message.includes("403")) {
                chartError.textContent = "Access denied. Please log in to continue.";
            } else {
                chartError.textContent = "Failed to load classification chart. Please try again later.";
            }

            chartError.style.display = "block";
        }
    } finally {
        hideLoading();
  }
}