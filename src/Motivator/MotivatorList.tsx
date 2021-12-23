import React, { useState, useEffect, SyntheticEvent } from 'react';
import axios from 'axios';
import styles from './Motivator.module.sass';

import { SETTINGS } from '../settings';
import type { T_motivator } from '../settings';

import MotivatorItem from '../Common/MotivatorItem';

function MotivatorList(props:any){

  const [motivatorList, setMotivatorList] = useState([]);
  const [changeList, setChangeList] = useState<any[]>([]);

  const [dragItem, setDragItem] = useState(-1);
  const [belowItem, setBelowItem] = useState(-1);

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
    
    motList[dragItem] = motivatorList[belowItem];
    motList[belowItem] = motivatorList[dragItem];

    let temp = motList[dragItem]['priority'];
    motList[dragItem]['priority'] = motList[belowItem]['priority'];
    motList[belowItem]['priority'] = temp;

    let chList = [...changeList].reduce((acc, curr) => {
      if(curr.id !== motList[dragItem]['id'] &&
         curr.id !== motList[belowItem]['id']){
        acc.push(curr);
      }
      return acc;
    }, []);

    chList.push({'id' : motList[dragItem]['id'], 'priority' : motList[dragItem]['priority']});
    chList.push({'id' : motList[belowItem]['id'], 'priority' : motList[belowItem]['priority']});

    setChangeList(chList);
    setMotivatorList(motList);
    setDragItem(-1);
    setBelowItem(-1);
  }

  const saveList = () => {
    setMotivatorList([]);
    changeList.forEach(elem => {
      axios.put(SETTINGS.REST_URL + '/motivators/' + elem.id + '/',{
        'priority' : elem.priority
      });
    });
    setTimeout(()=>refreshData(), 500);
  }

  return(
      <div className={styles.motivatorList}>
        <div
          className={styles.new}
          onClick={()=>props.setMotivatorID(-1)}>
          추가하기
        </div>
        <div
          onClick={(e:any)=>saveList()}
          className={styles.new}>
          저장하기
        </div>
        {motivatorList.map((d:T_motivator, i:number) => {
          return(
          <React.Fragment key={i}>
            <MotivatorItem
              {...d}
              key={i}
              highlight={i===belowItem}
              onDragStart={(e:SyntheticEvent) => setDragItem(i)}
              onDragEnd={(e:SyntheticEvent) => onItemDragEnd(i)}
              onDragEnter={(e:SyntheticEvent) => setBelowItem(i)}
              onDelete={()=>props.deleteMotivatorID(d.id, d.name_kor)}
              onClick={()=>props.setMotivatorID(d.id)} />
          </React.Fragment>
          )
        })}

      </div>
  );
}

export default MotivatorList;