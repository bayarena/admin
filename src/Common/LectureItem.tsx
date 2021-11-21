import React from 'react';
import styles from './LectureItem.module.sass'

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

  return(
    <div className={styles.lectureItem} onClick={()=>props.onClick ? props.onClick() : ''}>
      <p>{datePrettyString(props.date)}</p>
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