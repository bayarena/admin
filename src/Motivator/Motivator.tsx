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

function Motivator() {

  const [motivator, setMotivator] = useState(emptyData);
  const [toggleList, setToggleList] = useState(true);

  const refreshData = (id:number) => {
    if(id === -1){
      setMotivator(emptyData);
      return;
    }

    axios.get(SETTINGS.REST_URL + '/motivators/' + id)
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
            refreshData(res.data.id);
          }

          setToggleList(!toggleList);
      });

    }else{ // Modify exist instance

      axios.put(SETTINGS.REST_URL + "/motivators/" + motivator.id + "/", form)
      .then((res) => {
        if(res.status === 200) alert("저장 성공");
        setToggleList(!toggleList);
      });

    }
  };

  const onDeleteMotivator = (id:number, name:string) => {
    let text = prompt("삭제하려면 강사의 이름을 정확하게 입력해주세요");
    if(text === name){
      axios.delete(SETTINGS.REST_URL + "/motivators/" + id + "/")
        .then((res) => {
          setMotivator(emptyData);
          setToggleList(!toggleList);
      });
    }else{
      alert("잘못된 입력");
    }
  };

  return (
    <div className={styles.root}>

      <MotivatorList
        setMotivatorID={refreshData}
        deleteMotivatorID={onDeleteMotivator}
        toggle={toggleList} />

      <div className={styles.content}>
        <InfoImage src={motivator.image} onChange={onImageInfoChange} />
        <InfoBasic data={motivator} onChange={onBasicInfoChange} />
        <InfoLecture data={motivator.lectures} />
        <div className={styles.saveBox} onClick={()=>onSaveMotivator()}>
          <p>저장하기</p>
        </div>
        <div className={styles.deleteBox} onClick={()=>onDeleteMotivator(motivator.id, motivator.name_kor)}>
          <p>삭제하기</p>
        </div>
      </div>

    </div>
  );
}

export default Motivator;
