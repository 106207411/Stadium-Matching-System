export const getCustomMarker = (sportType) => {
  if (sportType === 'baseball') return baseballMarkerURL;
  else if (sportType === 'tabletennis') return tabletennisMarkerURL;
  else if (sportType === 'basketball') return basketballMarkerURL;
  else if (sportType === 'badminton') return badmintonMarkerURL;
  else if (sportType === 'volleyball') return volleyballMarkerURL;
  else if (sportType === 'tennis') return tennisMarkerURL;
  else if (sportType === 'swimming') return swimmingMarkerURL;
  else if (sportType === 'gym') return gymMarkerURL;
};

export const badmintonMarkerURL = '../../public/badminton.png';
export const baseballMarkerURL = '../../public/baseball.png';
export const basketballMarkerURL = '../../public/basketball.png';
export const tabletennisMarkerURL = '../../public/tabletennis.png';
export const tennisMarkerURL = '../../public/tennis.png';
export const gymMarkerURL = '../../public/gym.png';
export const swimmingMarkerURL = '../../public/swimming.png';
export const volleyballMarkerURL = '../../public/volley.png';