/// <reference types="cypress" />
import React from 'react'
import { Numbers } from './Numbers'
import '../App.css'
import { SudokuContext } from '../context/SudokuContext'

it('Shows numbers', () => {
  cy.mount(
    <SudokuContext.Provider value={{ numberSelected: '7' }}>
      <div className="innercontainer" style={{ paddingTop: '30px' }}>
        <section className="status">
          <Numbers onClickNumber={cy.stub().as('clicked')} />
        </section>
      </div>
    </SudokuContext.Provider>,
  )
  cy.contains('7').should('have.class', 'status__number--selected')

  cy.contains('5').click()
  cy.get('@clicked').should('have.been.calledOnceWith', '5')
  cy.contains('9').click()
  cy.get('@clicked').should('have.been.calledTwice')
  cy.screenshot('desktop-numbers', { overwrite: true })

  cy.viewport(290, 500)
  cy.screenshot('mobile-numbers', { overwrite: true })
})
