// Constants
    //Canvas
        const canvas = document.getElementById("canvas")
        let ctx = canvas.getContext('2d')

    //Buttons/Options
        const startBtn = document.getElementById('startBtn')
        const pauseBtn = document.getElementById('pauseBtn')
        const restartBtn = document.getElementById('restartBtn')
        let easy = document.getElementsByName('easy')
        let medium = document.getElementsByName('medium')
        let hard = document.getElementsByName('hard')

        let animationId
        let gameRunning = false
        
    // Message Board
        const messageEl = document.getElementById('message');
    
    //Key Presses
        let upPressed = false
        let downPressed = false
        let wPressed = false
        let sPressed = false
    
    //Game Items
        // Ball properties
            let ballRadius = 10
            let ballX = canvas.width / 2
            let ballY = canvas.height / 2
            let ballSpeedX = 2.5
            let ballSpeedY = 2.5

        // Paddle properties
            let paddleHeight = 100
            let paddleWidth = 10
            let leftPaddle = canvas.height / 2 - paddleHeight / 2
            let rightPaddle = canvas.height / 2 - paddleHeight / 2
            let paddleSpeed = 7.5

        // Score boarding
            let leftPlayerScore = 0
            let rightPlayerScore = 0
            let winningScore = 2

        // Difficulty
            let selectDifficulty = document.getElementById('difficultySelect')
            const difficultyLevels = {
                easy: {
                    ballSpeedX: 2.5,
                    ballSpeedY: 2.5,
                    paddleSpeed: 5
                },
                medium: {
                    ballSpeedX: 3.5,
                    ballSpeedY: 3.5,
                    paddleSpeed: 7.5
                },
                hard: {
                    ballSpeedX: 5,
                    ballSpeedY: 5,
                    paddleSpeed: 10
                },
            }
        
            let currentDifficulty = difficultyLevels.easy
        // Game Mode
            const gameModeRadios = document.getElementsByName('gameType')
            let vsAIRadio = document.querySelector('input[value="vsAI"]')

// Setting the Event Listeners
    startBtn.addEventListener('click', function() {
        if (!gameRunning) {
            gameRunning = true
            loop()
        }
    })
    
    pauseBtn.addEventListener('click', function() {
        gameRunning = false
        cancelAnimationFrame(animationId)
    })
    
    restartBtn.addEventListener('click', function() {
        document.location.reload()
    })
    
    document.addEventListener("keydown", keyDownPress)
    document.addEventListener("keyup", keyUpPress)
    
    // Loads the game when first opening page
    addEventListener("load", (event) => {
        draw()
    })

    selectDifficulty.addEventListener('change', function() {
        setDifficulty(this.value); // this.value will be 'easy', 'medium', or 'hard'
    });

    // Game Mode Listeer
    gameModeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (radio.value === 'vsAI') {
                vsAIRadio.checked = true
                selectDifficulty.disabled = false
            } else {
                selectDifficulty.disabled = true
            }
        })
    })
// Functions
    //Movement 
    function keyDownPress(event) {
        if (event.key === "ArrowUp") {
            upPressed = true
        } else if (event.key === "ArrowDown") {
            downPressed = true
        } else if (event.key === "w") {
            wPressed = true
        }  else if (event.key === "s") {
            sPressed = true
        }
    }
    
    function keyUpPress(event) {
        if (event.key === "ArrowUp") {
            upPressed = false
        } else if (event.key === "ArrowDown") {
            downPressed = false
        } else if (event.key === "w") {
            wPressed = false
        }  else if (event.key === "s") {
            sPressed = false
        }
    }
    
    // Ball Moving and resetting
    function Ballreset () {
        ballX = canvas.width / 2
        ballY = canvas.height / 2
        ballSpeedX = -ballSpeedX
        ballSpeedY = Math.random() *10 - 5
    }
    
    // winningScore
    function playerWin (player) {
        if (player === "AI Player") {
            messageEl.textContent = "Oh NO! Try Again"
        } else if (player === "Left Player") {
            messageEl.textContent = "Congrats! You Win!"
        }
        gameRunning = false
        Ballreset()
    }

    //Change Difficulty    
    function setDifficulty(difficulty) {
        if (currentDifficulty) {
            currentDifficulty = difficultyLevels[difficulty]
            ballSpeedX = currentDifficulty.ballSpeedX
            ballSpeedY = currentDifficulty.ballSpeedY
        } else {
            console.error("Invalid difficulty selected:", difficulty)
        }
    }
    

//Game State of Play
    function update() {
        //moving paddles

        if ((wPressed) && leftPaddle > 0) {
            leftPaddle -= paddleSpeed;
        } else if ((sPressed) && leftPaddle + paddleHeight < canvas.height) {
            leftPaddle += paddleSpeed;
        }
    
        // Update right paddle position (AI or second player)
        if (vsAIRadio.checked) {
            // AI controlled right paddle
            if (ballY > rightPaddle) {
                rightPaddle += paddleSpeed;
            } else if (ballY < rightPaddle) {
                rightPaddle -= paddleSpeed;
            }
        } else {
            // Second player controlled right paddle (multiplayer mode)
            if ((downPressed) && rightPaddle + paddleHeight < canvas.height) {
                rightPaddle += paddleSpeed;
            } else if ((upPressed) && rightPaddle > 0) {
                rightPaddle -= paddleSpeed;
            }
        }
        
        //Move Ball
           ballX += ballSpeedX
           ballY += ballSpeedY

        //If Ball Hits canvas or paddle
            if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
                return(ballSpeedY = -ballSpeedY)
            }
            if (
                ballX - ballRadius < paddleWidth && 
                ballY > leftPaddle &&
                ballY < leftPaddle + paddleHeight
            ){
                return(ballSpeedX = -ballSpeedX)
            }
            if (
                ballX + ballRadius > canvas.width - paddleWidth && 
                ballY > rightPaddle &&
                ballY < rightPaddle + paddleHeight
            ) {
                return(ballSpeedX = -ballSpeedX)
            }
        
        // Ball ressetting when it goes out of bounds + adding score
            if (ballX < 0) {
                Ballreset()
                rightPlayerScore++
            } else if (ballX > canvas.width) {
                Ballreset()
                leftPlayerScore++
            }
        
        // Max Score and Win
            if (leftPlayerScore === winningScore) {
                playerWin("Left player")
            } else if (rightPlayerScore === winningScore){
                playerWin("AI Player")
            }
    }

// Game Properties on Canvas
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#FFF'
        ctx.font = '15px Arial'
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, 0)
        ctx.lineTo(canvas.width / 2, canvas.height)
        ctx.strokeStyle = '#FFF'
        ctx.stroke()
        ctx.closePath()
    
    // Ball
        ctx.beginPath()
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()

    //Paddle
        ctx.fillRect(0, leftPaddle, paddleWidth, paddleHeight)
        ctx.fillRect(canvas.width - paddleWidth, rightPaddle, paddleWidth, paddleHeight)
    
    //Scores
    ctx.fillText("Score: " + leftPlayerScore, 10, 20)
    ctx.fillText("Score: " + rightPlayerScore, canvas.width - 70, 20)
    }


// Game Loop
function loop() {
    if(gameRunning) {
        update()
        draw()
        animationId = requestAnimationFrame(loop)
    }
    
}      
