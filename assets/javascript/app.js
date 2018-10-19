$(document).ready(function () {
    var options = [
        {
            question: "Who was the Plow King?", 
            choice: ["Lenny", "Barney", "Homer", "Moe"],
            answer: 1,
            photo: "assets/images/plow-king.jpg"
            
         },
         {
             question: "In which town do the Simpsons reside?", 
            choice: ["Springfield", "Shelbyville", "Seinfeld", "Spittle County"],
            answer: 0,
            photo:"assets/images/springfield.jpg"
        
         }, 
         {
             question: "How old is Bart?", 
            choice: ["8", "9", "10", "11" ],
            answer: 2,
            photo: "assets/images/bart.png"
        }, 
        {
            question: "What is the name of the school bus driver", 
            choice: ["Blotto", "Martin", "Otto", "Karl" ],
            answer: 2,
            photo: "assets/images/otto.jpg"
        }, 
        {
            question: "Who runs the Kwik-E-Mart?", 
            choice: ["Ned", "Homer", "Martin", "Apu" ],
            answer: 3,
            photo: "assets/images/e-mart.jpg"
        }, 
        {
            question: "Which famous person does Marge love to paint?", 
            choice: ["Paul McCartney", "Ringo Starr", "George Harrison", "Elton John" ],
            answer: 1,
            photo: "assets/images/ringo.jpg"
        }, 
        {
            question: "What is the name of the guy at the comic store?", 
            choice: ["Hibbert", "Jeff Albertson", "Raphael", "He has no name" ],
            answer: 1,
            photo: "assets/images/comic-guy.jpg"
        }, 
        {
            question: "Where does Marge hide the Christmas money?", 
            choice: ["In her hair", "In the glove compartment of the car", "In the attic", "In the kitchen" ],
            answer: 0,
            photo: "assets/images/marge.jpg"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 15;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //	} else {
    //		console.log(pick.question);
            //iterate through answer array and display
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 15;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
           }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })