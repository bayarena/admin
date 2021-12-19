import React, { SyntheticEvent } from 'react';
import styles from './MotivatorItem.module.sass';

function MotivatorItem(props:any){

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
      className={styles.motivatorItem}
      onClick={()=>props.onClick ? props.onClick() : ''}>
      <div style={{
        background: "url(" + props.image_thumb + ")"
      }}>
      </div>
      <div>
        <p>{props.name_kor} <span>{props.name_eng}</span></p>
      </div>
    </div>
  );
}

export default MotivatorItem;