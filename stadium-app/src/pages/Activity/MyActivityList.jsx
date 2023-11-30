import React from 'react';
import ActivityInfo from './ActivityInfo';
import mockMyActivities from '../../mockData/mockMyActivities.js';

const ActivitiesList = () => {
  return (
    <div>
    <Header title="我的清單" />
    <div>
      {mockMyActivities.map((activity) => (
        <ActivityInfo key={activity.id} activity={activity} />
      ))}
    </div>
          <FooterBar />
          </div>
  );
};

export default ActivitiesList;
