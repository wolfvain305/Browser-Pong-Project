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

    // EasyBtn.addEventListener('click')
    // MediumBtn.addEventListener('click')
    // HardBtn.addEventListener('click')

    // Ball properties
    let ballRadius = 5
    let ballX = canvas.width / 2
    let ballY = canvas.height / 2
    let ballSpeedX = 5
    let ballSpeedY = 5

    // Paddle properties

    let 