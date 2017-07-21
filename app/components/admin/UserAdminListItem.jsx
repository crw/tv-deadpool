import React from 'react';
import moment from 'moment';


export const UserAdminListItem = props => {

  const { created_at, displayName, fakeDisplayName, id } = props;

  return (
    <div className="user-item">

      <span className="display-name">
        { displayName ?
          <strong>{ displayName }</strong> :
          <em>{ fakeDisplayName }</em>
        }
      </span>
      <span className="user-id">
        <tt>({ id })</tt>
      </span>
    </div>
  );
}

export default UserAdminListItem;