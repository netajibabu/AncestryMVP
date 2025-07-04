// Sample family tree data structure for horizontal layout
const familyTree = {
    me: {
      id: 1,
      name: 'Me',
      generation: 0,
      position: 'center'
    },
    parents: {
      father: {
        id: 2,
        name: 'Father',
        generation: 1,
        position: 'left',
        siblings: [
          { id: 6, name: 'Uncle John' },
          { id: 7, name: 'Aunt Mary' }
        ]
      },
      mother: {
        id: 3,
        name: 'Mother',
        generation: 1,
        position: 'right',
        siblings: [
          { id: 8, name: 'Uncle Bob' },
          { id: 9, name: 'Aunt Sarah' }
        ]
      }
    },
    grandparents: {
      paternal: {
        grandfather: {
          id: 4,
          name: 'Paternal Grandfather',
          generation: 2,
          position: 'left'
        },
        grandmother: {
          id: 5,
          name: 'Paternal Grandmother',
          generation: 2,
          position: 'left'
        }
      },
      maternal: {
        grandfather: {
          id: 10,
          name: 'Maternal Grandfather',
          generation: 2,
          position: 'right'
        },
        grandmother: {
          id: 11,
          name: 'Maternal Grandmother',
          generation: 2,
          position: 'right'
        }
      }
    }
  };
  
  import React from 'react';
  
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif'
  };
  
  const generationStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    width: '100%'
  };
  
  const memberBoxStyles = {
  padding: '1rem',
  borderRadius: '8px',
  background: '#fff',
  border: '2px solid #007bff',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  textAlign: 'center',
  minWidth: '120px',
  position: 'relative',
  color: '#000',
};

const parentBoxStyles = {
  padding: '1rem',
  borderRadius: '8px',
  background: '#e3f2fd',
  border: '2px solid #2196f3',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  textAlign: 'center',
  minWidth: '120px',
  position: 'relative',
  color: '#000',
  fontWeight: 'bold',
};

const siblingGroupBoxStyles = {
  padding: '1rem',
  borderRadius: '8px',
  background: '#f5f5f5',
  border: '2px solid #ccc',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  marginBottom: '1rem',
};
  
  const connectionLineStyles = {
    position: 'absolute',
    background: '#007bff',
    width: '2px',
    height: '20px',
    bottom: '-20px',
    left: '50%',
    transform: 'translateX(-50%)'
  };
  
  const ShowFamily = () => (
    <div style={containerStyles}>
      <h1>Family Tree</h1>
      
      {/* Grandparents Generation */}
      <div style={generationStyles}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={memberBoxStyles}>
            <div>Paternal Grandfather</div>
          </div>
          <div style={memberBoxStyles}>
            <div>Paternal Grandmother</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={memberBoxStyles}>
            <div>Maternal Grandfather</div>
          </div>
          <div style={memberBoxStyles}>
            <div>Maternal Grandmother</div>
          </div>
        </div>
      </div>
  
          {/* Parents Generation with Siblings */}
    <div style={generationStyles}>
      {/* Father's side with siblings */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={siblingGroupBoxStyles}>
          <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>Father's Siblings</div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={memberBoxStyles}>
              <div>Uncle John</div>
            </div>
            <div style={memberBoxStyles}>
              <div>Aunt Mary</div>
            </div>
          </div>
        </div>
        <div style={parentBoxStyles}>
          <div>Father</div>
          <div style={connectionLineStyles}></div>
        </div>
      </div>
      
      {/* Mother's side with siblings */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={siblingGroupBoxStyles}>
          <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>Mother's Siblings</div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={memberBoxStyles}>
              <div>Uncle Bob</div>
            </div>
            <div style={memberBoxStyles}>
              <div>Aunt Sarah</div>
            </div>
          </div>
        </div>
        <div style={parentBoxStyles}>
          <div>Mother</div>
          <div style={connectionLineStyles}></div>
        </div>
      </div>
    </div>
  
      {/* Me Generation */}
      <div style={generationStyles}>
        <div style={{...memberBoxStyles, background: '#e3f2fd', borderColor: '#2196f3'}}>
          <div><strong>Me</strong></div>
        </div>
      </div>
    </div>
  );
  
  export default ShowFamily;