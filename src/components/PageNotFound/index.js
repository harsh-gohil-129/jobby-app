import './index.css'

const PageNotFound = () => (
  <div className="pageNotFound-container">
    <img
      className="pageNotFound-img"
      alt="not found"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
    />
    <h1 className="pageNotFound-heading">Page Not Found</h1>
    <p className="pageNotFound-details">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default PageNotFound
