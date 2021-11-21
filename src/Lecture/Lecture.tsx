import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Lecture.module.sass';

import { SETTINGS } from '../settings';
import type { T_lecture } from '../settings';

import InfoImage from './InfoImage';
import InfoBasic from './InfoBasic';
import InfoMotivator from './InfoMotivator';

import LectureItem from '../Common/LectureItem';

const emptyData:T_lecture = {
  title: "Enter title",
  subtitle: "Enter sub titme",
  id: 0,
  date: "",
  motivators: [],
  thumbs: [],
  image: "",
};

function Lecture() {

  const [lectureList, setLectureList] = useState([]);
  const [lecture, setLecture] = useState(emptyData);

  const refreshData = () => {
   axios.get(SETTINGS.REST_URL + '/lectures/')
    .then((res) => {
      if(res.status === 200){
        let lectureList = res.data.results.reduce((acc:any, curr:any, idx:number)=>{
          let lec:T_lecture = curr;
          lec.thumbs = lec.thumbs.map((d:string) => {
            return SETTINGS.REST_URL + d;
          });
          acc.push(lec);
          return acc;
        }, []);

        console.log(lectureList);
        setLectureList(lectureList);
      }
    });   
  };

  useEffect(()=>{
    refreshData();
  }, []);

  const onClickLecture = (n:number) => {
    axios.get(SETTINGS.REST_URL + '/lectures/' + n)
      .then((res) => {
        if(res.status === 200){
          setLecture(res.data);
        }
      });
  };

  const onBasicInfoChange = (new_lec:T_lecture) => {
    let lec = {...lecture};
    lec.title = new_lec.title;
    lec.subtitle = new_lec.subtitle;
    lec.date = new_lec.date;
    setLecture(lec);
  };

  const onImageInfoChange = (file:File) => {
    let lec = {...lecture};
    lec.image = file;
    setLecture(lec);
  };

  const onMotivatorInfoChange = (mots:number[]) => {
    let lec = {...lecture};
    lec.motivators = mots;
    setLecture(lec);
  }

  const onSaveLecture = () => {

    let form = new FormData();
    form.append('title', lecture.title);
    form.append('subtitle', lecture.subtitle);
    form.append('date', lecture.date);

    lecture.motivators.map((d:number) => {
      form.append('motivators', d.toString());
    });

    if(lecture.image instanceof File){
      form.append('image', lecture.image);
    }

    if(lecture.id === 0){ // Create new instance

      axios.post(SETTINGS.REST_URL + "/lectures/", form)
        .then((res) => {
          console.log(res);
          if(res.status === 201){
            alert("저장 성공");
            onClickLecture(res.data.id);
          }

          refreshData();
      });

    }else{ // Modify exist instance

      axios.put(SETTINGS.REST_URL + "/lectures/" + lecture.id + "/", form)
      .then((res) => {
        if(res.status === 200) alert("저장 성공");
        refreshData();
      });

    }

  };

  const onDeleteLecture = () => {
    if(window.confirm("정말로 삭제하시겠습니까?")){
      axios.delete(SETTINGS.REST_URL + "/lectures/" + lecture.id + "/")
        .then((res) => {
          setLecture(emptyData);
          refreshData();
        });
    }
  };

  return (
    <div className={styles.root}>

      <div className={styles.lectureList}>
        <div className={styles.newClass} onClick={()=>setLecture(emptyData)}>추가하기</div>
        {lectureList.map((d:T_lecture,i:number) => {
          return <LectureItem {...d} key={i} onClick={()=>onClickLecture(d.id)} />
        })}
      </div>

      <div className={styles.content}>
        <InfoImage src={lecture.image} onChange={onImageInfoChange}/>
        <InfoBasic data={lecture} onChange={onBasicInfoChange} />
        <InfoMotivator data={lecture.motivators} onChange={onMotivatorInfoChange} />
        <div className={styles.saveBox} onClick={()=>onSaveLecture()}>
          <p>저장하기</p>
        </div>
        <div className={styles.deleteBox} onClick={()=>onDeleteLecture()}>
          <p>삭제하기</p>
        </div>
      </div>
    </div>
  );
}

export default Lecture;
export type { T_lecture };