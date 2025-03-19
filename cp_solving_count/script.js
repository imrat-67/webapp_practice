const handle = "imrat_67";
const platforms = [
    { name: "Codeforces", url: `https://codeforces.com/profile/${handle}`, api: `https://codeforces.com/api/user.status?handle=${handle}`},
    { name: "LeetCode", url: `https://leetcode.com/${handle}/`, api: `https://leetcode-stats-api.herokuapp.com/${handle}` },
    { name: "AtCoder", url: `https://atcoder.jp/users/${handle}`, api: `https://corsproxy.io/?https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=${handle}` },
    { name: "LightOJ", url: `https://corsproxy.io/?url=https://cses.fi/problemset/user/130177/`, api: "" },
    { name: "CSES", url: `https://cses.fi/user/${handle}`, api: "" }, // No public API
    { name: "CodeChef", url: `https://www.codechef.com/users/${handle}`, api: `https://corsproxy.io/?https://competitiveprogramming-api.vercel.app/api/codechef/${handle}` },
    { name: "SPOJ", url: `https://www.spoj.com/users/${handle}/`, api: `https://corsproxy.io/?https://competitiveprogramming-api.vercel.app/api/spoj/${handle}` },
    { name: "Timus", url: `https://acm.timus.ru/author.aspx?id=${handle}`, api: "" }, // No public API
    { name: "HackerRank", url: `https://www.hackerrank.com/${handle}`, api: "" }, // No public API
    { name: "HackerEarth", url: `https://www.hackerearth.com/@${handle}`, api: "" }, // No public API
    { name: "UVA", url: `https://uhunt.onlinejudge.org/id/${handle}`, api: "" }, // Needs User ID, no direct handle lookup
    { name: "GeeksforGeeks", url: `https://auth.geeksforgeeks.org/user/${handle}/practice/`, api: "" }, // No public API
    { name: "Toph", url: `https://auth.toph.org/user/${handle}/practice/`, api: "" } // No public API
];

async function fetchSolveCount(platform) {
    try {
        
        console.log(platform.name);
        if (platform.name === "Codeforces"){
            console.log("found");
            const response = await fetch(platform.api);
            const data = await response.json();
                let solvedProblems = new Set();
                data.result.forEach(submission => {
                    if (submission.verdict === "OK") {
                        solvedProblems.add(submission.problem.name + submission.problem.rating + submission.problem.tags);
                }
            });

            return solvedProblems.size;
        } 

        if (platform.name === "LeetCode"){
            const response = await fetch(platform.api);
            const data = await response.json();
        return data.totalSolved;
        }

        if (platform.name === "AtCoder"){
            const response = await fetch(platform.api);
            const data = await response.json();
            return data.count;
        }

        if (platform.name === "Codechef") return data.fully_solved.count;
        if (platform.name === "Spoj") return data.solved;
        if (platform.name === "LightOJ"){
            let count;
            await fetch(platform.url)
            .then(response => response.text())  
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                console.log(doc);
                const solvedCountElement = doc.querySelector(".page-counts .like-count span");
                let x = solvedCountElement.textContent.trim();
                count = x;
            })
            return count;
        }
        
        return "Unknown";
    } catch (error) {
        return "Error";
    }
}

async function loadData() {
    const tbody = document.getElementById("data");
    for (const platform of platforms) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${platform.name}</td>
            <td><a href="${platform.url}" target="_blank">Profile</a></td>
            <td>Loading...</td>
        `;
        tbody.appendChild(row);

        const count = await fetchSolveCount(platform);
        row.cells[2].textContent = count;
    }
}

loadData();