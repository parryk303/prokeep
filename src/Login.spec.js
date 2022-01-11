/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react'
import Login from './Login'
import { render, fireEvent, screen, act } from '@testing-library/react'

describe('Login', () => {
  describe('with invalid email', () => {
    it('renders the email validation error', async () => {
      const { container } = render(<Login />)

      await act(async () => {
        const emailInput = screen.getByLabelText('Email Address *')
        fireEvent.change(emailInput, {target: {value: 'invalid email'}})
        fireEvent.blur(emailInput)
      })

      expect(container.innerHTML).toMatch('Please enter a valid email')
    })
  })

  describe('with invalid password', () => {
    it('renders the password validation error', async () => {
      const { container } = render(<Login />)

      await act(async () => {
        const paswordInput = screen.getByLabelText('Password *')
        fireEvent.change(paswordInput, {target: {value: '123'}})
        fireEvent.blur(paswordInput)
      })

      expect(container.innerHTML).toMatch('Password should be longer than 7 characters')
    })
  })
})