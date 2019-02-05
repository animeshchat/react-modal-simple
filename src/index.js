import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Cross extends Component
{
  render()
  {
    // If required, the svg styles (stroke, height, width) can be exposed as props.
    return(
      <svg viewBox="0 0 27 27"  preserveAspectRatio="xMidYMid meet" style={{stroke: '#000000', height: '1.2em', width:'1.2em'}}>
        <g transform="translate(0,-1026.3622)"><path style={{fill:'none', strokeWidth:'2px',strokeLinecap:'butt',strokeLinejoin:'miter',strokeOpacity:1}} d="m 0.3125,1026.6926 c 25.669643,25.8035 25.669643,25.8035 25.669643,25.8035" /><path style={{fill:'none', strokeWidth:'2px',strokeLinecap:'butt',strokeLinejoin:'miter',strokeOpacity:1}} d="m 0.491071,1052.1836 c 25.401786,-25.491 25.401786,-25.491 25.401786,-25.491"/></g>
      </svg>
    )
  }
}

export default class Modal extends Component 
{
  static propTypes =
  {
    isOpen: PropTypes.bool.isRequired, // default false.
    onClose: PropTypes.func.isRequired, 
    height: PropTypes.string, // Default 'auto'. e.g '100%'. 'auto' takes up the content space.
    width: PropTypes.string, // Default 'auto' e.g '50%' 'auto' takes up content space.
    isCloseButton: PropTypes.bool, // default yes
    usefullscreen: PropTypes.number, // ex. 720.. breakpoint below which full screen will be used 
    isBackdrop: PropTypes.bool, // default true
   
    // classes
    modalClass: PropTypes.string, // name of class for styling modal
    backdropClass: PropTypes.string, // name of class for styling backdrop

    // styles
    modalStyle: PropTypes.object, // dictionary of styles
    backdropStyles: PropTypes.object, //dictionary of styles
    modalCrossStyles: PropTypes.object, // dict of styles
  }

  constructor(props)
  {
    super(props)
  }
  
  componentWillReceiveProps(nextProps)
  {
    if(nextProps.isOpen != this.props.isOpen)
    {
      if (nextProps.isOpen == true)
      {
        document.body.classList.add('empty') 
          
        // Before 2/9/2017
        // Both cross and back defaults to the same behavior to close modal - 1. pop browser history, 2. remove hash 3. call callback (which changes state and sets isModalOpen state to false, whicih causes modal to close)
        // NOTE - There is a known bug that onhashchange event doesnt fire for iOS/Chrome combination on click of back button. This means that for iOS/Chrome combination,  once the modal is open, modal will not close either for cross button or for back click, because this.close() will not be called.
        // Bug links - https://stackoverflow.com/questions/35620762/chrome-on-ios-back-forward-doesnt-work-with-history-pushstate
        // and https://bugs.chromium.org/p/chromium/issues/detail?id=559122
        // TODO - find a substitute for onhashchange for iOS/Chome or a cross browser solution 
        // On 2/9/2017 
        // Temporarily, to at least make cross button work for iOS/Chrome, we will decouple cross and back behavior. For cross button, we will explicitly pop history, remove hash and change state. This means that for other browsers, where onHashChange works, changing state (isModalOpen) will be done twice - once explicitly in parent and another time via the onHashChange flow.
        window.onhashchange = () =>
            {
              if (!location.hash) this.close()
            }
        if(window.location.hash == "")
          history.pushState({},"", window.location.pathname.split("#")[0] + "#modal-" + Math.floor(Date.now() / 1000))
      }
      else if (nextProps.isOpen == false)
      {
        document.body.classList.remove('empty') 
      }
    }

  }
  componentWillUnmount()
  {
     document.body.classList.remove('empty')
  }

  render()
  {
    if(this.props.isOpen == false)
      return(<div></div>) 
   
    if(typeof(window) == 'undefined')
      return(<div></div>)
   
    /* MODAL STYLES */
    /* default modal style*/
    let modalStyle = 
    {
      zIndex: this.props.modalStyle && this.props.modalStyle.zIndex ? this.props.modalStyle.zIndex : 51,
        background: this.props.modalStyle && this.props.modalStyle.background ? this.props.modalStyle.background : 'white',
        position: 'fixed',
        background: 'white',
    }
    let windowWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width
    
    if(this.props.usefullscreen && windowWidth <= this.props.usefullscreen)
    {
        modalStyle.position = 'fixed'
        modalStyle.height = '100%' 
        modalStyle.width = '100%' 
        modalStyle.top = 0
        modalStyle.left = 0
        modalStyle.transform = null
        modalStyle.WebkitTransform = null
        modalStyle.msTransform = null
    }
    else
    {
      let modalHeight = this.props.height || 'auto'
      let modalWidth = this.props.width || 'auto'

      let heightAdj = this.props.height ? (100 - modalHeight.split('%')[0])/2 + '%' : 'auto'
      let widthAdj = this.props.width ? (100 - modalWidth.split('%')[0])/2 + '%' : 'auto'

      modalStyle.height = modalHeight 
      modalStyle.width = modalWidth
      modalStyle.top = heightAdj
      modalStyle.left = widthAdj
      modalStyle.right = 'auto'
    
      modalStyle = 
      {
        ...modalStyle,
        ...this.props.modalStyle
      }
    }
    
    /* BACKDROP STYLES */
    /* default backdrop styles */
    let backdropStyles =
    {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: '50',
      background: 'rgba(0, 0, 0, 0.3)'
    }

    /* handle other backdrop styles */
    if (this.props.backdropStyles) {
      for (let key in this.props.backdropStyles) {
        backdropStyles[key] = this.props.backdropStyles[key]
      }
    }
    // if isBackdrop is false
    if(this.props.isBackdrop == false)
      backdropStyles['background'] = 'transparent'

    return(
      <div>
        <div className={this.props.modalClass || "modal-container"} style={modalStyle}>
          {
            this.props.isCloseButton == true ? (     
              <div style={{marginBottom: '4em'}}>
                <div onClick={()=>this.handleCloseClick()} className={"modal-cross"} style={this.props.modalCrossStyles}>
                  <Cross />
                </div>
              </div>
            ):null
          }
          {this.props.children} 
        </div>
        <div className={this.props.backdropClass} style={backdropStyles} onClick={(e) => this.closePreventDefault(e)}></div>
      </div>
    )
  }
  
  closePreventDefault(e)
  {
    e.preventDefault()
    invokeCloseModal()
  }

  close()
  {
    if(this.props.onClose) 
      this.props.onClose()
  }

  // for default close button click
  handleCloseClick()
  {
    invokeCloseModal()    
    this.close()
  }
}

// Clear history: required to call this when closing modal in ways other than back button.
// Note on back button support:
//   Hash is added to history at load time.
//   1. Change in the URL to remove hash triggers a call to the containers close method, which invokes a prop change that closes the window.
//   2. So, if we want close using non-back methods, we need to remove the extraneous history entry, which is why this function exists.
//      This also serves as a shorthand to invoke callback using (1)
export function invokeCloseModal()
{
  if(window.location.hash != '')
    window.history.back()
}

Modal.defaultProps = 
{
  isOpen: false,
  isCloseButton: true,
}
