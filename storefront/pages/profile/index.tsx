import React from 'react';

type Props = {
  title?: string;
};

const Profile = ({ title = "Default Title" }: Props) => {
  return (
    <div>{title}</div>
  );
};

export default Profile;
