import React from 'react';
import styles from './MotivatorItem.module.sass';

function MotivatorItem(props:any){
  return(
    <div className={styles.motivatorItem} onClick={()=>props.onClick ? props.onClick() : ''}>
      <div style={{
        background: "url(" + props.image_thumb + ")"
      }}>
      </div>
      <div>
        <p>{props.name_kor} <span>{props.name_eng}</span></p>
        <p>informations...</p>
      </div>
    </div>
  );
}

export default MotivatorItem;