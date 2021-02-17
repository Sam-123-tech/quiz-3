const questions = [
    {
        question : "Which PM was also known as champion of peasants ?",
        answers : ["Charan Singh" , "Indira Gandhi", "Sardar Vallabhai Patel","Moraji Desai" ],
        correct : 1,
    },
    {
        question : "What is the name of the largest moon in Saturn ?",
        answers : ["Uranus" , "Titan"],
        correct : 2,
    },
    {
        question : "Who became the Minister of external affairs when Moraji Desai was was the PM ?",
        answers : ["Chandra sekhar" , "Atal Bihari Vajpayee"],
        correct : 2,
    },
    {
        question : "Which Monument is know as the World's Richest Temple ?",
        answers : ["Tirupati Balaji" , "Meenakshi Temple"],
        correct : 1,
    },
    {
        question : "Who invented the Computer ?",
        answers : ["Steve Jobs" , "Charles Babbage"],
        correct : 2,
    },
    {
        question : "Who started White Revolution ?",
        answers : ["Lal Bahdur Shastri" , "Gandhiji","Sardar Vallabhai Patel"],
        correct : 1,
    },
    {
        question : "Which monument is known for about 1000 windows ?",
        answers : ["Charminar" , "Hawa Mahal"],
        correct : 2,
    },
    {
        question : "Who founded Facebook ?",
        answers : ["Larry Page" , "Mark Zukerburg"],
        correct : 2,
    },
    {
        question : "Who was the first PM representing not Congress but BJP?",
        answers : ["Atal Bihari Vajapyee" , "Narendra Modi"],
        correct : 1,
    },
    {
        question : "Which Tomb was built for Nawab Of Oudh ?",
        answers : ["Tomb of Sher Shah Suri" , "Safdar Jang Tomb"],
        correct : 2,
    }
]
var questionIndex = 0;
var scorePoint = 0;
var Counter;
var timer = 20;
var TimerElement = $(".quiz_timer .time")

$(document).ready(function () {
    loadQuiz();
});
function loadQuiz() {
    questionIndex = 0;
    scorePoint = 0;
    timer = 20;
    $(".action_btns .btn-start")
    .html("Start")
    .fadeIn(500)
    .on("click" , () => {
        $(".welcome-txt").fadeOut(500);
        $(".action_btns .btn-start").fadeOut(600)
        setTimeout(() => {
            $(".quiz_stats").fadeIn(500)
            $(".question_wrapper").fadeIn(500)
            loadNewQuestion();
        }, 500);
    });
    refreshQuiz();
}
function loadNewQuestion() {
    
    if (questionIndex >= questions.length) {
        $(".rScore").html(scorePoint);
        $(".rQuestions").html(questions.length);
        $(".rCorrect").html(scorePoint / 5);
        $(".rWrong").html(questions.length - (scorePoint / 5));
        $(".rPercentage").html(`${((scorePoint / 5) / questions.length * 100).toFixed(1)}%`);
        $(".quiz_wrapper").hide();
        $(".results_wrapper").fadeIn();
    }
    else{
        loadQuestion();
        refreshQuiz();
        TimerElement.html(timer);
        $(".options_wrapper .option").hide();
        $(".options_wrapper .option").removeClass("green");
        $(".options_wrapper .option").removeClass("red");
        $(".action_btns .btn-start").hide();
        $(".options_wrapper").fadeIn(500);
        setTimeout(() => {
            $(".options_wrapper .option:nth-child(1)").fadeIn(500);
            setTimeout(() => {
                $(".options_wrapper .option:nth-child(2)").fadeIn(500);
                $(".action_btns .btn-start").off("click");
                $(".options_wrapper .option").on("click" , (e) => checkAnswer(e));
                Counter = setInterval(TimeInterval , 1000)
            }, 500);
        }, 500);
    }
}

function TimeInterval() {
    timer--;
    TimerElement.html(timer);
    if (timer <= 0) {
        TimerElement.html("0");
        $(`.options_wrapper .option:nth-child(${questions[questionIndex].correct})`).click();
        scorePoint = scorePoint - 5;
        clearInterval(Counter);
        timer = 20;
    }
}
function checkAnswer(e) { 
    Eventclass = e.target.classList;
    if ((Eventclass.contains("one") && questions[questionIndex].correct == 1) || 
        (Eventclass.contains("two") && questions[questionIndex].correct == 2))
    {
        Eventclass.add("green");
        scorePoint = scorePoint + 5;
        $(".points").html(scorePoint);
    }
    else{
        Eventclass.add("red");
        $(".points").html(scorePoint);
    }
    questionIndex++;
    $(".options_wrapper .option").off("click");
    clearInterval(Counter);
    timer = 20;
    if (questionIndex >= questions.length) {
        $(".action_btns .btn-start").html("Go Results").fadeIn("1000").on("click", () => {
            loadNewQuestion();
        });
    }
    else{
        $(".action_btns .btn-start").html("Next Question").fadeIn("1000").on("click", () => {
            loadNewQuestion();
        });
    }
}
function loadQuestion() {
    $(".question_wrapper .question .txt").html(questions[questionIndex].question);
    for (let i = 0; i < questions[questionIndex].answers.length; i++) {
        $(".options_wrapper .option:nth-child("+(i + 1)+")")
            .html(questions[questionIndex].answers[i]);
    }
    clearInterval(Counter);
    timer = 20;
}
function refreshQuiz() {
    $(".total").html(questions.length);
    $(".answered").html(questionIndex + 1);
    $(".points").html(scorePoint);
}