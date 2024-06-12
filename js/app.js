// Constants
    //Canvas
        let canvas = document.getElementById("canvas")
        let ctx = canvas.getContext('2d')

    //Buttons
        let startBtn = document.getElementById('startBtn')
        let pauseBtn = document.getElementById('pauseBtn')
        let restartBtn = document.getElementById('restartBtn')
        let EasyBtn = document.getElementById('restartBtn')
        let MediumBtn = document.getElementById('restartBtn')
        let HardBtn = document.getElementById('restartBtn')
        let animationId
        let gameRunning = false

    //Key Presses
        let upPressed = false
        let downPressed = false

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

    // EasyBtn.addEventListener('click')
    // MediumBtn.addEventListener('click')
    // HardBtn.addEventListener('click')

//Game Items
    // Ball properties
        let ballRadius = 5
        let ballX = canvas.width / 2
        let ballY = canvas.height / 2
        let ballSpeedX = 5
        let ballSpeedY = 5

    // Paddle properties
        let paddleHeight = 80
        let paddleWidth = 10
        let leftPaddle = canvas.height / 2 - paddleHeight / 2
        let rightPaddle = canvas.height / 2 - paddleHeight / 2
        let paddleSpeed = 10
    
    //Paddle keyPresses
        function keyUpPress(event) {
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

        function keyDwonPress(event) {
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

//Game State
    //Paddles
        function update() {
            if (upPressed && leftpaddle > 0) {
                leftPaddle -= paddleSpeed
            } else if (downPressed && leftPaddle + paddleHeight < canvas.height) {
                leftPaddle += paddleSpeed
            }
        }
    
    //Move Ball
    ballX += ballSpeedX
    ballY += ballSpeedY

    