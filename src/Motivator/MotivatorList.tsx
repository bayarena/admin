import React, { useState, useEffect, SyntheticEvent } from 'react';
import axios from 'axios';
import styles from './Motivator.module.sass';

import { SETTINGS } from '../settings';
import type { T_motivator } from '../settings';

import MotivatorItem from '../Common/MotivatorItem';

function MotivatorList(props:any){

  const [motivatorList, setMotivatorList] = useState([]);

  const [dragItem, setDragItem] = useState(-2);
  const [belowItem, setBelowItem] = useState(-2);

  const refreshData = () => {
    axios.get(SETTINGS.REST_URL + '/motivators/?meta')
    .then((res) => {
      if(res.status === 200){
        setMotivatorList(res.data.results);
      }
    }); 
  };

  useEffect(() => {
    refreshData();
  },[]);

  useEffect(() => {
    refreshData();
  },[props.toggle]);

  const onItemDragEnd = (i:number) => {
    let motList = [...motivatorList];
    if(belowItem === -1){
      motList.splice(dragItem, 1);
      motList.splice(0, 0, motivatorList[dragItem]);
    }else if(belowItem !== dragItem && belowItem !== -2){
      if(belowItem < dragItem){
        motList.splice(dragItem, 1);
        motList.splice(belowItem + 1, 0, motivatorList[dragItem]);
      }else{
        motList.splice(belowItem + 1, 0, motivatorList[dragItem]);
        motList.splice(dragItem, 1);
      }
    }

    setMotivatorList(motList);
    setDragItem(-2);
    setBelowItem(-2);
  }

  return(
      <div className={styles.motivatorList}>
        <div
          className={styles.new}
          onClick={()=>props.setMotivatorID(-1)}>
          추가하기
        </div>
        <div
          draggable
          onDragEnter={(e:SyntheticEvent) => setBelowItem(-1)}
          onClick={(e:any)=>alert("기능 구현중")}
          className={styles.new}>
          저장하기
        </div>
        {belowItem === -1 && dragItem > 0 ? <div className={styles.emptyItem}></div> : ''}

        {motivatorList.map((d:T_motivator, i:number) => {
          return(
          <React.Fragment key={i}>
            <MotivatorItem
              {...d}
              key={i}
              onDragStart={(e:SyntheticEvent) => setDragItem(i)}
              onDragEnd={(e:SyntheticEvent) => onItemDragEnd(i)}
              onDragEnter={(e:SyntheticEvent) => setBelowItem(i)}
              onDelete={()=>props.deleteMotivatorID(d.id, d.name_kor)}
              onClick={()=>props.setMotivatorID(d.id)} />
              {dragItem >= 0 && i === belowItem && i !== dragItem && belowItem !== dragItem - 1 ? <div className={styles.emptyItem}></div> : ''}
          </React.Fragment>
          )
        })}

      </div>
  );
}

export default MotivatorList;