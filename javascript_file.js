var piesePuzzle = [];
//crearea unui vector in care sa fie retinute informatii despre fiecare piesa din puzzle: pozitia initiala, pozitia finala, pozitia random pe canvas1

function uploadFunction() {

    var imaginePuzzle = document.querySelector("#canvas2");
    var puzzle = document.querySelector("#canvas1");
    var W = imaginePuzzle.width, H = imaginePuzzle.height;
    var context = imaginePuzzle.getContext("2d");
    var context2 = puzzle.getContext("2d");
    var nrElementePuzzle = 25;
    var nrElemLinie = 5;
   
    //functia de uploadFunction() este setata pentru input-ul de tip file care incarca din calculator fisierul dorit (accepta doar imagini)
    var citireDinSursa = new FileReader();
    citireDinSursa.onloadend = function () {
        $("<img>").attr("src", citireDinSursa.result).on("load", function () {
            img = this;
            //se preia imaginea si este desenata pe canvas2, in care se va previzualiza permanent imaginea puzzle-ului
            context.drawImage(img, 0, 0, W, H);
            //la fiecare incarcare, este golit canvasul in care se va aseza puzzle-ul; deci este sters vectorul de piese pentru a fi recreat
            piesePuzzle.length = 0;
        });

    }
    //deoarece input-ul de tip files poate pastra mai multe fisiere, de fiecare data cand este incarcata o poza noua pentru puzzle, este stearsa cea de dinainte
    var fisiereIncarcate = document.getElementById("uploadImage");
    if ('files' in fisiereIncarcate) {
        if (fisiereIncarcate.files.length > 0) {

            for (var i = 0; i < fisiereIncarcate.files.length; i++) {

                context.clearRect(0, 0, W, H);

                citireDinSursa.readAsDataURL(document.getElementById("uploadImage").files[i]);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var imaginePuzzle = document.querySelector("#canvas2");
    var puzzle = document.querySelector("#canvas1");
    var W = imaginePuzzle.width, H = imaginePuzzle.height;
    var W2 = puzzle.width, H2 = puzzle.height;
    var context1 = imaginePuzzle.getContext("2d");
    var context2 = puzzle.getContext("2d");
    var x = 17, y = 100, size = 30;
    var crearePuzzle = document.querySelector("#crearePuzzle");
    var stariElemente = [];
    var dx = 0, dy = 0, mx = 0, my = 0;
    var stareJocPuzzle = [];
    var countStareJoc = 0;
    var sunetButonShuffle = new Audio('media/click.mp3'); 
 
    //initializarea vectorului care pastreaza starea elementelor
    for (var i = 0; i < piesePuzzle.length; i++) {
        stariElemente[i] = "normal";
    }
    //initializarea vectorului care monitorizeaza starea jocului (verificarea pozitiei corecte a unei piese)
    for (var i = 0; i < piesePuzzle.length; i++) {
        stareJocPuzzle[i] = "incomplet";
    }
    
    var index = 0, stare = "normal";
    var nrElementePuzzle = 25;
    var nrElemLinie = 5;
 

  //crearea modelului pentru puzzle; setarea pozitiilor pentru fiecare piesa de puzzle
   
    function creareModel() {

    
        for (var i = 0; i < nrElementePuzzle; i++) {

            if (i < 5) {
                piesePuzzle[i] = {
                    sx: (i % nrElemLinie) * W / 5,
                    sy: 0 * H / 5,
                    x: Math.floor(Math.random() * (W - W / nrElemLinie)) + 0,
                    y: Math.floor(Math.random() * (H - H / nrElemLinie)) + 0,
                    fx: 0,
                    fy: 0
                };

                console.log(Math.floor(Math.random() * W) + 0);
                console.log(Math.floor(Math.random() * W) + 0);
            }
            else {
                if (i >= 5 && i < 10) {
                    piesePuzzle[i] = {
                        sx: (i % nrElemLinie) * W / 5,
                        sy: 1 * H / 5,
                        x: Math.floor(Math.random() * (W - W / nrElemLinie)) + 0,
                        y: Math.floor(Math.random() * (H - H / nrElemLinie)) + 0,
                        fx: 0,
                        fy: 0
                    };
                }
                else {
                    if (i >= 10 && i < 15) {
                        piesePuzzle[i] = {
                            sx: (i % nrElemLinie) * W / 5,
                            sy: 2 * H / 5,
                            x: Math.floor(Math.random() * (W - W / nrElemLinie)) + 0,
                            y: Math.floor(Math.random() * (H - H / nrElemLinie)) + 0,
                            fx: 0,
                            fy: 0
                        };
                    }
                    else {
                        if (i >= 15 && i < 20) {
                            piesePuzzle[i] = {
                                sx: (i % nrElemLinie) * W / 5,
                                sy: 3 * H / 5,
                                x: Math.floor(Math.random() * (W - W / nrElemLinie)) + 0,
                                y: Math.floor(Math.random() * (H - H / nrElemLinie)) + 0,
                                fx: 0,
                                fy: 0
                            };
                        }
                        else {
                            if (i >= 20 && i < 25) {
                                piesePuzzle[i] = {
                                    sx: (i % nrElemLinie) * W / 5,
                                    sy: 4 * H / 5,
                                    x: Math.floor(Math.random() * (W - W / nrElemLinie)) + 0,
                                    y: Math.floor(Math.random() * (H - H / nrElemLinie)) + 0,
                                    fx: 0,
                                    fy: 0
                                };
                            }

                        }
                    }

                }

            }

        }
    }


    function desenareElementePuzzle() {

        context2.clearRect(0, 0, W, H);
        context2.fillRect(0, 0, W2, H2);
        context2.fillStyle = "burlywood";
           //functia de desenare puzzle, goleste canvasul 1 unde se va rezolva puzzle-ul si dupa deseneaza fiecare piesa, preluand bucati din canvasul 2 in care se previzualizeaza imaginea 

        for (var i = 0; i < piesePuzzle.length; i++) {


            context2.drawImage(imaginePuzzle, piesePuzzle[i].sx, piesePuzzle[i].sy, W / nrElemLinie, H / nrElemLinie, piesePuzzle[i].x, piesePuzzle[i].y, W / nrElemLinie, H / nrElemLinie);
            if (piesePuzzle[i].sx + 5 >= piesePuzzle[i].x && piesePuzzle[i].sx - 3 <= piesePuzzle[i].x && piesePuzzle[i].sy + 5 >= piesePuzzle[i].y && piesePuzzle[i].y >= piesePuzzle[i].sy - 3) {
                console.log("piesa pozitionata corect");
                stareJocPuzzle[i] = "completat";
                piesePuzzle[i].fx = piesePuzzle[i].x;
                piesePuzzle[i].fy = piesePuzzle[i].y;

                context2.strokeRect(piesePuzzle[i].fx, piesePuzzle[i].fy, W / nrElemLinie, H / nrElemLinie);
                context2.strokeStyle = "red";
                //desenarea unei borduri rosii in cazul in care pozitia finala a piesei este corecta, pentru a atentiona jucatorul ( verificarea pozitionarii pieselor)

            }
        }


       
        requestAnimationFrame(desenareElementePuzzle);
       
    }

    crearePuzzle.addEventListener("click", function () {
        //la actiunea unui buton, se creeaza modelul pentru noul puzzle, se deseneaza piesele si este activat sunetul de incarcare al puzzle-ului
        
        creareModel();
        desenareElementePuzzle();
        sunetButonShuffle.play();
             
    });


    setInterval(function () {
        for (var i = 0; i < piesePuzzle.length; i++) {
            var j = 0;
            if (stariElemente[i] === "miscare") {
                piesePuzzle[i].x = mx - dx;
                piesePuzzle[i].y = my - dy;  
            } 
          
         
        }


    }, 25);



    puzzle.addEventListener("mousemove", function (e) {

        mx = e.clientX - puzzle.getBoundingClientRect().left;
        my = e.clientY - puzzle.getBoundingClientRect().top;
       

    });

    puzzle.addEventListener("mousedown", function (e) {
        for (var i = piesePuzzle.length-1; i >=0; i--) {
            if (piesePuzzle[i].x < mx && mx < piesePuzzle[i].x + W / nrElemLinie && piesePuzzle[i].y < my && my < piesePuzzle[i].y +  H/ nrElemLinie) {
                if (e.button === 0) {
                    stariElemente[i] = "miscare";

                    dx = mx - piesePuzzle[i].x;
                    dy = my - piesePuzzle[i].y;
                    return;
                 
                }
              

            }
        }
    });


    puzzle.addEventListener("mouseup", function (e) {
       

        for (var i = 0; i < piesePuzzle.length; i++) {
            if (stariElemente[i] === "miscare") {
                stariElemente[i] = "normal";
                console.log(piesePuzzle[i].x);
                console.log(piesePuzzle[i].y);
                console.log(piesePuzzle[i].sx);
                console.log(piesePuzzle[i].sy);


             
            }
           

        }

        countStareJoc = 0;
        for (var i = 0; i < piesePuzzle.length; i++) {
            
            if (stareJocPuzzle[i] === "completat") {
                
                countStareJoc = countStareJoc + 1;
             //in cazul in care o piesa este pozitionata corect, counStareJoc este incrementat; la final, daca toate piesele vor fi pozitionate corect, counSatreJoc va fi=nr elemente puzzle
            }

        }

        console.log("nr de piese completate " + countStareJoc);

       
        if (countStareJoc == piesePuzzle.length) {
            //in cazul in care numarul de piese completate este egal cu numarul total de piese existente, inseamna ca puzzle-ul a fost complatat si utilizatorul a castigat
            //este adaugat un paragraf in care este trimis un mesaj
            var paragraf = document.createElement("paragraph");
            paragraf.style.position = "absolute";
            paragraf.style.left = 650 + 'px';
            paragraf.style.top = 200 + 'px';
            var textCastig = document.createTextNode("AI CASTIGAT");
            paragraf.appendChild(textCastig);
            document.body.appendChild(paragraf);
        }



    });

   


});