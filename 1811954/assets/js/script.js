"use strict";

//TODO: Grafische Darstellung

var anzahlVersuche=0;
//Zahlen zwischen 0 und 1000
var gesuchteZahl=Math.floor(Math.random() * 1001);
//Array für Chart deklarieren
var gegebeneTipps=new Array(10);
//Diese Funktion wird bei der Betätigung des "Tipp abgeben"-Buttons aufgerufen
function spielen() {
    if (!document.getElementById("spielButton").classList.contains("disabled")){
        document.getElementById("ausgabeChart").classList.remove("d-none");
        var gerateneZahl = document.getElementById("eingabe").value;
        //Array für chart initialisieren und dann versuche ++
        gegebeneTipps[anzahlVersuche++]=gerateneZahl;

        //Graph darstellen
        var ctx = document.getElementById("myChart").getContext('2d');
        var data = [{x: 1, y: gegebeneTipps[0]},
                    {x: 2, y: gegebeneTipps[1]},
                    {x: 3, y: gegebeneTipps[2]},
                    {x: 4, y: gegebeneTipps[3]},
                    {x: 5, y: gegebeneTipps[4]},
                    {x: 6, y: gegebeneTipps[5]},
                    {x: 7, y: gegebeneTipps[6]},
                    {x: 8, y: gegebeneTipps[7]},
                    {x: 9, y: gegebeneTipps[8]},
                    {x: 10, y: gegebeneTipps[9]}]
        var options = { responsive: false,
                        maintainAspectRatio: false,
                        scales: { yAxes: [{ticks: {beginAtZero: true, max: 1000}}] } }
                        var myChart = new Chart(ctx, {
                            type: 'scatter',
                            data: {
                                datasets: [{
                                        label: "Tipp", // Name the series
                                        data: data, // Specify the data values array
                                  borderColor: "#2196f3",
                                  backgroundColor: "#2196f3"
                                    }]
                            },
                            options: options
                        })



        document.getElementById("versuche").innerText= anzahlVersuche;
        document.getElementById("ausgabe").classList.remove("d-none");
        if(anzahlVersuche==10 && gesuchteZahl!=gerateneZahl){
            document.getElementById("spielButton").classList.add("disabled");
            document.getElementById("abweichungText").classList.add("d-none");
            document.getElementById("spielEndeText").classList.remove("d-none");
            document.getElementById("spielEnde").innerText="verloren.";
        } else {
            if (gerateneZahl==gesuchteZahl){
                document.getElementById("spielButton").classList.add("disabled");
                document.getElementById("abweichungText").classList.add("d-none");
                document.getElementById("spielEndeText").classList.remove("d-none");
                document.getElementById("spielEnde").innerText="gewonnen!";
            } else if (gerateneZahl<gesuchteZahl){
                document.getElementById("abweichung").innerText= "klein.";
            } else {
                document.getElementById("abweichung").innerText= "groß.";
            }

        }
    }
}

function neustart() {
    //Zahlen resetten
    anzahlVersuche=0;
    gesuchteZahl=Math.floor(Math.random() * 1001);
    gegebeneTipps=new Array(10);
    //Tipp abgeben Button aktivieren und Ausgabefeld verstecken
    document.getElementById("spielButton").classList.remove("disabled");
    document.getElementById("ausgabe").classList.add("d-none");
    //AbweichungText sichtbar, spielEndeText unsichtbar machen
    document.getElementById("abweichungText").classList.remove("d-none");
    document.getElementById("spielEndeText").classList.add("d-none");
    document.getElementById("ausgabeChart").classList.add("d-none");
}
