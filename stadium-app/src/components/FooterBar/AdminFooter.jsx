import React from 'react';
import { useNavigate, NavLink  } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import { MdVolumeUp, MdViewList } from 'react-icons/md';
import { AiFillHeart } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import './AdminFooter.scss';
import { fetchMessages } from '../../api'; 
import { useQuery } from '@tanstack/react-query';

const AdminFooter = () => {
  const navigate = useNavigate();

  // 要改成 fetch feedback
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const unreadMessagesCount = data.event.filter(msg => msg.is_read === 0).length;

  return (
    <footer className="auth-footer">
      <NavLink to="/message/list" className="auth-footer-icon" activeClassName="active">
        <MdVolumeUp className="auth-icon" />
          {unreadMessagesCount > 0 ? (
            <span className="auth-unread-count">{unreadMessagesCount}</span>
          ) : null}
      </NavLink>

      {/* <NavLink to="/activity/mylist" className="auth-footer-icon" activeClassName="active">
        <MdViewList className="auth-icon" />
      </NavLink> */}

      <NavLink to="/home" className="auth-footer-icon" activeClassName="active">
      <IoHomeSharp className="auth-home-icon" style={{ fontSize: '42px', backgroundColor: '#D9D9D9', borderRadius: '50%', padding: '10px' }} />
      </NavLink>

      {/* <NavLink to="/like/list" className="auth-footer-icon" activeClassName="active">
        <AiFillHeart className="auth-icon" />
      </NavLink> */}

      <NavLink to="/profile" className="auth-footer-icon" activeClassName="active">
        <CgProfile className="auth-icon" />
      </NavLink>
    </footer>
  )
}

export default AdminFooter;
