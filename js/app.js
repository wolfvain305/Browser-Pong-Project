// Constants
    //Canvas
        let canvas = document.getElementById("canvas")
        let ctx = canvas.getContext('2d')

    //Buttons
        let startBtn = document.getElementById('startBtn')
        let pauseBtn = document.getElementById('pauseBtn')
        let restartBtn = document.getElementById('restartBtn')
        // let EasyBtn = document.getElementById('restartBtn')
        // let MediumBtn = document.getElementById('restartBtn')
        // let HardBtn = document.getElementById('restartBtn')
        let animationId
        let gameRunning = false

    //Key Presses
        let upPressed = false
        let downPressed = false
        let wPressed = false
        let sPressed = false

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

    // EasyBtn.addEventListener('click')
    // MediumBtn.addEventListener('click')
    // HardBtn.addEventListener('click')

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
    
//Paddle keyPresses / Ball Resetting
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
//Game State of Play
    function update() {
        //moving paddles
            if ((upPressed || wPressed) && leftPaddle > 0) {
                leftPaddle -= paddleSpeed
            } else if ((downPressed || sPressed) && leftPaddle + paddleHeight < canvas.height) {
                leftPaddle += paddleSpeed
            }
            
        // Right Paddle as computer
            if ( ballY > rightPaddle) {
                rightPaddle += paddleSpeed
            } else if (ballY < rightPaddle) {
                rightPaddle -= paddleSpeed
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
        
        // Ball ressetting when it goes out of bounds
            if (ballX < 0) {
                Ballreset()
            } else if (ballX > canvas.width) {
                Ballreset()
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
    
    // Score Boards
        // ctx.
        // ctx.
    // Ball
        ctx.beginPath()
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    //Paddle
        ctx.fillRect(0, leftPaddle, paddleWidth, paddleHeight)
        ctx.fillRect(canvas.width - paddleWidth, rightPaddle, paddleWidth, paddleHeight)
    
    
    }


        // Game Loop
        function loop() {
            update()
            draw()
            animationId = requestAnimationFrame(loop)
        }