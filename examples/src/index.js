import React, { Component } from 'react'
import { render} from 'react-dom'
import Modal from '../../src'
import '../../src/styles.css'

class App extends Component
{
  constructor(props)
  {
    super(props)
    this.state = 
    { 
      isModalOpen: false,
      otherModals: {
        auto: false,
        backdrop: false,
      }
    }
  }
  
  render()
  {
    return(
      <div>
        <h2> Basic Modal Demo </h2>
        <button onClick={ () => this.openModal() }> Open Modal </button>
        <Modal 
          isOpen = { this.state.isModalOpen } 
          onClose = { this.closeModal.bind(this) }
          height = { '50%' }
          width = { '50%' }
          usefullscreen = { 400 }
        >
          <div> test modal content </div>
        </Modal>

        <h2> Modal Demo (with auto height & width and with default positioning (bottom-left)) </h2>
        <button onClick={ () => this.openOtherModals('auto') }> Open Modal </button>
        <Modal 
          isOpen = { this.state.otherModals['auto'] } 
          onClose = { () => this.closeOtherModals('auto') }
        >
          <div style={{padding: '0 2em 2em'}}> modal test test test test test test test test test test  content </div>
        </Modal>
        
        <h2> Modal Demo (without backdrop) </h2>
        <button onClick={ () => this.openOtherModals('backdrop') }> Open Modal </button>
        <Modal 
          isOpen = { this.state.otherModals['backdrop'] } 
          onClose = { () => this.closeOtherModals('backdrop') }
          height = { '50%' }
          width = { '50%' }
          usefullscreen = { 400 }
          isBackdrop = {false }
        >
          <div> test modal content </div>
        </Modal>
        <h2> Modal Demo (with auto height & width, position 'bottom-right') </h2>
        <h2> Modal Demo (with auto height & width, position 'center') </h2>
        <h2> Modal Demo - with header </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>
        <h2> Modal Demo - with fixed footer </h2>

      </div>
    )
  }
  openModal()
  {
    this.setState({ isModalOpen: true })
  }
  closeModal()
  {
    this.setState({ isModalOpen: false })
  }
  openOtherModals(key)
  {
    let tempModalState = this.state.otherModals
    tempModalState[key] = true 
    this.setState({ otherModals: tempModalState })
  }
  closeOtherModals(key)
  {
    let tempModalState = this.state.otherModals
    tempModalState[key] = false
    this.setState({ otherModals: tempModalState })
  }
}

/*
const App = () => (
      <Application />
)
*/

render(<App />, document.getElementById("root"));
