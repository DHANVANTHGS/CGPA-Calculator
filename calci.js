document.getElementById('addCourse').addEventListener("click",function(){
    const md=document.getElementById('courseList'); 

    const d=document.createElement('div');
    d.setAttribute('class','course-entry');
    md.appendChild(d);

    const new_n=document.createElement('input');
    new_n.setAttribute('type','text');
    new_n.setAttribute('class','course-name');
    new_n.setAttribute('placeholder','Course Name');
    d.appendChild(new_n);

    const new_c=document.createElement('input');
    new_c.setAttribute('type','number');
    new_c.setAttribute('class','course-credits');
    new_c.setAttribute('placeholder','Credits');
    d.appendChild(new_c);

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
    d.appendChild(new_g);

});
document.getElementById('calculateGPA').addEventListener("click", function(){
        console.log("clicked");
        const c_credit=document.getElementsByClassName('course-credits');
        console.log("T1");
        const c_grade=document.getElementsByClassName('course-grade');
        console.log("T2");
        const len=c_credit.length;
        console.log(len);
        var numerator=0;
        var denominator=0;
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