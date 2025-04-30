document.getElementById('addCourse').addEventListener("click",function(){
    const md=document.getElementById('courseList'); 

    const d=document.createElement('div');
    d.setAttribute('class','course-entry');
    md.appendChild(d);
     
    const dn=document.createElement('div');
    dn.setAttribute('class','course-input');
    const new_n=document.createElement('input');
    new_n.setAttribute('type','text');
    new_n.setAttribute('class','course-name');
    new_n.setAttribute('placeholder','Course Name');
    dn.appendChild(new_n);
    d.appendChild(dn);

    const dc=document.createElement('div');
    dc.setAttribute('class','course-input');
    const new_c=document.createElement('input');
    new_c.setAttribute('type','number');
    new_c.setAttribute('class','course-credits');
    new_c.setAttribute('placeholder','Credits');
    dc.appendChild(new_c);
    d.appendChild(dc);

    const dg=document.createElement('div');
    dg.setAttribute('class','course-input');
    const new_g=document.createElement('select');
    new_g.setAttribute('class','course-grade');
    const opt=[
        {value:'',text:'Select Grade'},
        {value:'4.0',text:'O(4.0)'},
        {value:'3.5',text:'A+(3.5)'},
        {value:'3.0',text:'A(3.0)'},
        {value:'2.5',text:'B+(2.5)'},
        {value:'2.0',text:'B(2.0)'},
        {value:'1.5',text:'C(1.5)'},
        {value:'1.0',text:'D(1.0)'},
        {value:'0.0',text:'F(0.0)'}
    ];

    opt.forEach(opt=>{
        const option=document.createElement('option');
        option.value=opt.value;
        option.textContent=opt.text;
        new_g.appendChild(option);
    });
    dg.appendChild(new_g);
    d.appendChild(dg);

});
document.getElementById('calculateGPA').addEventListener("click", function(){
        const c_credit=document.getElementsByClassName('course-credits');
        const c_grade=document.getElementsByClassName('course-grade');
        const len=c_credit.length;
        var numerator=0;
        var denominator=0;
        document.getElementById('resultContainer').setAttribute("style", "display: block;");
        for(var i=0;i<len;i++){
            numerator+=(parseFloat(c_credit[i].value)*parseFloat(c_grade[i].value));
            denominator+=parseFloat(c_credit[i].value);
        }
        if (denominator === 0) {
            document.getElementById("resultValue").innerHTML = "Invalid input!";
        } else {
            const result = numerator / denominator;
            document.getElementById("resultValue").innerHTML = `${result.toFixed(2)}`;
            console.log("result added");
        }
});
document.getElementById('remove').addEventListener("click",function(){
    try{
    const classEntry = document.querySelectorAll('.course-entry')
    var len =classEntry.length;
    classEntry[len-1].remove();}
    catch(err){
        console.log(err);
    }
});

document.getElementById('saveResult').addEventListener("click",function(){
    try {
        const result=document.getElementById("resultValue").innerHTML;
        const year =document.getElementById("yearFilter").value;
        const s=document.getElementById("semesterFilter").value;
        const sem=((year-1)*2)+s;
        console.log(result);
        const urlParams = new URLSearchParams(window.location.search);
        const name =urlParams.get('name');
        const data={result:result,year:year,sem:sem,name:name};
        fetch("http://localhost:5000/save",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials:"include",
            body: JSON.stringify(data)
    })
    .then(response=>response.json())
    .then(result=>{
        if (result.status===true){
            console.log("data has been saved successfully");
            alert("result has been saved");
        }
        else {
            alert('please login !');
        }
    }
    )

    } catch (error) {
        
    }
});