let container = document.querySelector('.container')
let ship = document.querySelector('.ship')
let fighter = container.querySelector('.fighter')
let gameover = document.querySelector('.gameover')

window.addEventListener('DOMContentLoaded', () => {
  let audio = document.querySelector('.audio')

  audio.play()
})

let laserFunction = () => {
  asteroid = document.querySelector('.asteroid')
  let positionShipX = ship.offsetLeft
  let positionShipY = ship.offsetTop
  let laser = document.createElement('div')
  laser.classList.add('laser')
  laser.innerHTML = '🔥'
  container.insertAdjacentElement('beforeend', laser)
  laser.style.left = positionShipX + 'px'
  laser.style.top = positionShipY - 90 + 'px'
  let positionLaserY = laser.offsetTop
  let positionLaserX = laser.offsetLeft
  let positionAsteroidY = asteroid.offsetTop + 10
  let positionAsteroidX = asteroid.offsetLeft
  let interval = setInterval(() => {
    positionLaserY = laser.offsetTop
    positionLaserX = laser.offsetLeft
    positionAsteroidY = asteroid.offsetTop + 10
    positionAsteroidX = asteroid.offsetLeft
    if (positionLaserY < positionAsteroidY) {
      if (
        positionLaserX > positionAsteroidX - asteroid.offsetWidth / 2 &&
        positionLaserX < positionAsteroidX + asteroid.offsetWidth / 2
      ) {
        container.removeChild(asteroid)
        container.removeChild(laser)
        clearInterval(interval)
        createAsteroid()
      }
    }

    laser.style.top = positionLaserY - 4 + 'px'
    if (positionLaserY < -10) {
      clearInterval(interval)
      container.removeChild(laser)
    }
  }, 0.1)
}

let createAsteroid = () => {
  let asteroid = document.createElement('div')
  asteroid.classList.add('asteroid')
  asteroid.innerHTML = '🌑'
  asteroid.style.left =
    Math.floor(Math.random() * window.innerWidth - 20) + 20 + 'px'
  container.insertAdjacentElement('beforeend', asteroid)
  let asteroidFall = setInterval(() => {
    let positionAsteroid = asteroid.offsetTop
    asteroid.style.top = positionAsteroid + 1 + 'px'
    console.log('falling')
    if (positionAsteroid > window.innerHeight) {
      gameover.style.display = 'flex'
      clearInterval(asteroidFall)
    }
  }, 8)
}
createAsteroid()
let asteroid = document.querySelector('.asteroid')

document.addEventListener('keydown', event => {
  let positionShipX = ship.offsetLeft
  let positionShipY = ship.offsetTop
  if (event.keyCode === 37) {
    ship.style.left = positionShipX - 40 + 'px'
  }
  if (event.keyCode === 39) {
    ship.style.left = positionShipX + 40 + 'px'
  }
  if (event.keyCode === 32) {
    laserFunction()
  }
})

document.addEventListener('click', event => {
  laserFunction(event)
})

gameover.addEventListener('click', () => {
  location.reload()
})