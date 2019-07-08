import React from 'react';

const AddBtn = () => {
  return (
    <div className='fixed-action-btn'>
      <a
        href='#add-log-modal'
        className='btn-floating btn-large blue darken-2 modal-trigger'
      >
        <i className='large material-icons'>add</i>
      </a>
      <ul>
        <li className='btn-floating green modal-trigger'>
          <a href='#tech-list-modal'>
            <i className='material-icons'>person</i>
          </a>
        </li>
        <li className='btn-floating red modal-trigger'>
          <a href='#tech-modal'>
            <i className='material-icons'>person_add</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AddBtn;
