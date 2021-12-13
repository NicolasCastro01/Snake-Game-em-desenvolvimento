let button = document.getElementById('clear')

button.addEventListener('click', ()=>{
    let logs = document.getElementById('logs')
    logs.innerHTML = ' '
})

let title = document.getElementById('title')
let console = document.getElementById('consolelog')

title.addEventListener('click', () => {
    console.classList.toggle('active')
    button.classList.toggle('hidden')
})