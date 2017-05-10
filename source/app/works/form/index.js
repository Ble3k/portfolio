import $ from 'jquery'

const NAME_INPUT = 'nameInput'
const EMAIL_INPUT = 'emailField'
const COMMENT_INPUT = 'commentField'

const removeError = input => (input || $('.form__input')).removeClass('errorBox')

export const clearValue = (
  nameField = {},
  emailField = {},
  commentField = {},
  validateTextElem = {}
) => {
  nameField.val(undefined)
  window[NAME_INPUT] = undefined

  emailField.val(undefined)
  window[EMAIL_INPUT] = undefined

  commentField.val(undefined)
  window[COMMENT_INPUT] = undefined

  validateTextElem.html('')
  removeError()
}

export const validate = (
  nameField = {},
  emailField = {},
  commentField = {},
  validateTextElem = {},
  sbmtBtn = {},
  blockToHide = {},
  messageToShow = {}
) => {
  nameField.on('keyup', () => inputHandle(NAME_INPUT, nameField))
  nameField.on('change', () => inputHandle(NAME_INPUT, nameField))

  emailField.on('keyup', () => inputHandle(EMAIL_INPUT, emailField))
  emailField.on('change', () => inputHandle(EMAIL_INPUT, emailField))

  commentField.on('keyup', () => inputHandle(COMMENT_INPUT, commentField))
  commentField.on('change', () => inputHandle(COMMENT_INPUT, commentField))

  const emailRegExp = /[^@]+@[^@]+\.[^@]+/

  const inputHandle = (variable, input) => {
    if (variable === EMAIL_INPUT) {
      (window[variable] = emailRegExp.test(input.val())) && validateTextElem.html('') // save, then call (or not)
    } else {
      (window[variable] = input.val().length > 1) && validateTextElem.html('') // save, then call (or not)
    }
  }

  const inputError = input => input.addClass('errorBox')

  sbmtBtn.on('click', e => sendData(e))

  const sendData = e => {
    e.preventDefault()
    if (
      window[NAME_INPUT] &&
      window[COMMENT_INPUT] &&
      emailRegExp.test(emailField.val())
    ) {
      sbmtBtn.attr('disabled', true)
      $.ajax({
        type: 'POST',
        url: '/app/backend/send.php',
        data: {
          name: nameField.val(),
          email: emailField.val(),
          comment: commentField.val(),
        },
        success: data => {
          blockToHide.addClass('hide')
          messageToShow.addClass('show')
          if (data === 'error') messageToShow.html('Error!').css('color', '#eb6258')
          setTimeout(function() {
            blockToHide.removeClass('hide')
            messageToShow.removeClass('show')
            sbmtBtn.attr('disabled', false)
            clearValue(nameField, emailField, commentField, validateTextElem)
          }, 3000)
        },
        dataType: 'text'
      });
    } else {
      !window[NAME_INPUT] && inputError(nameField);
      !window[COMMENT_INPUT] && inputError(commentField);
      !emailRegExp.test(emailField.val()) && validateTextElem.html('Некорректный email') && inputError(emailField);
      (!window[NAME_INPUT] || !window[COMMENT_INPUT]) && validateTextElem.html('Пожалуйста, заполните выделенные поля');
    }
  }

  nameField.focus(() => {
    removeError(nameField)
    validateTextElem.html('')
  })
  emailField.focus(() => {
    removeError(emailField)
    validateTextElem.html('')
  })
  commentField.focus(() => {
    removeError(commentField)
    validateTextElem.html('')
  })
}