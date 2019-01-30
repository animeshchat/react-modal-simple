import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './styles.css'

export default class Modal extends Component 
{
  static propTypes =
  {
    isOpen: PropTypes.bool.isRequired,
    height: PropTypes.string, // e.g '100%'
    width: PropTypes.string, // e.g '50%'
    on_close: PropTypes.func,
    modalContainerClass: PropTypes.string,
    modalStyle: PropTypes.object, // dictionary of styles
    modalClass: PropTypes.string, // name of class for styling modal
    backdrop_style: PropTypes.object, //dictionary of styles
    backdrop_class: PropTypes.string, // name of class for styling backdrop
    no_backdrop: PropTypes.bool, // bool to disable backdrop
    usefullscreen: PropTypes.number, // ex. 720.. breakpoint below which full screen will be used 
    fullScreenCloseButton: PropTypes.bool,   // default true
    nonFullScreenCloseButton: PropTypes.bool,  // default false
  
    // cleanup 
    modalTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),  // only if modalCross is being displayed
    modalTinyCross: PropTypes.bool, // TODO - hack. Ideally, there should be a way to customize full screen cross and small modal cross.
  }

  constructor(props)
  {
    super(props)
  }
  
  componentWillMount()
  {
  }
   
  // add class to body when modal is open (to prevent scroll). can be separated out as component (http://jaketrent.com/post/update-body-class-react/)
  //
  // NOTE - this approach doesn't work if multiple modals can be opened on the page. Example product page. One true is overriden by other falses. 
  componentDidMount()
  {
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
      return null
   
    if (typeof(window) == 'undefined')
      return
   
    let closeButton = false

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
    
        closeButton = this.props.fullScreenCloseButton == false ? false : true 
    }
    else
    {
      let modalHeight = this.props.height || '50%'
      let modalWidth = this.props.width || '50%'

      let heightAdj = (100 - modalHeight.split('%')[0])/2 + '%' 
      let widthAdj = (100 - modalWidth.split('%')[0])/2 + '%' 

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
      
      closeButton = this.props.nonFullScreenCloseButton == true ? true : false
    }
    
    /* BACKDROP STYLES */
    /* default backdrop styles */
    let backdrop_style =
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
    if (this.props.backdrop_style) {
      for (let key in this.props.backdrop_style) {
        backdrop_style[key] = this.props.backdrop_style[key]
      }
    }
   
    // TODO:closeButton logic is mucked up. Cleanup closebutton/title logic for both fullscrn and non full screen 
    const markup =
    (
      <div className={this.props.modalContainerClass}>
        <div className={this.props.modalClass || "modal-container"} style={modalStyle}>
          {
            closeButton == true ? (     
              <div style={{marginBottom: '4em'}}>
                {
                  this.props.modalTitle ? (
                   <div className="modal-title">
                    {this.props.modalTitle}
                   </div>
                  ):null
                }
                <div onClick={()=>this.handleCloseClick()} className={this.props.modalTinyCross == true ? "modal-cross-small" : "modal-cross-full"}>
                  <SvgIcon name="close" size={1.3} style={{stroke:'#333'}} />
                </div>
              </div>
            ):null
          }
          {this.props.children} 
        </div>
        {
          !this.props.no_backdrop && 
          <div className={this.props.backdrop_class} style={backdrop_style} onClick={(e) => this.closePreventDefault(e)}>
          </div>
        }
      </div>
    )
    return markup
  }
  
  closePreventDefault(e)
  {
    e.preventDefault()
    invokeCloseModal()
  }

  close()
  {
    if(this.props.on_close) 
      this.props.on_close()
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
