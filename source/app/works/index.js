import * as slider from './slider'
import * as formBlur from './formBlur'
import { clearValue, validate } from './form'
import $ from 'jquery'

$(document).ready(() => {
  const name = $('input.form__name-input')
  const email = $('input.form__mail-input')
  const comment = $('textarea.form__comment-input')
  const validateText = $('span.form__validate-text')
  const submit = $('button.form__submit')
  const clear = $('button.form__clear')
  const blockToHide = $('div.form__content')
  const messageToShow = $('div.form__message-to-show')

  clear.on('click', () => clearValue(name, email, comment, validateText))
  validate(name, email, comment, validateText, submit, blockToHide, messageToShow)

})