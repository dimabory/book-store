class Modal extends HTMLElement {
  constructor () {

    // establish prototype chain
    super()

    // attaches shadow tree and returns shadow root reference
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
    const shadow = this.attachShadow({mode: 'open'})

    // creating a container for the editable-list component
    const editableListContainer = document.createElement('div')

    // get attribute values from getters
    const title = this.title

    // adding a class to our container for the sake of clarity
    editableListContainer.id = 'modal'
    editableListContainer.classList.add('modal')

    // creating the inner HTML of the editable list element
    editableListContainer.innerHTML = `
                <style>
                           .modal {
              display: none; /* Hidden by default */
              position: fixed; /* Stay in place */
              z-index: 1; /* Sit on top */
              left: 0;
              top: 0;
              width: 100%; /* Full width */
              height: 100%; /* Full height */
              overflow: auto; /* Enable scroll if needed */
              background-color: rgb(0,0,0); /* Fallback color */
              background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
          }
          
          /* Modal Content/Box */
          .modal-content {
              background-color: #fefefe;
              margin: 15% auto; /* 15% from the top and centered */
              padding: 20px;
              border: 1px solid #888;
              width: 80%; /* Could be more or less, depending on screen size */
          }
          
          /* The Close Button */
          .close {
              color: #aaa;
              float: right;
              font-size: 28px;
              font-weight: bold;
          }
          
          .close:hover,
          .close:focus {
              color: black;
              text-decoration: none;
              cursor: pointer;
          }
                </style>

                <!-- Modal content -->
                <div class="modal-content">
                  <span class="close">&times;</span>
                  <p>Some text in the Modal..</p>
                </div>
              
            `

    // appending the container to the shadow DOM
    shadow.appendChild(editableListContainer)
  }

  connectedCallback () {
    var modal = document.getElementById('modal')
    console.log(modal)
    // modal.style.display = 'block'
// Get the <span> element that closes the modal
//     var span = document.getElementsByClassName('close')[0]

// When the user clicks on the button, open the modal
//     btn.onclick = function () {
//       modal.style.display = 'block'
//     }

// When the user clicks on <span> (x), close the modal
//     span.onclick = function () {
//       modal.style.display = 'none'
//     }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none'
      }
    }

  }

}

customElements.define('custom-modal', Modal)

export default Modal
