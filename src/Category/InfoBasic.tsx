import React, { useState, useEffect } from 'react';
import styles from './InfoBasic.module.sass'

import type { T_category } from '../settings';

interface I_basicInfo{
	data: T_category,
	onChange: (v:T_category)=>void,
}

function InputBox(props:any){

	const onChange = (s:string) => {
		if(s.length > props.maxlength){
			props.onChange(props.type, s.substr(0, props.maxlength));
		}else{
			props.onChange(props.type, s);
		}
	}

	return(
		<div className={styles.inputBox}>
			<span>{props.name}</span>
			<input
			  type="text"
			  value={props.value}
			  onChange={(e)=>onChange(e.target.value)}
			  placeholder={props.placeholder}
			/>
		</div>
	);
}

function InfoBasic(props:I_basicInfo){

	const [category, setCategory] = useState(props.data);

	const onChange = (type:string, value:string) => {
		let new_category:T_category = {...category};
		switch(type){
			case "title" : new_category.title = value; break;
 		}

 		setCategory(new_category);
		props.onChange(new_category);
	};

	useEffect(()=>{
		setCategory(props.data);
	}, [props.data]);

	return(
		<div className={styles.root}>
			<p>기본 정보</p>
			<div className={styles.content}>
				<div>
					<InputBox
					  name="카테고리명"
					  type="title"
					  placeholder="20자 내로 적어주세요"
					  maxlength={20}
					  value={category.title}
					  onChange={onChange} />
				</div>
			</div>
		</div>
	);
}

export default InfoBasic;