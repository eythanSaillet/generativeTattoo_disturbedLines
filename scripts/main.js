function setup()
{
    createCanvas(window.innerWidth * 0.75, 300).parent('canvasContainer')
    background(255)

    system.init()
    datGuiSetup()
}

let system = 
{
    canvasWidth : null,
    canvasHeight : null,
    
    // SYSTEM PROPERTIES
    numberOfLines : 15,
    stepBetweenLines : 23,
    factorIncrementation : 20,
    lineWeight : 2,

    timeInterval : 100,

    // SYSTEM VAR
    origin : {x: 10, y: -2},
    xMax: 0,
    point : {},
    tempPoint : {},

    // GENERATION FUNCTION VAR
    lineCounter : 0,
    finishToGenerate : true,

    // REVERS OPTION VAR
    reverse : true,
    lines : [],
    finishToGenerateReverse : true,
    reverseColor : '#ff0000',

    // NOISE PROPERTIES
    noiseScale : 0.008,
    noiseFactor : 0,

    init()
    {
        this.canvasWidth = 5000
        this.canvasHeight = height

        this.generate()
    },

    generate()
    {
        if(this.finishToGenerate && this.finishToGenerateReverse)
        {
            this.finishToGenerate = false

            // RESET VALUES
            noiseSeed(random(99999))
            this.point = {}
            this.tempPoint = {}
            this.origin = {x: 10, y: -2}
            this.noiseFactor = 0
            background(255)

            // RESET REVERSE VALUE
            this.lines = []

            resizeCanvas(this.canvasWidth, this.canvasHeight)
    
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
                if(this.reverse)
                {
                    this.finishToGenerate = true
                    this.finishToGenerateReverse = false
                    this.drawReverse()
                }
            }
        }
        drawLineInterval()
    },

    drawLine()
    {

        noFill()
        stroke(0)
        strokeWeight(this.lineWeight)

        let tab = []

        beginShape()
        for (let i = 0; i < this.canvasHeight; i = i + 5)
        {

            this.point.y = i + this.origin.y
            this.point.x = noise(i * this.noiseScale) * this.noiseFactor + this.origin.x

            curveVertex(this.tempPoint.x, this.tempPoint.y, this.point.x, this.point.y)

            // SAVE LINE FOR REVERSE OPTION
            tab.push(this.point.x)

            this.tempPoint.x = this.point.x
            this.tempPoint.y = this.point.y
        }
        endShape()

        // PUSHING LINE IN THE LINES ARRAY
        this.lines.push(tab)
    },

    drawReverse()
    {
        noFill()
        stroke(this.reverseColor)
        strokeWeight(this.lineWeight)

        let i = this.lines.length - 1
        let step = 0
        let drawLineInterval = () =>
        {
            if (i >= 0)
            {
                setTimeout(() =>
                {
                    // Draw lines
                    beginShape()
                    for (let j = 0; j < this.canvasHeight; j++)
                    {
                        this.point.x = this.lines[i][j] + this.stepBetweenLines * step * 3 + this.stepBetweenLines
                        this.point.y = j * 5 + this.origin.y

                        curveVertex(this.tempPoint.x, this.tempPoint.y, this.point.x, this.point.y)

                        this.tempPoint.x = this.point.x
                        this.tempPoint.y = this.point.y
                        // curveVertex()
                    }
                    endShape()

                    // Update values
                    this.origin.x += this.stepBetweenLines
                    this.noiseFactor -= this.factorIncrementation
                    i--
                    step++
                    drawLineInterval()
                }, this.timeInterval)
            }
            else
            {
                this.finishToGenerateReverse = true
            }
        }
        drawLineInterval()
    },

    save()
    {
        saveCanvas('disturbedLines', 'png')
    }
}

function draw()
{
}


function datGuiSetup()
{
    let gui = new dat.GUI()

    // gui.add(system, 'canvasWidth', 0, 5000)
    gui.add(system, 'canvasHeight', 0, window.innerHeight)
    gui.add(system, 'numberOfLines', 0, 50)
    gui.add(system, 'stepBetweenLines', 0, 50)
    gui.add(system, 'factorIncrementation', 0, 100)
    gui.add(system, 'noiseScale', 0, 0.05)
    gui.add(system, 'lineWeight', 0, 5)
    gui.add(system, 'reverse')
    gui.addColor(system, 'reverseColor');
    gui.add(system, 'save')
    gui.add(system, 'generate')
}