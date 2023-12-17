export const translate = (sportType) => {
  if (sportType === 'baseball') return '棒球'
  else if (sportType === 'tabletennis') return '桌球'
  else if (sportType === 'basketball') return '籃球'
  else if (sportType === 'badminton') return '羽球'
  else if (sportType === 'volleyball') return '排球'
  else if (sportType === 'tennis') return '網球'
  else if (sportType === 'swimming') return '游泳'
  else if (sportType === 'gym') return '健身'
}

export const authTranslator = (string) => {
  if (string === 'Email does not exist') return '信箱不存在！'
  else if (string === 'Password does not match') return '密碼錯誤！'
  else if (string === 'Invalid email format') return '信箱格式錯誤！'
  else if (string === 'Email already exists') return '信箱已存在！'
  else if (string === 'Missing value') return '您還有資訊未填寫完成喔！'
}

export default { translate, authTranslator }