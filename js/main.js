'use strict';

// First the user will need to choose how long they want their paragraph to be.
// Store the user's selection in a variable
// Display the paragraph

var potterWordList = ["Harry Potter", "Ron Weasley", "Hermione Granger", "Lord Voldemort", "Albus Dumbledore", "Severus Snape", "Rubeus Hagrid", "Draco Malfoy", "Luna Lovegood", "Neville Longbottom", "muggle", "wizard", "accio", "aguamenti", "alohomora", "aparecium", "ascendio", "avada kedavra", "bombarda", "colloportus", "crucio", "depulso", "descendo", "diffindo", "dissendium", "engorgio", "episkey", "erecto", "expecto patronum", "expelliarmus", "fiendfyre", "finite incantatem", "geminio", "homenum revelio", "immobulus", "impedimenta", "imperio", "impervius", "incendio", "langlock", "legilimens", "levicorpus", "locomotor", "lumos", "morsmordre", "muffliato", "nox", "obliviate", "obscuro", "periculum", "peskipiksi pesternomi", "petrificus totalus", "prior incantato", "protego", "quietus", "reducio", "reducto", "relashio", "rennervate", "reparo", "repello muggletum", "rictusempra", "riddikulus", "salvio hexia", "sectumsempra", "silencio", "sonorus", "stupefy", "tarantallegra", "vera verto", "wingardium leviosa"];

var potterApp = {};

potterApp.init = function () {
	potterApp.generateLorem();
};

potterApp.generateLorem = function () {
	$('#generateLorem').on('submit', function (e) {
		// Prevent default submit action and insert submitted value from radio button into variable
		e.preventDefault();

		var loremLength = $('input[name=sizeChoice]:checked', '#generateLorem').val();
		console.log(loremLength);

		// If user clicks submit without selecting a size option, they will receive an alert.
		if (loremLength == null) {
			window.alert("Please choose a length.");
		}
		// If the user makes a selection, run the program.
		else {
				// First create an empty array.
				// This is where each word generated from the potterWordList will be stored.
				var potterLorem = [];

				// Now loop for array items until we reach desiredSize
				for (var i = 0; i < loremLength; i++) {
					// Generate a random number to serve as an index for the potterWordList array
					var randomNumber = Math.floor(Math.random() * loremLength + 1);
					// Assign a variable to the value retrieved from the index of the potterWordList array
					var potterWord = potterWordList[randomNumber];
					// Add the generated word to the new list using .push();
					potterLorem + potterLorem.push(potterWord);
					//Use .join() to seperate the words in the generated paragraph
					var potterSpace = potterLorem.join(" ");
				}

				console.log(potterLorem);

				$(".textOutput").addClass("load");
				$(".textOutput").prepend("You're a wizard Harry! " + potterSpace);
			};
	});
};

$(function () {
	potterApp.init();
});