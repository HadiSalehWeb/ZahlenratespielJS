const maxAttempts = 10
const minGuess = 0
const maxGuess = 1000
var chart;

const state = {
    finished: false,
    number: Math.floor(minGuess + (maxGuess - minGuess) * Math.random()),
    guess: -1,
    guessesCount: 0
}

const onLoad = function () {
    document.getElementById('min-guess').innerHTML = minGuess
    document.getElementById('max-guess').innerHTML = maxGuess
    document.getElementById('max-attempts').innerHTML = maxAttempts
    document.getElementById('ausgabe').style.opacity = 0
    document.getElementById('result').style.display = 'none'
    document.getElementById('result').className = 'text-light rounded'

    const canvas = document.getElementById('chart')
    const ctx = canvas.getContext('2d');
    chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Tipp',
                data: [],
                borderColor: 'rgba(234, 104, 246, 1)',
                backgroundColor: 'rgba(234, 104, 246, 1)',
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        suggestedMin: 1,
                        suggestedMax: 10
                    }
                }],
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 1000,
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

const guess = function () {
    if (state.finished) return

    const currentGuess = document.getElementById('guess').value

    if (isNaN(currentGuess) || currentGuess === '') {
        alert('Invalid input.')
        return
    }

    state.guess = Number.parseInt(currentGuess)
    state.guessesCount++
    chart.data.datasets[0].data.push({ x: state.guessesCount, y: state.guess })
    chart.update()

    document.getElementById('ausgabe').style.opacity = 1
    document.getElementById('attempts').innerHTML = state.guessesCount
    document.getElementById('evaluation').innerHTML = state.guess === state.number ? 'Richtig geraten!' : state.guess > state.number ? 'Tipp ist zu groß.' : 'Tipp ist zu klein.'

    if (state.guessesCount >= maxAttempts || state.number === state.guess) {
        state.finished = true
        document.getElementById('result').innerHTML = state.guess === state.number ? 'Gewonnen!' : `Verloren. Richtige Antwort: ${state.number}`
        document.getElementById('result').classList.add(state.guess === state.number ? 'bg-success' : 'bg-danger');
        document.getElementById('result').style.display = 'inline'
    }
}

document.getElementById('guess').addEventListener('keydown', e => { if (e.keyCode === 13) guess(); })

const restart = function () {
    document.getElementById('ausgabe').style.opacity = 0
    document.getElementById('result').style.display = 'none'
    document.getElementById('result').className = 'text-light rounded'
    state.finished = false
    state.number = Math.floor(minGuess + (maxGuess - minGuess) * Math.random())
    state.guess = -1
    state.guessesCount = 0
}

onLoad()

