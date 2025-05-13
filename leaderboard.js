async function display(data,dept,sem){
    const portion = document.getElementsByClassName("leaderboard-table")[0];
    while (portion.rows.length > 1) {
        portion.deleteRow(1);
    }
    let cgpa;
    let rank=1;
    let count=0,sum=0,high;
    data.forEach(i => {
        const row = document.createElement('tr');
        if(sem){
            cgpa=i.cgpa?.[sem-1]; 
            console.log(cgpa);
            console.log(sem);
        }
        else{
            cgpa=i.c_cgpa;
        }
        if(rank==1){
            high = cgpa;
        }
        row.innerHTML = `
            <td>${rank}</td>
            <td>${i.name ?? '-'}</td>
            <td>${dept}</td>
            <td>${i.year}</td>
            <td>${cgpa}</td>
        `;
        portion.appendChild(row);
        rank++;
        count++;
        sum+=cgpa;
    });
    const avg=document.getElementById("averageCGPA").innerText=(sum/count);
    const highest=document.getElementById("highestCGPA").innerText=high;
    const total=document.getElementById("totalStudents").innerText=data.length;
}

async function filter(){
    const dept=document.getElementById("departmentFilter").value;
    const year=document.getElementById("yearFilter").value;
    const s=document.getElementById("semesterFilter").value;
    let sem;
    if(s){
        sem = ((year-1)*2)+s;
        console.log(sem);
    }
    const params = new URLSearchParams({ dept, year, sem }); 
     const result=await fetch(`http://localhost:5000/getdata?${params.toString()}`,{
        method:'GET',
        headers: {
            'Content-Type':'application/json'
        },
        credentials: "include"
    });
    students=await result.json();
    const rank=document.getElementsByClassName("ranking-info")[0];
    console.log(students.rank);
    if(students.rank!=-1){
        
        rank.innerHTML="";
        const your_rank= document.createElement('h2');
        your_rank.innerText=students.rank;
        rank.appendChild(your_rank);
    }
    display(students.data,dept,sem);
}
document.getElementById("departmentFilter").addEventListener("change",filter);
document.getElementById("yearFilter").addEventListener("change",filter);
document.getElementById("semesterFilter").addEventListener("change",filter);

window.onload = filter;