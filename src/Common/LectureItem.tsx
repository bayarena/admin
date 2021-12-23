import React from 'react';
import styles from './LectureItem.module.sass'

import type { T_meta_motivator } from '../settings';

function LectureItem(props:any){

  const datePrettyString = (date:string) => {
    date = date.replace('Z', '');
    let date_split = date.split('T');
    let time_split = date_split[1].split(':');

    let time_hour = Number(time_split[0]);

    if(time_hour > 21){
      time_split[0] = "PM " + (time_hour - 12);
    }else if(time_hour > 12){
      time_split[0] = "PM 0" + (time_hour - 12);
    }else if(time_hour > 11){
      time_split[0] = "PM 12";
    }else{
      time_split[0] = "AM " + time_split[0];
    }

    let new_time_str = time_split[0] + ':' + time_split[1];

    return date_split[0] + ' ' + new_time_str;
  };

  const getSubString = () => {
    let diff = "";
    switch(props.difficulty){
      case 0 : diff = "초급"; break;
      case 1 : diff = "중급"; break;
      case 2 : diff = "상급"; break;
      default : diff = "초급"; break;
    }

    return diff + " | " + props.time +"min | " + props.theme;
  };

  return(
    <div className={styles.lectureItem} onClick={()=>props.onClick ? props.onClick() : ''}>
      <p>{datePrettyString(props.date)}</p>
      <p className={styles.lectureTitle}>{props.title} <span>{getSubString()}</span><span>{props.tag}</span></p>
      <div className={styles.lectureThumb}>
        {props.meta_motivator ? props.meta_motivator.map((d:T_meta_motivator, i:number) => {
          return <img src={d.image_thumb} alt="" key={i} />
        }) : ''}
      </div>
    </div>    
  );
}

export default LectureItem;