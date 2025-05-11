async function display(data,dept,sem){
    const portion = document.getElementsByClassName("leaderboard-table")[0];
   
    while (portion.rows.length > 1) {
        portion.deleteRow(1);
    }

    data.forEach(i => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i.rank ?? '-'}</td>
            <td>${i.name ?? '-'}</td>
            <td>${dept}</td>
            <td>${i.year}</td>
            <td>${i.cgpa?.[sem] ?? '-'}</td>
        `;
        portion.appendChild(row);
    });
}

async function filter(){
    const dept=document.getElementById("departmentFilter").value;
    const year=document.getElementById("yearFilter").value;
    const s=document.getElementById("semesterFilter").value;
    let sem;
    if(s){
        sem = ((year-1)*2)+s;
    }
    const data={dept:dept,year:year,sem:sem};
    const params = new URLSearchParams({ dept, year, sem }); 
     const result=await fetch(`http://localhost:5000/getdata?${params.toString()}`,{
        method:'GET',
        headers: {
            'Content-Type':'application/json'
        },
    });
    students=await result.json();
    console.log("Fetched data:", data);
    display(students,dept,sem);
}
document.getElementById("departmentFilter").addEventListener("change",filter);
document.getElementById("yearFilter").addEventListener("change",filter);
document.getElementById("semesterFilter").addEventListener("change",filter);

window.onload = filter;