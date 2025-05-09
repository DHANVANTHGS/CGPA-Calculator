const dept=document.getElementById("departmentFilter").value;
const year=document.getElementById("yearFilter").value;
const s=document.getElementById("semesterFilter").value;
const sem=((year-1)*2)+s;
const portion = document.getElementByClassName("leaderboard-table")[0];
const data={dept:dept,year:year,sem:sem};
const params = new URLSearchParams({ dept, year, sem }); 
fetch(`http://localhost:5000/getdata?${params.toString()}`,{
        method :'GET',
        headers: {
            'Content-Type': 'application/json'
        },
}).then(response=>response.json())
.then(result=>{
    result.forEach(i => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i.rank ?? '-'}</td>
            <td>${i.name ?? '-'}</td>
            <td>${s}</td>
            <td>${year}</td>
            <td>${i.cgpa?.[sem] ?? '-'}</td>
        `;
        portion.appendChild(row);
    })
})