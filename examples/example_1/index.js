import Scroller from '../../src/scroller'

const scene = new Scroller({
  scene: document.getElementById('one')
})

const txt = document.getElementById('one_text')

scene.subscribe((ratio) => {
  console.log('External ratio', ratio)
  txt.style.transform = `translateY(${ratio * 2000}px)`
  txt.style.opacity = 1 - 5 * ratio
})

const scene2 = new Scroller({
  scene: document.getElementById('two'),
  triggerPoint: 'onHalf'
})
const txt2 = document.getElementById('two_text')

scene2.subscribe((ratio) => {
  console.log('Ratio 2', ratio)
  txt2.style.transform = `translateY(${ratio * 100 * 6}px)`
  txt2.style.opacity = 1 - ratio
})
