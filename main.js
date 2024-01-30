$(document).ready(function(){


    ////variable Kassenmenge
    let Anzahl_Kassen = 0;
    let initialPoints = 50; // Initialpunkte
    let maxAdditionalPoints = 50; // Maximale zusätzliche Punkte
    let product_count = 5;

    ////variablen Kassenprodukte
    let Snickers = 0;
    let Twix = 0;
    let Mars = 0;
    let Bounty = 0; // Initialwert auf 0 setzen
    let Milky_Way = 0; // Initialwert auf 0 setzen
    ////Punkte 
    let point = 50;
    
    ////wechsel 1
        $("nav").hide();
        $("testing").hide();
        $("hupu").hide();/// eigentlich 2te seite
        $("button").click(function(){
            $("nav").show();
            $("testing").show();
            $("button").hide();
        });
    
        ////wechsel 2
    
        $("#wechsel3").click(function(){
            $("nav").show();
            $("hupu").show();
             $("testing").hide();
            $("button").hide();
        });
    
        // Funktion zum Aktualisieren der Werte
        function updateValues() {
            $('#punkteAnzeige').text(point);
            $('#SnickersNumberInput').val(Snickers);
            $('#MarsNumberInput').val(Mars);
            $('#TwixNumberInput').val(Twix);
            $('#BYNumberInput').val(Bounty); // Setzen Sie den Wert des Eingabefelds auf den Wert der Variable Bounty
            $('#MWNumberInput').val(Milky_Way); // Setzen Sie den Wert des Eingabefelds auf den Wert der Variable Milky_Way
            // Fügen Sie hier weitere Zeilen hinzu, wenn Sie andere Werte aktualisieren möchten
        }
    
        // Rufen Sie updateValues() auf, um die Anfangswerte der Eingabefelder zu setzen
        updateValues();


        // Event listener for the 'rel_KassenNumberInput' input field
        $('#rel_KassenNumberInput').on('input', function() {
        Anzahl_Kassen = parseInt($(this).val());
        console.log('Anzahl relevante Kassen: ', Anzahl_Kassen);
    });

        // Event listener für alle Eingabefelder
    $('#SnickersNumberInput').on('input', function() {
        Snickers = parseInt($(this).val()) || 0; // Nimmt den Wert aus dem Eingabefeld oder 0, falls die Eingabe ungültig ist
        console.log('Snickers: ', Snickers);
    });

    $('#MarsNumberInput').on('input', function() {
        Mars = parseInt($(this).val()) || 0;
        console.log('Mars: ', Mars);
    });

    $('#TwixNumberInput').on('input', function() {
        Twix = parseInt($(this).val()) || 0;
        console.log('Twix: ', Twix);
    });

    $('#BYNumberInput').on('input', function() {
        Bounty = parseInt($(this).val()) || 0;
        console.log('Bounty: ', Bounty);
    });

    $('#MWNumberInput').on('input', function() {
        Milky_Way = parseInt($(this).val()) || 0;
        console.log('Milky Way: ', Milky_Way);
    });

        /////////////////////////////////////////
        /////////////////////////////////////////

            // Funktion zum Aktualisieren der Anzeige
        function updateDisplay() {
            // Holen Sie die Anzahl der relevanten Kassen
            let anzahlKassen = parseInt($('#rel_KassenNumberInput').val());

            // Holen Sie die Werte der Produkte
            let snickersCount = parseInt($('#SnickersNumberInput').val());
            let marsCount = parseInt($('#MarsNumberInput').val());
            let twixCount = parseInt($('#TwixNumberInput').val());
            let bountyCount = parseInt($('#BYNumberInput').val());
            let milkyWayCount = parseInt($('#MWNumberInput').val());

            // Erstellen Sie ein Array mit den Produktwerten
            let productCounts = [
                { name: 'Snickers', count: snickersCount },
                { name: 'Mars', count: marsCount },
                { name: 'Twix', count: twixCount },
                { name: 'Bounty', count: bountyCount },
                { name: 'Milky Way', count: milkyWayCount }
            ];

            // Überprüfen Sie, bei welchen Produkten Platzierungen fehlen
            let missingPlacements = productCounts.filter(product => product.count < anzahlKassen);

            // Erstellen Sie eine Nachricht mit den fehlenden Platzierungen
            let message = missingPlacements.length > 0 ? 
                missingPlacements.map(product => `${product.name}: Fehlende Platzierungen - ${anzahlKassen - product.count}`).join(', ') : 
                'Alle Produkte sind vollständig platziert.';

            // Zeigen Sie die Nachricht im Element mit der ID 'Kassen' an
            $('#Kassen').text(message);

            // Holen Sie das Element, in dem die fehlenden Platzierungen angezeigt werden sollen
        let $missingPlacements = $('#missingPlacements');

        // Leeren Sie das Element zu Beginn
        $missingPlacements.empty();

        
        // Fügen Sie für jedes fehlende Produkt ein <li> Element hinzu
        if (missingPlacements.length > 0) {
            missingPlacements.forEach(product => {
                $missingPlacements.append(`<li>${product.name}: Fehlende Platzierungen - ${anzahlKassen - product.count}</li>`);
            });
        } else {
            $missingPlacements.append('<li> Du hast volle Punktzahl.</li>');
        }
        }

        // Event listener für alle Eingabefelder
        $('#rel_KassenNumberInput, #SnickersNumberInput, #MarsNumberInput, #TwixNumberInput, #BYNumberInput, #MWNumberInput').on('input', function() {
            updateDisplay();
        });
////////////////////////
/////////////////////
//////////////////
/////////////////
///////////////

        // Funktion zum Aktualisieren der Punkte
    function updatePoints() {
        let points = initialPoints; // Starten Sie mit den Initialpunkten
        let maxPoints = 100; // Maximale Punkte
        let pointsPerPlacement = maxAdditionalPoints / (product_count * Anzahl_Kassen); // Punkte pro korrekter Platzierung

        // Berechnen Sie die Punkte basierend auf der Produktplatzierung
        let products = [Snickers, Twix, Mars, Bounty, Milky_Way];
        products.forEach(product => {
            let correctPlacements = Math.min(product, Anzahl_Kassen); // Die Anzahl der korrekten Platzierungen ist das Minimum aus Produktanzahl und Anzahl Kassen
            points += correctPlacements * pointsPerPlacement; // Punkte für korrekte Platzierungen hinzufügen
        });

        // Runden Sie die Punkte auf die nächste ganze Zahl und stellen Sie sicher, dass die Punkte nicht mehr als maxPoints sind
        point = Math.min(Math.round(points), maxPoints);
        $('#punkteAnzeige').text(point); // Aktualisieren Sie die Punkteanzeige
    }

    // Rufen Sie updatePoints() auf, wenn sich die Anzahl der Produkte ändert
    $('#rel_KassenNumberInput, #SnickersNumberInput, #MarsNumberInput, #TwixNumberInput, #BYNumberInput, #MWNumberInput').on('input', function() {
        updateDisplay(); // Aktualisieren Sie die Anzeige
        updatePoints(); // Aktualisieren Sie die Punkte
    });
       


    ////////////////////
    /////////////////
    ////////////////
    /////////////
    ////////////

    function updateMaxProductInputs() {
        let maxKassen = parseInt($('#rel_KassenNumberInput').val()); // Holen Sie die Anzahl der relevanten Kassen
        // Aktualisieren Sie das max-Attribut für jedes Produkt-Eingabefeld
        $('#SnickersNumberInput').attr('max', maxKassen);
        $('#MarsNumberInput').attr('max', maxKassen);
        $('#TwixNumberInput').attr('max', maxKassen);
        $('#BYNumberInput').attr('max', maxKassen);
        $('#MWNumberInput').attr('max', maxKassen);
    }

    // Funktion zum Überprüfen der Eingabewerte
    function checkInputAgainstMaxKassen(inputId) {
        let maxKassen = parseInt($('#rel_KassenNumberInput').val());
        let inputValue = parseInt($(inputId).val());
        if (inputValue > maxKassen) {
            alert('Die eingegebene Anzahl überschreitet die Anzahl der relevanten Kassen!');
            $(inputId).val(maxKassen); // Setzen Sie den Wert auf das Maximum zurück
        }
    }

    // Event-Handler für die Produkt-Eingabefelder
    $('#SnickersNumberInput, #MarsNumberInput, #TwixNumberInput, #BYNumberInput, #MWNumberInput').on('input', function() {
        checkInputAgainstMaxKassen(this); // Überprüfen Sie die Eingabe
    });

    // Rufen Sie updateMaxProductInputs() auf, wenn sich die Anzahl der relevanten Kassen ändert
    $('#rel_KassenNumberInput').on('input', function() {
        updateMaxProductInputs(); // Aktualisieren Sie das max-Attribut der Produkt-Eingabefelder
        // Überprüfen Sie auch die aktuellen Eingaben
        $('#SnickersNumberInput, #MarsNumberInput, #TwixNumberInput, #BYNumberInput, #MWNumberInput').each(function() {
            checkInputAgainstMaxKassen(this);
        });
    });

    // Initialer Aufruf, um sicherzustellen, dass die max-Attribute beim Laden der Seite korrekt gesetzt sind
    updateMaxProductInputs();

    });



    

