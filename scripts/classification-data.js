

// load chart data
window.addEventListener("DOMContentLoaded", () => {
    fetch("https://lotto-classification-api.netlify.app/.netlify/functions/dummy")
        .then(res => {
            if(!res.ok) throw new Error(`fetch failded: ${res.status}`);
            return res.json();
        })
        .then(data => {
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
        })
        .catch (err => {
            console.error(err);
            }
        )
});