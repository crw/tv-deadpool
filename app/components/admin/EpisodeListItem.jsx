import React from 'react';

export const EpisodeListItem = (props) => {

  const { id, episode, name } = props;

  return (
    <div className="list-item">
      Episode { episode }: { name } ({ id })
    </div>
  );
}