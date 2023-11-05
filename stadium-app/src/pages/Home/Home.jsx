import { useAuth } from "../../context/AuthContext"
import FooterBar from "../../components/FooterBar/FooterBar"
import './Home.scss'

const Home = () => {
  const { logout } = useAuth()

  return (
    <div className="container">
      <div className="content">
        <h1>Home Page</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <FooterBar />
    </div>
  )
}

export default Home
