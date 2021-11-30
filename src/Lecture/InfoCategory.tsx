import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './InfoCategory.module.sass';

import { SETTINGS } from '../settings';

function InfoCategory(props:any) {

  const [categoryList, setCategoryList] = useState([]);

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

  const onChange = (e:any) => {
  	props.onChange(e.target.value);
  };

	return(
		<div className={styles.root}>
			<p>카테고리 설정</p>
			<select value={props.value === null ? 0 : props.value} onChange={onChange}>
				<option value={0}>미분류</option>
			{categoryList.map((d:any, i:number) => {
				return <option key={i} value={d.id}>{d.title}</option>
			})}
			</select>
		</div>
	);
}

export default InfoCategory;