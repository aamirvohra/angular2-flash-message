export const STYLES = `
  .top-right {
    position: fixed;
    top: 75px;
    right: 29px;
    z-index: 1030;
  }
  
  .alert {
    min-width: 300px;
    max-width: 350px;
    min-height: 70px;
    max-height: 100px;
  }
  
  .alert > div {
    padding: 7px;
  }
  
  .alert .close {
    position: absolute;
    right: 8px;
    top: auto;
    margin-top: 2px;
  }
  
  .alert .close:hover {
    cursor: pointer;
  }
  
  .alert-danger {
    background-color: #E57373;
  }

  .alert-warning {
    background-color: #FFCC00;
  }

  .alert-success {
    background-color: #2ecc71;
  }

  .alert-info {
    background-color: #90CAF9;
  }
`