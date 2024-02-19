const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    setTimeout(() => {message = null}, 5000);
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  
  export default Notification