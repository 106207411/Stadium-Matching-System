import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import './SportType.scss'

// 應設計成 toggle sportType 再 append 到 registerInfo 即可
// 節省後續處理成本 (未知後端不處理 === 0 的 rating)
const SportType = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [registerInfo, setRegisterInfo] = useState(
    JSON.parse(localStorage.getItem('registerInfo'))
  )

  const toggleSport = (sport) => {
    setRegisterInfo(prevState => ({...prevState, [sport]: !prevState[sport]}))
    console.log(registerInfo)
  }

  const handleClickNextStep = () => {
    // Should have a check for zero-toggling here.

    localStorage.setItem('registerInfo', JSON.stringify(registerInfo))
    navigate('/register/rating')
  }

  const handleClickRegister = () => {
    console.log(registerInfo)
    register(registerInfo)
  }

  return (
    <>
      <div className="main-container">
        <div className="title">你從事哪些運動？</div>
        <div className="div-3">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/15af0c2c-a848-4059-9ccc-c658af5aebe5?apiKey=1e7555367a3941fab0e34c3b046882ea&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/15af0c2c-a848-4059-9ccc-c658af5aebe5?apiKey=1e7555367a3941fab0e34c3b046882ea&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/15af0c2c-a848-4059-9ccc-c658af5aebe5?apiKey=1e7555367a3941fab0e34c3b046882ea&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/15af0c2c-a848-4059-9ccc-c658af5aebe5?apiKey=1e7555367a3941fab0e34c3b046882ea&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/15af0c2c-a848-4059-9ccc-c658af5aebe5?apiKey=1e7555367a3941fab0e34c3b046882ea&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/15af0c2c-a848-4059-9ccc-c658af5aebe5?apiKey=1e7555367a3941fab0e34c3b046882ea&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/15af0c2c-a848-4059-9ccc-c658af5aebe5?apiKey=1e7555367a3941fab0e34c3b046882ea&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/15af0c2c-a848-4059-9ccc-c658af5aebe5?apiKey=1e7555367a3941fab0e34c3b046882ea&"
            className={registerInfo.baseball ? 'img clicked' : 'img'}
            onClick={() => toggleSport('baseball')}
          />
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/bceb9bfa-0f66-433e-9821-4e521f22018f?apiKey=1e7555367a3941fab0e34c3b046882ea&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bceb9bfa-0f66-433e-9821-4e521f22018f?apiKey=1e7555367a3941fab0e34c3b046882ea&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bceb9bfa-0f66-433e-9821-4e521f22018f?apiKey=1e7555367a3941fab0e34c3b046882ea&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bceb9bfa-0f66-433e-9821-4e521f22018f?apiKey=1e7555367a3941fab0e34c3b046882ea&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bceb9bfa-0f66-433e-9821-4e521f22018f?apiKey=1e7555367a3941fab0e34c3b046882ea&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bceb9bfa-0f66-433e-9821-4e521f22018f?apiKey=1e7555367a3941fab0e34c3b046882ea&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bceb9bfa-0f66-433e-9821-4e521f22018f?apiKey=1e7555367a3941fab0e34c3b046882ea&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/bceb9bfa-0f66-433e-9821-4e521f22018f?apiKey=1e7555367a3941fab0e34c3b046882ea&"
            className={registerInfo.tableTennis ? 'img-2 clicked' : 'img-2'}
            onClick={() => toggleSport('tableTennis')}
          />
        </div>
        <div className="div-4">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c25c0765-52f9-4787-8661-b04ab5801695?apiKey=1e7555367a3941fab0e34c3b046882ea&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c25c0765-52f9-4787-8661-b04ab5801695?apiKey=1e7555367a3941fab0e34c3b046882ea&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c25c0765-52f9-4787-8661-b04ab5801695?apiKey=1e7555367a3941fab0e34c3b046882ea&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c25c0765-52f9-4787-8661-b04ab5801695?apiKey=1e7555367a3941fab0e34c3b046882ea&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c25c0765-52f9-4787-8661-b04ab5801695?apiKey=1e7555367a3941fab0e34c3b046882ea&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c25c0765-52f9-4787-8661-b04ab5801695?apiKey=1e7555367a3941fab0e34c3b046882ea&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c25c0765-52f9-4787-8661-b04ab5801695?apiKey=1e7555367a3941fab0e34c3b046882ea&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c25c0765-52f9-4787-8661-b04ab5801695?apiKey=1e7555367a3941fab0e34c3b046882ea&"
            className={registerInfo.basketball ? 'img-3 clicked' : 'img-3'}
            onClick={() => toggleSport('basketball')}
          />
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/571b054d-c186-4394-8506-b81009f2c201?apiKey=1e7555367a3941fab0e34c3b046882ea&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/571b054d-c186-4394-8506-b81009f2c201?apiKey=1e7555367a3941fab0e34c3b046882ea&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/571b054d-c186-4394-8506-b81009f2c201?apiKey=1e7555367a3941fab0e34c3b046882ea&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/571b054d-c186-4394-8506-b81009f2c201?apiKey=1e7555367a3941fab0e34c3b046882ea&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/571b054d-c186-4394-8506-b81009f2c201?apiKey=1e7555367a3941fab0e34c3b046882ea&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/571b054d-c186-4394-8506-b81009f2c201?apiKey=1e7555367a3941fab0e34c3b046882ea&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/571b054d-c186-4394-8506-b81009f2c201?apiKey=1e7555367a3941fab0e34c3b046882ea&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/571b054d-c186-4394-8506-b81009f2c201?apiKey=1e7555367a3941fab0e34c3b046882ea&"
            className={registerInfo.badminton ? 'img-4 clicked' : 'img-4'}
            onClick={() => toggleSport('badminton')}
          />
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/4de3673c-e899-47eb-913d-668f44ebbc57?apiKey=1e7555367a3941fab0e34c3b046882ea&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4de3673c-e899-47eb-913d-668f44ebbc57?apiKey=1e7555367a3941fab0e34c3b046882ea&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4de3673c-e899-47eb-913d-668f44ebbc57?apiKey=1e7555367a3941fab0e34c3b046882ea&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4de3673c-e899-47eb-913d-668f44ebbc57?apiKey=1e7555367a3941fab0e34c3b046882ea&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4de3673c-e899-47eb-913d-668f44ebbc57?apiKey=1e7555367a3941fab0e34c3b046882ea&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4de3673c-e899-47eb-913d-668f44ebbc57?apiKey=1e7555367a3941fab0e34c3b046882ea&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4de3673c-e899-47eb-913d-668f44ebbc57?apiKey=1e7555367a3941fab0e34c3b046882ea&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4de3673c-e899-47eb-913d-668f44ebbc57?apiKey=1e7555367a3941fab0e34c3b046882ea&"
            className={registerInfo.volleyball ? 'img-5 clicked' : 'img-5'}
            onClick={() => toggleSport('volleyball')}
          />
        </div>
        <div className="div-5">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/4e5670a4-1bf4-44bc-8faa-e99b50a9c5cd?apiKey=1e7555367a3941fab0e34c3b046882ea&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4e5670a4-1bf4-44bc-8faa-e99b50a9c5cd?apiKey=1e7555367a3941fab0e34c3b046882ea&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4e5670a4-1bf4-44bc-8faa-e99b50a9c5cd?apiKey=1e7555367a3941fab0e34c3b046882ea&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4e5670a4-1bf4-44bc-8faa-e99b50a9c5cd?apiKey=1e7555367a3941fab0e34c3b046882ea&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4e5670a4-1bf4-44bc-8faa-e99b50a9c5cd?apiKey=1e7555367a3941fab0e34c3b046882ea&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4e5670a4-1bf4-44bc-8faa-e99b50a9c5cd?apiKey=1e7555367a3941fab0e34c3b046882ea&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4e5670a4-1bf4-44bc-8faa-e99b50a9c5cd?apiKey=1e7555367a3941fab0e34c3b046882ea&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4e5670a4-1bf4-44bc-8faa-e99b50a9c5cd?apiKey=1e7555367a3941fab0e34c3b046882ea&"
            className={registerInfo.tennis ? 'img-6 clicked' : 'img-6'}
            onClick={() => toggleSport('tennis')}
          />
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/184e4733-a6ca-4273-a3ef-dcc801af1338?apiKey=1e7555367a3941fab0e34c3b046882ea&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/184e4733-a6ca-4273-a3ef-dcc801af1338?apiKey=1e7555367a3941fab0e34c3b046882ea&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/184e4733-a6ca-4273-a3ef-dcc801af1338?apiKey=1e7555367a3941fab0e34c3b046882ea&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/184e4733-a6ca-4273-a3ef-dcc801af1338?apiKey=1e7555367a3941fab0e34c3b046882ea&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/184e4733-a6ca-4273-a3ef-dcc801af1338?apiKey=1e7555367a3941fab0e34c3b046882ea&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/184e4733-a6ca-4273-a3ef-dcc801af1338?apiKey=1e7555367a3941fab0e34c3b046882ea&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/184e4733-a6ca-4273-a3ef-dcc801af1338?apiKey=1e7555367a3941fab0e34c3b046882ea&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/184e4733-a6ca-4273-a3ef-dcc801af1338?apiKey=1e7555367a3941fab0e34c3b046882ea&"
            className={registerInfo.swimming ? 'img-7 clicked' : 'img-7'}
            onClick={() => toggleSport('swimming')}
          />
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/92c8141c-be64-48c9-93cf-6ec2707dd77d?apiKey=1e7555367a3941fab0e34c3b046882ea&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/92c8141c-be64-48c9-93cf-6ec2707dd77d?apiKey=1e7555367a3941fab0e34c3b046882ea&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/92c8141c-be64-48c9-93cf-6ec2707dd77d?apiKey=1e7555367a3941fab0e34c3b046882ea&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/92c8141c-be64-48c9-93cf-6ec2707dd77d?apiKey=1e7555367a3941fab0e34c3b046882ea&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/92c8141c-be64-48c9-93cf-6ec2707dd77d?apiKey=1e7555367a3941fab0e34c3b046882ea&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/92c8141c-be64-48c9-93cf-6ec2707dd77d?apiKey=1e7555367a3941fab0e34c3b046882ea&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/92c8141c-be64-48c9-93cf-6ec2707dd77d?apiKey=1e7555367a3941fab0e34c3b046882ea&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/92c8141c-be64-48c9-93cf-6ec2707dd77d?apiKey=1e7555367a3941fab0e34c3b046882ea&"
            className={registerInfo.gym ? 'img-8 clicked' : 'img-8'}
            onClick={() => toggleSport('gym')}
          />
        </div>
        <div className="button-group">
          <div className="button" onClick={handleClickNextStep}>下一步</div>
          <div className="button" onClick={handleClickRegister}>跳過並註冊</div>
        </div>
      </div>
    </>
  )
}

export default SportType
