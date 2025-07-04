import React from 'react';

const treeStyles = {
  listStyleType: 'none',
  paddingLeft: '1.5em',
  marginLeft: '0.5em',
};

const memberStyles = {
  margin: '0.5em 0',
  padding: '0.6em 1em',
  borderRadius: '8px',
  background: '#fff',
  border: '1px solid #bbb',
  boxShadow: '0 2px 6px rgba(0,0,0,0.07)',
  display: 'inline-block',
  minWidth: '100px',
  color: '#000',
  fontWeight: '500',
};

function FamilyMember({ member }) {
  return (
    <li style={memberStyles}>
      {member.name}ss
      {member.children && member.children.length > 0 && (
        <>
          <div style={{ textAlign: 'center', fontSize: '1.5em', color: '#000', margin: '0.2em 0' }}>↓</div>
          <ul style={treeStyles}>
            {member.children.map(child => (
              <FamilyMember key={child.id} member={child} />
            ))}
          </ul>
        </>
      )}
    </li>
  );
}

export default FamilyMember; 