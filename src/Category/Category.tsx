import React, { useState, useEffect } from 'react';
import styles from './Category.module.sass';
import axios from 'axios';

import { SETTINGS } from '../settings';
import type { T_category } from '../settings';

import InfoImage from './InfoImage';
import InfoBasic from './InfoBasic';
import InfoLecture from './InfoLecture';

const emptyData:T_category = {
  id: 0,

  title : "",
  thumb: "",
  lectures: [],
};

function Category() {

  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState(emptyData);

  const refreshData = () => {
   axios.get(SETTINGS.REST_URL + '/category/')
    .then((res) => {
      if(res.status === 200){
        let categoryList = res.data.results.reduce((acc:any, curr:any, idx:number)=>{
          acc.push(curr);
          return acc;
        }, []);

        setCategoryList(categoryList);
      }
    });   
  };

  useEffect(()=>{
    refreshData();
  }, []);

  const onClickCategory = (n:number) => {
    axios.get(SETTINGS.REST_URL + '/category/' + n)
      .then((res) => {
        if(res.status === 200){
          console.log(res.data);
          setCategory(res.data);
        }
      });
  };

  const onImageInfoChange = (file:File) => {
    let cat = {...category};
    cat.thumb = file;
    setCategory(cat);
  };

  const onBasicInfoChange = (new_category:T_category) => {
    let cat = {...category};
    cat.title = new_category.title;
    setCategory(cat);
  };

  const onSaveCategory = () => {

    let form = new FormData();
    form.append('title', category.title);

    if(category.thumb instanceof File){
      form.append('thumb', category.thumb);
    }

    if(category.id === 0){ // Create new instance

      axios.post(SETTINGS.REST_URL + "/category/", form)
        .then((res) => {
          console.log(res);
          if(res.status === 201){
            alert("저장 성공");
            onClickCategory(res.data.id);
          }

          refreshData();
      });

    }else{ // Modify exist instance

      axios.put(SETTINGS.REST_URL + "/category/" + category.id + "/", form)
      .then((res) => {
        if(res.status === 200) alert("저장 성공");
        refreshData();
      });

    }
  };

  const onDeleteCategory = () => {
    if(window.confirm("정말로 삭제하시겠습니까?")){
      axios.delete(SETTINGS.REST_URL + "/category/" + category.id + "/")
        .then((res) => {
          setCategory(emptyData);
          refreshData();
        });
    }
  };

  return (
    <div className={styles.root}>

      <div className={styles.categoryList}>
        <div
          className={styles.listItem}
          onClick={()=>setCategory(emptyData)}>
          추가하기
        </div>
        {categoryList.map((d:T_category,i:number) => {
          return (
            <div
              key={i}
              className={styles.listItem}
              onClick={()=>onClickCategory(d.id)}>
              {d.title}
            </div>
          );
        })}
      </div>

      <div className={styles.content}>
        <InfoImage src={category.thumb} onChange={onImageInfoChange} />
        <InfoBasic data={category} onChange={onBasicInfoChange} />
        <InfoLecture data={category.lectures} />

        <div className={styles.saveBox} onClick={()=>onSaveCategory()}>
          <p>저장하기</p>
        </div>
        <div className={styles.deleteBox} onClick={()=>onDeleteCategory()}>
          <p>삭제하기</p>
        </div>
      </div>

    </div>
  );
}

export default Category;
