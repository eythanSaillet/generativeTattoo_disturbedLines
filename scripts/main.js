function setup()
{
    createCanvas(window.innerWidth * 0.75, 300).parent('canvasContainer')
    background(255)

    system.init()
    datGuiSetup()
}

let system = 
{
    // SYSTEM PROPERTIES
    canvasWidth : null,
    canvasHeight : null,

    numberOfLines : 25,
    stepBetweenLines : 23,
    factorIncrementation : 16,
    lineWeight : 2,

    timeInterval : 100,

    origin : {x: 10, y: -2},
    point : {},
    tempPoint : {},

    reverse : false,

    lineCounter : 0,
    finishToGenerate : true,

    // NOISE PROPERTIES
    noiseScale : 0.008,
    noiseFactor : 0,

    init()
    {
        this.canvasWidth = width
        this.canvasHeight = height

        this.generate()
    },

    generate()
    {
        if(this.finishToGenerate)
        {
            this.finishToGenerate = false

            // RESET VALUES
            resizeCanvas(this.canvasWidth, this.canvasHeight)
            noiseSeed(random(99999))
            this.point = {}
            this.tempPoint = {}
            this.origin = {x: 10, y: -2}
            this.noiseFactor = 0
            background(255)
    
            // REDRAW LINES
            this.drawLines()
        }
    },

    drawLines()
    {

        this.lineCounter = 0
        let drawLineInterval = () =>
        {
            if (this.lineCounter < this.numberOfLines)
            {
                setTimeout(() =>
                {
                    this.drawLine()
                    this.origin.x += this.stepBetweenLines
                    this.noiseFactor += this.factorIncrementation
                    this.lineCounter++
                    drawLineInterval()
                }, this.timeInterval)
            }
            else
            {
                this.finishToGenerate = true
            }
        }
        drawLineInterval()
    },

    drawLine()
    {

        noFill()
        beginShape()
        for (let i = 0; i < this.canvasHeight; i = i + 5)
        {
            stroke(0)
            strokeWeight(this.lineWeight)

            this.point.y = i + this.origin.y
            this.point.x = noise(i * this.noiseScale) * this.noiseFactor + this.origin.x

            curveVertex(this.tempPoint.x, this.tempPoint.y, this.point.x, this.point.y)

            this.tempPoint.x = this.point.x
            this.tempPoint.y = this.point.y
        }
        endShape()
    },
}

function draw()
{
}


function datGuiSetup()
{
    let gui = new dat.GUI()
    
    let test = gui.add(system, 'canvasWidth', 0, window.innerWidth)
    gui.add(system, 'canvasHeight', 0, window.innerHeight)
    gui.add(system, 'numberOfLines', 0, 100)
    gui.add(system, 'stepBetweenLines', 0, 35)
    gui.add(system, 'factorIncrementation', 0, 30)
    gui.add(system, 'noiseScale', 0, 0.05)
    gui.add(system, 'lineWeight', 0, 5)
    gui.add(system, 'reverse')
    gui.add(system, 'generate')
}