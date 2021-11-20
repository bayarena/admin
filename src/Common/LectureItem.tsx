import React from 'react';
import styles from './LectureItem.module.sass'

function LectureItem(props:any){
  return(
    <div className={styles.lectureItem} onClick={()=>props.onClick ? props.onClick() : ''}>
      <p>{props.date}</p>
      <p className={styles.lectureTitle}>{props.title} <span>{props.subtitle}</span></p>
      <div className={styles.lectureThumb}>
        {props.thumbs ? props.thumbs.map((d:string, i:number) => {
          return <img src={d} alt="" key={i} />
        }) : ''}
      </div>
    </div>    
  );
}

export default LectureItem;