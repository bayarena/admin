import React, { useState, useEffect, SyntheticEvent } from 'react';
import axios from 'axios';
import styles from './Motivator.module.sass';

import { SETTINGS } from '../settings';
import type { T_motivator } from '../settings';

import InfoBasic from './InfoBasic';
import InfoImage from './InfoImage';
import InfoLecture from './InfoLecture';

import MotivatorItem from '../Common/MotivatorItem';

const emptyData:T_motivator = {
  name_kor: "",
  name_eng: "",
  description: "",
  expertise: "",
  id: 0,
  image: "",
  image_thumb: "",
  lectures: [],
};

function Motivator() {

  const [motivatorList, setMotivatorList] = useState([]);
  const [motivator, setMotivator] = useState(emptyData);
  
  const [dragItem, setDragItem] = useState(-2);
  const [belowItem, setBelowItem] = useState(-2);

  const refreshData = () => {

    axios.get(SETTINGS.REST_URL + '/motivators/')
    .then((res) => {
      if(res.status === 200){
        setMotivatorList(res.data.results);
      }
    }); 
 
  };

  useEffect(() => {

    refreshData();

  },[]);

  const onClickMotivator = (n:number) => {
    axios.get(SETTINGS.REST_URL + '/motivators/' + n)
      .then((res) => {
        if(res.status === 200){
          setMotivator(res.data);
        }
      });
  };

  const onBasicInfoChange = (new_mot:T_motivator) => {
    let mot = {...motivator};
    mot.name_kor = new_mot.name_kor;
    mot.name_eng = new_mot.name_eng;
    mot.description = new_mot.description;
    mot.expertise = new_mot.expertise;
    setMotivator(mot);
  };

  const onImageInfoChange = (file:File) => {
    let mot = {...motivator};
    mot.image = file;
    setMotivator(mot);
  };

  const onSaveMotivator = () => {
    let form = new FormData();
    form.append('name_eng', motivator.name_eng);
    form.append('name_kor', motivator.name_kor);
    form.append('description', motivator.description);
    form.append('expertise', motivator.expertise);

    if(motivator.image instanceof File){
      form.append('image', motivator.image);
    }

    if(motivator.id === 0){ // Create new instance

      axios.post(SETTINGS.REST_URL + "/motivators/", form)
        .then((res) => {
          console.log(res);
          if(res.status === 201){
            alert("저장 성공");
            onClickMotivator(res.data.id);
          }

          refreshData();
      });

    }else{ // Modify exist instance

      axios.put(SETTINGS.REST_URL + "/motivators/" + motivator.id + "/", form)
      .then((res) => {
        if(res.status === 200) alert("저장 성공");
        refreshData();
      });

    }
  };

  const onDeleteMotivator = () => {
    if(window.confirm("정말로 삭제하시겠습니까?")){
      axios.delete(SETTINGS.REST_URL + "/motivators/" + motivator.id + "/")
        .then((res) => {
          setMotivator(emptyData);
          refreshData();
        });
    }
  };

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

  return (
    <div className={styles.root}>

      <div className={styles.motivatorList}>
        <div
          className={styles.new}
          onClick={()=>setMotivator(emptyData)}>
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
          <React.Fragment>
            <MotivatorItem
              {...d}
              key={i}
              onDragStart={(e:SyntheticEvent) => setDragItem(i)}
              onDragEnd={(e:SyntheticEvent) => onItemDragEnd(i)}
              onDragEnter={(e:SyntheticEvent) => setBelowItem(i)}
              onClick={()=>onClickMotivator(d.id)} />
              {dragItem >= 0 && i === belowItem && i !== dragItem && belowItem !== dragItem - 1 ? <div className={styles.emptyItem}></div> : ''}
          </React.Fragment>
          )
        })}

      </div>

      <div className={styles.content}>
        <InfoImage src={motivator.image} onChange={onImageInfoChange} />
        <InfoBasic data={motivator} onChange={onBasicInfoChange} />
        <InfoLecture data={motivator.lectures} />
        <div className={styles.saveBox} onClick={()=>onSaveMotivator()}>
          <p>저장하기</p>
        </div>
        <div className={styles.deleteBox} onClick={()=>onDeleteMotivator()}>
          <p>삭제하기</p>
        </div>
      </div>

    </div>
  );
}

export default Motivator;
