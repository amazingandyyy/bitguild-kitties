import React from 'react';

export function SquareLoader(props) {
  return <div className='loader-component' {...props}>
      <div className='square-spinner' style={{...props.loaderstyle}}></div>
    </div>;
}
export function DiamondLoader(props) {
  return <div className='diamond-loader'>
    <img src='../images/loading.gif'/>
  </div>;
}

export function CircleLoader(props) {
  return <div className='loader-component' {...props}>
      <div className='circle-spinner'>
        <div className='double-bounce1' style={{...props.loaderstyle}}></div>
        <div className='double-bounce2' style={{...props.loaderstyle}}></div>
      </div>
    </div>;
}