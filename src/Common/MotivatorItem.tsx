import React, { useState, SyntheticEvent } from 'react';
import styles from './MotivatorItem.module.sass';

function MotivatorItem(props:any){

  const [hover, setHover] = useState(false);

  const onDragStart = (e:SyntheticEvent) => {
    if(props.onDragStart) props.onDragStart(e);
  }

  const onDragEnd = (e:SyntheticEvent) => {
    if(props.onDragEnd) props.onDragEnd(e);
  }

  const onDragEnter = (e:SyntheticEvent) => {
    if(props.onDragEnter) props.onDragEnter(e);
  }

  return(
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onMouseOver={(e:any) => setHover(true)}
      onMouseLeave={(e:any) => setHover(false)}
      className={styles.motivatorItem}
      onClick={()=>props.onClick ? props.onClick() : ''}>
      <div style={{
        background: "url(" + props.image_thumb + ")"
      }}>
      </div>
      <div>
        <p>{props.name_kor}</p>
        <p>{props.expertise}</p>
      </div>
      {props.onDelete && hover ? <div onClick={()=>props.onDelete()}>
        삭제
      </div> : ''}
    </div>
  );
}

export default MotivatorItem;