	var attackIncrease = 10;
	var charOriginalHp;
	var yourHp;
	var yourAtt;
	var defenderHp;
	var defenderAtt;
	var defenderCharacter;
	var yourCharacter;
	var defenderOriginalHp = 0;
	var yourCharacterOriginalHp = 0;
	var charOriginalPower = 0;
	var losers = [];

	$('#yourCharacter').hide();
	$('#text').hide();
	$('.restart').hide();
	$('#theDefender').hide();
	$('.attack').hide();


	var gokuHp = parseInt($('#goku').attr('healthpoints'));
	var gokuPowerLvl = parseInt($('#goku').attr('powerLevel'));
	$('#gokuHp').text(gokuHp);
	$('#gokuPower').text(gokuPowerLvl);

	var zeroHp = parseInt($('#zero').attr('healthpoints'));
	var zeroPowerLvl = parseInt($('#zero').attr('powerLevel'));
	$('#zeroHp').text(zeroHp);
	$('#zeroPower').text(zeroPowerLvl);

	var megamanHp = parseInt($('#megaman').attr('healthpoints'));
	var megamanPowerLvl = parseInt($('#megaman').attr('powerLevel'));
	$('#megamanHp').text(megamanHp);
	$('#megamanPower').text(megamanPowerLvl);


	$(document).on('click','.pickCharacter',function(){
		$('#yourCharacter').show()
		$('#theDefender').show();
		$('.attack').show();
		yourCharacter = $(this).attr('id');
		yourHp = $(this).attr('healthpoints');
		yourCharacterOriginalHp = $(this).attr('healthpoints');
		charOriginalPower = $(this).attr('powerLevel');

		if(yourCharacter == 'goku'){
			
			$('#yourCharacter').append($('#goku').attr('class','yourCharacter'));
			$('#enemiesToAttack').append($('#zero').attr('class','enemies'));
			$('#enemiesToAttack').append($('#megaman').attr('class','enemies'));
		
		} else if (yourCharacter == 'zero'){
			
			$('#yourCharacter').append($('#zero').attr('class','yourCharacter'));
			$('#enemiesToAttack').append($('#goku').attr('class','enemies'));
			$('#enemiesToAttack').append($('#megaman').attr('class','enemies'));
		
		} else if (yourCharacter == 'megaman'){
			
			$('#yourCharacter').append($('#megaman').attr('class','yourCharacter'));
			$('#enemiesToAttack').append($('#goku').attr('class','enemies'));
			$('#enemiesToAttack').append($('#zero').attr('class','enemies'));
		
		} 

		$('#characters').hide();
	});

	$(document).on('click','.enemies',function(){
		$('#text').hide();
		var thisButton 		= $(this).attr('class','defender')
		defenderCharacter	= $(this).attr('id');
		defenderOriginalHp = $(this).attr('healthpoints');
		$('#defender').append(thisButton);
	});

	$(document).on('click','#attack',function(){
	 	
	 	// while and if the the text inside the defender has nothing, then show the text that says 
	 	// "no enemy here" and then break or return out of the function
	 	while($('#defender').text() == ''){
	 		$('#text').show();
	 		break;
	 	}

	 	if($('#defender').text() == ''){
	 		$('#text').show();	
	 		return;
	 	}

	 	// calculations for figuring out the power level and healthpoints after an attack
	 	yourHp 				= parseInt($('#'+yourCharacter+'Hp').text());
	 	yourPowerLevel 		= parseInt($('#'+yourCharacter+'Power').text());

	 	defenderHp 			= parseInt($('#'+defenderCharacter+'Hp').text());
	 	defenderPowerLevel 	= parseInt($('#'+defenderCharacter+'Power').text());

	 	yourHp 				= yourHp - defenderPowerLevel;
	 	$('#'+yourCharacter+'Hp').text(yourHp);

	 	defenderHp			= defenderHp - yourPowerLevel;
	 	$('#'+defenderCharacter+'Hp').text(defenderHp);

	 	yourPowerLevel		= yourPowerLevel + attackIncrease;
	 	$('#'+yourCharacter+'Power').text(yourPowerLevel);

	 	// win condition, if defenderHp is less than or equal zero
		if(defenderHp <= 0){
	 		$('#'+yourCharacter+'Hp').text(yourCharacterOriginalHp);
	 		$('#'+defenderCharacter+'Hp').text(defenderOriginalHp);
	 		losers.push(defenderCharacter);
	 		$('#characters').append($('#'+defenderCharacter).attr('class','pickCharacter'));
	 		$('#'+defenderCharacter).hide();
	 	}

	 	// lose condition, if there're no enemies left or your healthpoints are less than zero.
	 	if(($('#enemiesToAttack').text()=='') || (yourHp <= 0)){
	 		$('#'+yourCharacter+'Hp').text(yourCharacterOriginalHp);
	 		$('.restart').show();
	 	}


	})

	// restart function. Restarts the game by moving setting the characters healthpoints back
	// to their origional health. 
	$(document).on('click','.restart',function(){
		
		$('#characters').append($('#'+yourCharacter).attr('class','pickCharacter'));
		$('#'+yourCharacter+'Power').text(charOriginalPower);
		for(var i = 0; i < losers.length; i++){
			$('#'+losers[i]).show();
		}
		losers = [];
		$('#text').hide();
		$('.restart').hide();
		$('#characters').show();
		$('#yourCharacter').hide();
		$('#theDefender').hide();
		$('.attack').hide();
	});
