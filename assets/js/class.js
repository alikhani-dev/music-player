'use strict'
class Player {
  constructor (_container, _source) {
    this.currentIndex = 0
    this.source = _source
    this.playRandom = false
    this.container = document.querySelector(_container)
    this.player = this.container.querySelector('audio')
    this.progressBarVolume = this.container.querySelector('.volume .progress')
    this.seekBar = this.container.querySelector('#time .progressBar')
    this.btnPlay = this.container.querySelector(`[data-action='play']`)
    this.progressBar = this.container.querySelector('.progressBar span')
    this.container.addEventListener('click', e => {
      const action = e.target.dataset.action
      action && action in this && this[action]()
    })
    this.appendItemList()
    this.changeSrc(0)
    this.progressBarVolume.addEventListener('click', event =>
      this.changeVolume(event)
    )
    this.seekBar.addEventListener('click', this.seek.bind(this))
    this.player.addEventListener('play', this.onplay.bind(this))
    this.player.addEventListener('ended', this.ended.bind(this))
    this.player.addEventListener('pause', this.onpause.bind(this))
    this.player.addEventListener('timeupdate', this.showCurrentTime.bind(this))
    this.player.addEventListener('loadedmetadata', () =>
      this.showDetail([this.player.duration])
    )
  }
  changeVolume (e) {
    const { target } = e
    this.player.volume = e.offsetX / target.offsetWidth
    target.firstElementChild.style.width = e.offsetX + 'px'
    const icon = target.previousElementSibling
    const volume = this.player.volume
    if (volume < 0.5) {
      icon.classList.replace('fa-volume-up', 'fa-volume-down')
    } else {
      icon.classList.replace('fa-volume-down', 'fa-volume-up')
    }
  }
  showDetail (duration) {
    let sec = Math.floor(duration % 60)
    let min = Math.floor(duration / 60)
    if (sec < 10) sec = '0' + sec
    if (min < 10) min = '0' + min
    timeEnd.textContent = min + ':' + sec
    const source = this.source[this.currentIndex]
    document.querySelector('#artist').textContent = source.artist
    document.querySelector('#nameMusic').textContent = source.name
    document.querySelector(
      '.bg-img .cover'
    ).style.backgroundImage = `url(${source.cover})`
  }
  play () {
    this.player.play()
  }
  pause () {
    this.player.pause()
  }
  repeat () {
    this.container
      .querySelector(`[data-action='repeat']`)
      .classList.toggle('active')
    this.player.loop = this.player.loop ? false : true
    if (this.playRandom) {
      this.playRandom = false
      document
        .querySelector('[data-action="random"]')
        .classList.remove('active')
    }
  }
  random () {
    this.container
      .querySelector(`[data-action='random']`)
      .classList.toggle('active')
    this.playRandom = this.playRandom ? false : true
    if (this.player.loop) {
      this.container
        .querySelector(`[data-action='repeat']`)
        .classList.remove('active')
      this.player.loop = false
    }
  }
  onplay () {
    this.btnPlay.classList.replace('fa-play', 'fa-pause')
    this.btnPlay.dataset.action = 'pause'
    document.querySelector('.bg-img .cover').style.animationPlayState =
      'running'
    document
      .querySelector(`[data-index='${this.currentIndex}']`)
      .classList.replace('fa-music', 'fa-compact-disc')
  }
  onpause () {
    this.btnPlay.classList.replace('fa-pause', 'fa-play')
    this.btnPlay.dataset.action = 'play'
    document.querySelector('.bg-img .cover').style.animationPlayState = 'paused'
  }
  showCurrentTime () {
    const { currentTime, duration } = this.player
    this.progressBar.style.width = `${(currentTime / duration) * 100}%`
    let sec = Math.floor(currentTime % 60)
    let min = Math.floor(currentTime / 60)
    if (sec < 10) sec = '0' + sec
    if (min < 10) min = '0' + min
    document.querySelector('#timeStart').textContent = min + ':' + sec
  }
  seek (e) {
    this.player.currentTime =
      (e.offsetX * this.player.duration) / this.seekBar.offsetWidth
  }
  next () {
    this.removeOldIconPlay()
    this.changeSrc(++this.currentIndex)
    this.play()
  }
  prev () {
    this.removeOldIconPlay()
    this.changeSrc(--this.currentIndex)
    this.play()
  }
  appendItemList () {
    const template = document.querySelector('#item')
    const container = document.querySelector('.playlist')
    this.source.forEach((source, index) => {
      const item = template.content.cloneNode(true).firstElementChild
      item.innerHTML = item.innerHTML.replace(/{(\w+)}/g, (_, key) => {
        if (key in source) {
          return source[key]
        } else if (this.currentIndex === index && key == 'fontawesome') {
          return 'fa-compact-disc'
        } else if (key == 'fontawesome') {
          return 'fa-music'
        } else {
          return index
        }
      })
      item
        .querySelector('[data-index]')
        .addEventListener(
          'click',
          () => this.currentIndex !== index && this.goToSong(index)
        )
      container.appendChild(item)
    })
  }
  removeOldIconPlay () {
    document
      .querySelector(`.fa-compact-disc`)
      .classList.replace('fa-compact-disc', 'fa-music')
  }
  goToSong (index) {
    this.removeOldIconPlay()
    this.currentIndex = index
    this.changeSrc(this.currentIndex)
    this.play()
  }
  changeSrc (index) {
    this.currentIndex =
      index > this.source.length - 1
        ? (this.currentIndex = 0)
        : index == -1
        ? (this.currentIndex = this.source.length - 1)
        : this.currentIndex
    this.player.src = this.source[this.currentIndex]['src']
    this.showCurrentTime()
  }
  ended () {
    if (this.playRandom) {
      this.currentIndex = Math.floor(
        Math.random() * (this.source.length - 0 + 1) + 0
      )
      this.next()
    } else {
      this.player.loop ? this.player.load() : this.next()
    }
  }
}
