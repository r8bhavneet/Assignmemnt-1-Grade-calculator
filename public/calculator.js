window.onload = function () {
    var addActivity= document.querySelector('.add-activity');
    var tableBody = document.querySelector(".table-body");
    var activity = document.querySelector(".activity")
    function renderActivity () {
        var activityNumber = 0;
        var i;
        for (i = 0; i < 3; i++) {
            var activityClone = activity.cloneNode(true);
            tableBody.append(activityClone);
            let activityNumber = i + 2;
            var activityChildren = activityClone.children;
            activityChildren[0].innerHTML = "Activity " + activityNumber;
            activityChildren[1].innerHTML = "A" + activityNumber;
        }
    }
    renderActivity();
    
    addActivity.addEventListener('click', function () {
        let totalActivity = document.querySelectorAll(".activity");
        let activityNumber = totalActivity.length + 1;
        var activityClone = activity.cloneNode(true);
        activityClone.classList.add('activity');
        tableBody.append(activityClone);
        var activityChildren = activityClone.children;
        activityChildren[0].innerHTML = "Activity " + activityNumber;
        activityChildren[1].innerHTML = "A" + activityNumber;
        activityChildren[2].querySelector("input").value = "";
        activityChildren[3].querySelectorAll("input").forEach(e => {e.value = ""});
        activityChildren[4].innerHTML = "";
        observeInput(activityClone);
    });

    var weighted = document.querySelector("button.weighted");
    weighted.addEventListener('click', function (result) {
        let totalActivity = document.querySelectorAll(".activity");
        let activityNumber = totalActivity.length;
        let allweights = document.getElementsByClassName("weight");
        let allgrade_recieved = document.getElementsByClassName("grade-recieved");
        let allgrade_outoff = document.getElementsByClassName("grade-outoff");
        let w = document.getElementsByClassName("result");
        let i=0;
        let weightage;
        let maxweight=100;
        let nominator=0;
        let denominator=0;
        for(i=0;i<activityNumber;i++){
           if(allweights[i].value=="" || allgrade_outoff[i].value==0 || allgrade_outoff.value=="" || allweights[i].value==0){
             continue;
           }
           else{
                nominator += (allgrade_recieved[i].value/allgrade_outoff[i].value)*allweights[i].value;
                denominator += (allweights[i].value)*1;
           }
        }
            if(denominator > 100){
                alert("Weightage more than 100.");
            }
            if(denominator !== 0){
            console.log(nominator);
            console.log(denominator);
            weightage = (nominator/denominator)*100;
            console.log(weightage)
            document.querySelector("h4.results > p > span").innerHTML = parseFloat(weightage).toFixed(2) +" %";;
            }
            else{
                alert("Marks out of has not been entered or its zero.");
            }

    });

    var mean = document.querySelector("button.mean");
    mean.addEventListener('click', function (meanofmarks) {
        let totalActivity = document.querySelectorAll(".activity");
        let activityNumber = totalActivity.length;
        let allweights = document.getElementsByClassName("weight");
        let allgrade_recieved = document.getElementsByClassName("grade-recieved");
        let allgrade_outoff = document.getElementsByClassName("grade-outoff");
        let i=0;
        let count=0;
        let meanmarks;
        let nominator=0;
        for(i = 0;i<activityNumber;i++)
        {
            if( allgrade_outoff[i].value==0 || allgrade_outoff.value=="" ){
             continue;
           }
           else{
                nominator += (allgrade_recieved[i].value/allgrade_outoff[i].value);
                count++;
           }
        }
        if(count !== 0){
        meanmarks = (nominator/count)*100;
        document.querySelector("h4.results > p > span").innerHTML = parseFloat(meanmarks).toFixed(2) +" %";
        }
        else{
            alert("Marks out zero. Not Possible");
        }
    });
    
    var activites = document.querySelectorAll(".activity");
    activites.forEach(e => {
        observeInput(e);
    });
    function observeInput (element) {
        var inputs = element.querySelectorAll(".input");
        var weight = element.querySelector(".weight");
        var gradeRecieved = element.querySelector(".grade-recieved");
        var gradeOutOff = element.querySelector(".grade-outoff");
        var percent = element.querySelector("td.percentage");
        var percentage;
        for (const input of inputs) {
            input.addEventListener('input', function (event) {
                if (weight.value == "") {
                    if(gradeOutOff.value !== "" && gradeOutOff.value !== 0){
                    percentage = gradeRecieved.value/gradeOutOff.value * 100 + "%";
                    }
                } else {
                    if(gradeOutOff.value !== "" && gradeOutOff.value !== 0){
                    percentage = (weight.value / 100) * gradeRecieved.value/gradeOutOff.value * 100 ;
                    }
                }
                if (gradeOutOff.value == "" || gradeOutOff.value ==0) {
                    percent.innerHTML = "";
                } else {
                    percent.innerHTML = parseFloat(percentage).toFixed(2) +" %";
                }
                
            });
        };
    } 
  
}   