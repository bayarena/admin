import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Lecture.module.sass';

import { SETTINGS } from '../settings';
import type { T_lecture } from '../settings';

import { InfoImage, InfoMainImage } from './InfoImage';
import InfoBasic from './InfoBasic';
import InfoMotivator from './InfoMotivator';
import InfoCategory from './InfoCategory';

import LectureItem from '../Common/LectureItem';

const emptyData:T_lecture = {
  id: 0,

  title: "",
  date: "",
  image: "",
  main_image: "",

  category: 0,
  description: "",
  theme : "",
  tag: "",
  time : 0,
  difficulty: 0,
  staging: -1,

  motivators: [],
  meta_motivator: [],
};

function Lecture() {

  const [lectureList, setLectureList] = useState([]);
  const [lecture, setLecture] = useState(emptyData);

  const refreshData = () => {
   axios.get(SETTINGS.REST_URL + '/lectures/')
    .then((res) => {
      if(res.status === 200){
        setLectureList(res.data.results);
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
    lec.date = new_lec.date;
    lec.description = new_lec.description;
    lec.theme = new_lec.theme;
    lec.difficulty = new_lec.difficulty;
    lec.time = new_lec.time;
    lec.staging = new_lec.staging;
    setLecture(lec);
  };

  const onImageInfoChange = (file:File) => {
    let lec = {...lecture};
    lec.image = file;
    setLecture(lec);
  };

  const onMainImageInfoChange = (file:File) => {
    let lec = {...lecture};
    lec.main_image = file;
    setLecture(lec);
  };

  const onMotivatorInfoChange = (mots:number[]) => {
    let lec = {...lecture};
    lec.motivators = mots;
    setLecture(lec);
  }

  const onCategoryChange = (cat:number) => {
    let lec = {...lecture};
    lec.category = cat;
    setLecture(lec);
  };

  const onSaveLecture = () => {

    let form = new FormData();
    form.append('title', lecture.title);
    form.append('date', lecture.date);

    if(lecture.category === undefined || lecture.category === null){
      form.append('category', "");
    }else{
      if(lecture.category === 0){
        form.append('category', "");
      }else{
        form.append('category', lecture.category.toString());
      }
    }

    form.append('description', lecture.description);
    form.append('theme', lecture.theme);
    form.append('difficulty', lecture.difficulty.toString());
    form.append('time', lecture.time.toString());
    form.append('staging', lecture.staging.toString());

    lecture.motivators.map((d:number) => {
      form.append('motivators', d.toString());
    });

    if(lecture.image instanceof File){
      form.append('image', lecture.image);
    }

    if(lecture.main_image instanceof File){
      form.append('main_image', lecture.main_image);
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
        <InfoCategory value={lecture.category} onChange={onCategoryChange} />
        <InfoMotivator data={lecture.motivators} onChange={onMotivatorInfoChange} />
        <InfoMainImage src={lecture.main_image} onChange={onMainImageInfoChange}/>
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