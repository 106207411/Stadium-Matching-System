import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import "./Spinner.scss"

const Spinner = () => {
  return (
    <div className="auth-spinner">
      <ClimbingBoxLoader
        color="#000000"
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Spinner;
