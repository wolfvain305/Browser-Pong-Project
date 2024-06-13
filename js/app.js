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

//Game State of Play
    //Paddless
        function update() {
            if ((upPressed || wPressed) && leftPaddle > 0) {
                leftPaddle -= paddleSpeed
            } else if ((downPressed || sPressed) && leftPaddle + paddleHeight < canvas.height) {
                leftPaddle += paddleSpeed
            }

        
        }
    //Move Ball
       ballX += ballSpeedX
       ballY += ballSpeedY

    //If Ball Hits a paddle
        
    // Ball Moving and resetting
    function Balls () {
        ballX 
        ballY
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
            ctx.
            ctx.

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