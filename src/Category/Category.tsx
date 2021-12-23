import React, { useState, useEffect, SyntheticEvent  } from 'react';
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

function CategoryList(props:any){

  const [categoryList, setCategoryList] = useState([]);

  const [dragItem, setDragItem] = useState(-2);
  const [belowItem, setBelowItem] = useState(-2);

  const refreshData = () => {
   axios.get(SETTINGS.REST_URL + '/category/?meta')
    .then((res) => {
      if(res.status === 200){
        setCategoryList(res.data.results);
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
    let catList = [...categoryList];
    if(belowItem === -1){
      catList.splice(dragItem, 1);
      catList.splice(0, 0, categoryList[dragItem]);
    }else if(belowItem !== dragItem && belowItem !== -2){
      if(belowItem < dragItem){
        catList.splice(dragItem, 1);
        catList.splice(belowItem + 1, 0, categoryList[dragItem]);
      }else{
        catList.splice(belowItem + 1, 0, categoryList[dragItem]);
        catList.splice(dragItem, 1);
      }
    }

    setCategoryList(catList);
    setDragItem(-2);
    setBelowItem(-2);
  }

  return(
    <div className={styles.categoryList}>
      <div
        className={styles.new}
        //onClick={()=>setCategory(emptyData)}
        onClick={()=>props.setCategoryID(-1)}>
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

      {categoryList.map((d:T_category,i:number) => {
        return (
          <React.Fragment key={i}>
            <div
              key={i}
              className={styles.listItem}
              draggable
              onDragStart={(e:SyntheticEvent) => setDragItem(i)}
              onDragEnd={(e:SyntheticEvent) => onItemDragEnd(i)}
              onDragEnter={(e:SyntheticEvent) => setBelowItem(i)}
              onClick={()=>props.setCategoryID(d.id)} >
              {d.title}
            </div>
            {dragItem >= 0 && i === belowItem && i !== dragItem && belowItem !== dragItem - 1 ? <div className={styles.emptyItem}></div> : ''}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function Category() {

  const [category, setCategory] = useState(emptyData);
  const [toggleList, setToggleList] = useState(true);

  const refreshData = (id:number) => {
    if(id === -1){
      setCategory(emptyData);
      return;
    }

    axios.get(SETTINGS.REST_URL + '/category/' + id)
      .then((res) => {
        if(res.status === 200){
          setCategory(res.data);
        }
    });   

  };

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

          setToggleList(!toggleList);
      });

    }else{ // Modify exist instance

      axios.put(SETTINGS.REST_URL + "/category/" + category.id + "/", form)
      .then((res) => {
        if(res.status === 200) alert("저장 성공");
        setToggleList(!toggleList);
      });

    }
  };

  const onDeleteCategory = () => {
    let text = prompt("삭제하려면 카테고리의 이름을 정확하게 입력해주세요");
    if(text === category.title){
      axios.delete(SETTINGS.REST_URL + "/category/" + category.id + "/")
        .then((res) => {
          setCategory(emptyData);
          setToggleList(!toggleList);
      });
    }else{
      alert("잘못된 입력");
    }
  };

  return (
    <div className={styles.root}>

      <CategoryList
        setCategoryID={refreshData}
        toggle={toggleList} />

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
