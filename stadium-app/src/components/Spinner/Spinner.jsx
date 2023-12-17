import BeatLoader from "react-spinners/BeatLoader";
import "./Spinner.scss"

const Spinner = () => {
  return (
    <div className="auth-spinner">
      <BeatLoader
        color="#000000"
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Spinner;
