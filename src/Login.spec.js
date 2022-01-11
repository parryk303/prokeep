/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react'
import Login from './Login'
import { render, fireEvent, screen, act } from '@testing-library/react'

describe('Login', () => {
  describe('with valid inputs', () => {
    it('calls the onSubmit function', async () => {
      const mockOnSubmit = jest.fn()
      const { getByRole } = render(<Login onSubmit={mockOnSubmit}/>)

      await act(async () => {
        fireEvent.change(screen.getByLabelText('Email Address *'), {target: {value: 'email@test.com'}})
        fireEvent.change(screen.getByLabelText('Password *'), {target: {value: '1234567'}})
      })

      await act(async () => {
        fireEvent.click(getByRole('button'))
      })

      expect(mockOnSubmit).toHaveBeenCalled()
    })
  })

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
      const { container} = render(<Login />)

      await act(async () => {
        const paswordInput = screen.getByLabelText('Password *')
        fireEvent.change(paswordInput, {target: {value: '123'}})
        fireEvent.blur(paswordInput)
      })

      expect(container.innerHTML).toMatch('Password should be longer than 7 characters')

    })
  })
})