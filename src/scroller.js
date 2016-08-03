'use strict'

/**
Author: Kacper "kulak" Kula
**/
export default class Scroller {
  /**
  options.scene - DOM element for a scene
  options.triggerPoint: float || 'onEnter' || 'onLeave' || 'onHalf'
  options.offset: float
  duration: float
  **/
  constructor (options) {
    this._sceneEl = options.scene
    this._offset = options._offset || 0
    this._triggerPoint = this.resolveTriggerPoint(options.triggerPoint)
    this._duration = options.duration || 0

    this._subscribers = []

    window.addEventListener('scroll', window.requestAnimationFrame.bind(null, this.onScroll.bind(this)), { passive: true })
  }

  resolveTriggerPoint (point) {
    switch (point) {
      case 'onLeave':
        return 0
      case 'onEnter':
        return 1
      case 'onHalf':
        return 0.5
      default:
        return point || 0
    }
  }

  onScroll (event) {
    // console.log('Scroll', this.getRatio())
    const ratio = this.getRatioRestricted()
    this._subscribers.forEach(fn => fn(ratio))
  }

  getRatio () {
    return (this.getParentScroll() - this.getOffset()) / this.getHeight()
  }

  getRatioRestricted () {
    return Math.min(1, Math.max(0, this.getRatio()))
  }

  getHeight () {
    return this._duration || this._sceneEl.offsetHeight
  }

  getOffset () {
    return this._sceneEl.offsetTop - (this._triggerPoint * this.getHeight()) + this._offset
  }

  getParentScroll () {
    return window.scrollY
  }

  subscribe (fn) {
    this._subscribers.push(fn)
    fn(this.getRatioRestricted())
  }

}
