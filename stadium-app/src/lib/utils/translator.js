export default function translate(sportType) {
  if (sportType === 'baseball') return '棒球'
  else if (sportType === 'tableTennis' || sportType === 'tabletennis') return '桌球'
  else if (sportType === 'basketball') return '籃球'
  else if (sportType === 'badminton') return '羽球'
  else if (sportType === 'volleyball') return '排球'
  else if (sportType === 'tennis') return '網球'
  else if (sportType === 'swimming') return '游泳'
  else if (sportType === 'gym') return '健身'
}