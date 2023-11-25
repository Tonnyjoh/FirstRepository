//localStorage.setItem("lstTask", JSON.stringify(lstTask));
let lstTask = JSON.parse(localStorage.getItem("lstTask"));
if (lstTask == null) { lstTask = new Array() }
let cpt = 0;
window.addEventListener("load", function() {
    d = new Date();
    jour = d.getDate();
    mois = d.getMonth(); //0-11
    annee = d.getFullYear();
    datyAndroany = GetDateString(jour, mois + 1, annee); //	Date de depart
    let cptTaskAujourdhui = 0;
    let cptTaskAvenir = 0;
    let cptTaskProfe = 0;
    let cptTaskPerso = 0;
    let choosenDate = datyAndroany;
    let choosenNameTask = "";
    let choosenDescrip = "";
    let choosenCateg = "Personnel";
    let choosenPriority = "1";
    let hide1 = $("#hide1");
    let hide2 = $("#hide2");
    let txt;
    var tabActive = [true, false, false];
    let tabDate = this.document.querySelectorAll(".DayOn");
    let span_task_elt_div = $(".task-elt-div span");
    let categDiv = $("#categ");
    let lstAvenir = $("#aVenirDiv ul");
    $("#task-title span").text(jour);
    $("#aVenirDiv span").text(jour + 1);
    reRender();

    function reRender() {

        cptTaskAvenir = 0;
        if (lstTask != null) { cpt = lstTask.length; }
        showListTask(lstTask);
        //gestion de a Venir
        lstAvenir.empty();
        lstLi = " ";
        for (i in lstTask) {
            date1 = lstTask[i][0]["dateTask"];
            task = lstTask[i][0]["nameTask"];
            d1 = new Date(date1);
            d2 = new Date();

            if (d1.getDate() <= (d2.getDate() + 7) && (d1.getMonth() == d2.getMonth()) && (d1.getFullYear() == d2.getFullYear())) {
                cptTaskAvenir++;
                lstLi += ` <li><div></div>${task} <span> ${date1}</span></li><hr>`;
            }

        }
        span_task_elt_div[1].innerHTML = cptTaskAvenir;
        lstAvenir.append(lstLi);
    }
    //gestion des tache perso/profe
    $("#perso").click(function() {
        showCateg("Personnel");
    })
    $("#profe").click(function() {
        showCateg("Professionnel");
    })

    function showCateg(categ) {
        categDiv.css("display", "flex");
        if (lstTask != null) { cpt = lstTask.length; }
        lstCateg = $("#categ ul");
        lstCateg.empty();
        lstLiCat = " ";
        for (i in lstTask) {
            cat = lstTask[i][0]["categTask"];
            date1 = lstTask[i][0]["dateTask"];
            task = lstTask[i][0]["nameTask"];

            if (categ == cat) {
                lstLiCat += ` <li><div></div>${task} <span> ${date1}</span></li><hr>`;
            }

        }
        lstCateg.append(lstLiCat);

    }
    $("#md-date p").text(datyAndroany);
    //not Used
    function traitement() {
        data = {

        }
        fetch("js/listTask.JSON", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(async function(value) {
                lstTask = value;
                console.log(value)
                showListTask(lstTask);
                // console.log(lstTask["id-task-0"]["nameTask"]);
            })
            .catch(function(error) {
                console.log(error);
            });
    };


    //show hide Menu
    $(".fa-stream").click(function() {
        hide1.css("display", "flex");
        toBlur($("#task"));
        toBlur(hide2);
    })
    let modal1 = "hide1";
    let modal2 = "hide2";
    let modal3 = "aVenirDiv";
    let modal4 = "calendrierDiv";
    let modal5 = "categ";
    window.onclick = function(event) {

            if (event.target.getAttribute("id") == modal1 && hide1.css("display") == "flex") {
                hide1.hide();
                notToBlur($("#task"));
                notToBlur(hide2);
            }
            if (event.target.getAttribute("id") == modal2 && hide2.css("display") == "flex") {
                hide2.hide();
                notToBlur($("#task"));
            }
            if (event.target.getAttribute("id") == modal3 && avenirBloc.css("display") == "flex") {
                avenirBloc.hide();
                notBlurDiv();
            }
            if (event.target.getAttribute("id") == modal4 && calendarDiv.css("display") == "flex") {
                calendarDiv.hide();
                notBlurDiv();
            }

            if (event.target.getAttribute("id") == modal5 && categDiv.css("display") == "flex") {
                categDiv.hide();
                notToBlur($("#task"));
                notToBlur(hide2);
                notToBlur(hide1);
            }
        }
        //show hide add task
    $("#task-add").click(function() {

            if (window.innerWidth < 880) {
                hide2.css("display", "flex");
                toBlur($("#task"));

            }
        })
        //re render de l'ecran 
    this.window.onresize = function() {
            if (window.innerWidth > 1200) {
                hide1.css("display", "flex");
            } else {
                hide1.hide();
            }
            if (window.innerWidth > 880) {
                hide2.css("display", "flex");
            } else {
                hide2.hide();
            }
            avenirBloc.hide();
            calendarDiv.hide();
            notBlurDiv();
        }
        //show hide A venir/calendrier
    let avenirBloc = $("#aVenirDiv");
    let calendarDiv = $("#calendrierDiv");
    let taskEltDiv = $(".task-elt-div");
    for (let i = 0; i < taskEltDiv.length; i++) {
        taskEltDiv[i].onclick = function() {
            switch (i) {
                case 0:
                    tabActive.splice(0, 3, true, false, false);
                    actualizeTab(taskEltDiv);

                    notToBlur($("#task"));
                    notToBlur(hide2);
                    if (window.innerWidth < 1200) {
                        hide1.hide();
                    }
                    break;

                case 1:
                    tabActive.splice(0, 3, false, true, false);
                    actualizeTab(taskEltDiv);
                    avenirBloc.css("display", "flex");
                    blurDiv();
                    if (window.innerWidth < 1200) {
                        hide1.hide();
                    }
                    break;
                case 2:
                    tabActive.splice(0, 3, false, false, true);
                    actualizeTab(taskEltDiv);
                    calendarDiv.css("display", "flex");
                    blurDiv();
                    if (window.innerWidth < 1200) {
                        hide1.hide();
                    }
                    break;
            }
        }
    }
    let nav_event_state = $(".nav-event-state");
    for (let i = 0; i < nav_event_state.length; i++) {
        nav_event_state[i].onclick = function() {
            switch (i) {
                case 0:
                    blurDiv();
                    if (window.innerWidth < 1200) {
                        hide1.hide();
                    }
                    break;
            }
        }
    }


    function blurDiv() {
        toBlur($("#task"));
        toBlur(hide2);
        toBlur(hide1);
    }

    function notBlurDiv() {
        notToBlur($("#task"));
        notToBlur(hide2);
        notToBlur(hide1);

    }


    function actualizeTab(taskEltDiv) {
        for (let j = 0; j < taskEltDiv.length; j++) {
            if (tabActive[j] == true) {
                taskEltDiv[j].classList.add("active");
            } else if ((taskEltDiv[j].classList.contains("active"))) {
                taskEltDiv[j].classList.remove("active");
            }
        }
    }
    //creation de taches

    let dateTaskDiv = $("#md-date");
    dateTaskDiv.click(function() {
            calendarDiv.css("display", "flex");
            blurDiv();
        })
        //creation de la liste
    function createTaskList(task, id, daty, priority, categ) {
        let classDiv = (categ == "Personnel") ? "perso" : "profe";
        return (`<div class="task-list-elt">
                        <h1>${task} <i class="fas fa-angle-right"></i></h1>
                        <div class="task-elt" id="${id}">
                            <span><i class="fas fa-calendar-times"></i>${daty}</span>
                            <div class="task-div-priority">
                                <p class="task-subtasks"><span>${priority}</span></p>
                            </div>
                            <div class="${classDiv} state-task">
                                <div></div> 
                                <p>${categ}</p>
                            </div>
                        </div>
                    </div>`);
    }
    $("#deleteAll").click(function() {
        localStorage.removeItem("lstTask");
        lstTask = localStorage.getItem("lstTask");
        if (lstTask == null) { lstTask = new Array() }
        lstAvenir.empty()

        reRender();
    })
    $("#modify").click(function() {
        choosenNameTask = document.forms["form0"]["name-task"].value;
        choosenDescrip = document.forms["form0"]["descript-task"].value;
        choosenCateg = document.forms["form1"]["task-state"].value;
        choosenPriority = document.forms["form2"]["priority"].value;
        choosenId = `id-task-${cpt}`;
        if (choosenNameTask == "" || choosenDescrip == "") {
            alert("Tâche non valide");
        } else {
            createTask(choosenNameTask, choosenDescrip, choosenCateg, choosenDate, choosenPriority);
        }
    })

    function createTask(nom, desc, categ, daty, prio) {
        lstTask.push([{ "id": choosenId, "nameTask": choosenNameTask, "descrpTask": choosenDescrip, "categTask": choosenCateg, "priorityTask": choosenPriority, "dateTask": choosenDate }]);
        localStorage.setItem("lstTask", JSON.stringify(lstTask));
        lstTask = JSON.parse(localStorage.getItem("lstTask"));
        reRender();
    }

    function showListTask(lstTask) {
        txt = " ";
        cptTaskAujourdhui = 0;
        cptTaskPerso = 0;
        cptTaskProfe = 0

        for (i in lstTask) {
            idTache = lstTask[i][0]["id"];
            task = lstTask[i][0]["nameTask"];
            categ = lstTask[i][0]["categTask"];
            priority = lstTask[i][0]["priorityTask"];
            date = lstTask[i][0]["dateTask"];
            txt += createTaskList(task, idTache, date, priority, categ);
            cptTaskAujourdhui++;
            (categ == "Personnel") ? cptTaskPerso++ : cptTaskProfe++;
        }
        $("#task-list").html(txt);
        //show hide task
        lstTaskH1 = $(".task-list-elt h1");
        lstAngle = $(".fa-angle-right")
        for (let i = 0; i < lstTaskH1.length; i++) {
            lstTaskH1[i].onclick = function() {

                lstAngle[i].classList.toggle("activee")
                let idTask = `#id-task-${i}`;
                let task = $(idTask);
                if (task.css("display") == "none") {
                    task.css("display", "flex");
                } else {
                    task.css("display", "none");

                }
            }
        }
        span_task_elt_div[0].innerHTML = cptTaskAujourdhui;


        $("#perso span").text(cptTaskPerso);
        $("#profe span").text(cptTaskProfe);
    }
    //	date au format "JJ/MM/YYYY"	obligatoirement
    var sStartDate = "";
    var aDayNames = new Array("", "Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di");
    var aMonthName = new Array("", "Janvier", "Février", "Mars", "avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre");
    //1=> mianatra 0=> weekend
    var BaseWeekWork = new Array(0, 1, 1, 1, 1, 1, 0, 0); //	journée de la semaine , travaillée: (1/0)
    var CurrentMonth = 0;
    var CurrentYear = 0;
    var isdoing = false;
    init();
    $("#changeMonthLeft").click(function() {
        ChangeCurrentMonth(-1);
    })
    $("#changeMonthRight").click(function() {
        ChangeCurrentMonth(1);
    })
    $("#changeYearLeft").click(function() {
        ChangeCurrentYear(-1);
    })
    $("#changeYearRight").click(function() {
            ChangeCurrentYear(1);
        })
        // Changement d'année (+1,-1)
    function ChangeCurrentYear(value) {
        if (isdoing == false) {
            var nb = CurrentYear * 1; //*1 atao integer le nb
            CurrentYear = nb + value;
            var str = GetDateString(1, CurrentMonth, CurrentYear);
            isdoing = true;
            console.log(str)
            WriteDateCells(str);
            isdoing = false;
        }
    }
    // Changement de mois (+1,-1)
    //	Changement de mois
    function ChangeCurrentMonth(value) {
        if (isdoing == false) {
            CurrentMonth = CurrentMonth + value;
            if (CurrentMonth == 13) {
                CurrentMonth = 1;
                CurrentYear++;
            }
            if (CurrentMonth == 0) {
                CurrentMonth = 12;
                CurrentYear--;
            }
            var str = GetDateString(1, CurrentMonth, CurrentYear);
            isdoing = true;
            WriteDateCells(str);
            isdoing = false;
        }
    }

    function GetDateString(d, m, y) {
        if (d <= 9) { d = "0" + d }
        if (m <= 9) { m = "0" + m }
        return (d + "/" + m + "/" + y);
    }

    function WriteDayNames() {
        for (i = 1; i <= 7; i++) {
            var td = $("#DayName" + i);
            td.innerHTML = aDayNames[i];
        }
    }
    //	Travaillé/Chomé
    function GetDayType(J, M, A) {
        var cDate = new Date(A, M, J);
        var DayNb = cDate.getDay(); //0-6
        if (DayNb == 0) { DayNb = 7; }
        var Result = BaseWeekWork[DayNb];
        return Result;
    }

    function WriteDateCells(StringDate) {
        //StringDate chaine de carac => xx/xx/xxxx
        var cDay = StringDate.substring(0, 2);
        var cMonth = StringDate.substring(3, 5) - 1;
        var cYear = StringDate.substring(6, 10);
        CurrentDay = cDay;
        CurrentMonth = cMonth + 1;
        CurrentYear = cYear;
        MonthNAme.innerText = aMonthName[cMonth + 1];
        YearValue.innerText = cYear;
        //console.log(YearValue)

        var BeginDate = new Date(cYear, cMonth, 1);
        //console.log(BeginDate);
        var MaxDay = 1;
        //	Dernier jour du mois:
        for (j = 28; j < 33; j++) {
            var cDate = new Date(cYear, cMonth, j);
            //console.log(cDate);
            //console.log(j);
            if (cDate.getDate() == 1) { MaxDay = j - 1; }
        }

        var cWeek = 1;
        ClearCells();
        //	Remplissage des cellules:
        for (d = 1; d <= MaxDay; d++) {
            var cDate = new Date(cYear, cMonth, d);
            //jour 0-6
            var DayNb = cDate.getDay();
            if (DayNb == 0) { DayNb = 7; } // 	J de la semaine de 1 a 7
            var Cell = document.getElementById("S" + cWeek + "J" + DayNb);
            var OrigClass = "";
            //	Type de jour: Travaillé/Chomé/Date de départ
            if (GetDayType(d, cMonth, cYear) == 1) { OrigClass = 'DayWorking'; } else { OrigClass = 'DayNotWorking'; }
            if (GetDateString(d, (cMonth + 1), cYear) == sStartDate) { OrigClass = 'DayStart'; }
            Cell.className = 'DayOn ' + OrigClass;
            Cell.innerHTML = "<SPAN WIDTH=100%   onmouseover=\"S" + cWeek + "J" + DayNb + ".className = 'DayOn DayOver';\" onmouseout=\"S" + cWeek + "J" + DayNb + ".className = 'DayOn " + OrigClass + "';\">" + d + "</SPAN>"

            if (DayNb == 7) { cWeek++; }

        }

        tabDate = this.document.querySelectorAll(".DayOn");
        for (let i = 0; i < tabDate.length; i++) {
            tabDate[i].addEventListener("click", () => {
                choosenDate = GetDateString(CurrentMonth, tabDate[i].childNodes[0].textContent, CurrentYear);
                $("#md-date p").text(choosenDate);
                calendarDiv.hide();
                notBlurDiv();
            })
        }
    }

    //	Effacement de toutes les cellules
    function ClearCells() {
        for (s = 1; s <= 6; s++) {
            for (j = 1; j <= 7; j++) {
                document.getElementById("S" + s + "J" + j).innerHTML = "";
                document.getElementById("S" + s + "J" + j).className = "";
            }
        }
    }
    //	Initialisation
    function init() {
        let d = new Date();
        jour = d.getDate();
        mois = d.getMonth(); //0-11
        annee = d.getFullYear();
        sStartDate = GetDateString(jour, mois + 1, annee); //	Date de depart
        WriteDayNames() //	ecrits les noms de jour
        WriteDateCells(sStartDate) //	Crée le calendrier
    }


    function toBlur(name) {
        name.css("filter", "blur(3px)")
    }

    function notToBlur(name) {
        name.css("filter", "blur(0px)")
    }
})