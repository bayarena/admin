import React, { useState, useEffect } from 'react';
import styles from './InfoBasic.module.sass'

import type { T_lecture } from '../settings';

interface I_basicInfo{
	data: T_lecture,
	onChange: (v:T_lecture)=>void,
}

function InputDateTime(props:any){
	return(
		<div className={styles.inputBox}>
			<span>{props.name}</span>
			<input
			  type="datetime-local"
			  value={props.value}
			  onChange={(e)=>props.onChange(props.type, e.target.value.replace('Z', ''))}
			/>
		</div>
	);
}

function InputBox(props:any){
	return(
		<div className={styles.inputBox}>
			<span>{props.name}</span>
			<input
			  type="text"
			  value={props.value}
			  onChange={(e)=>props.onChange(props.type, e.target.value)}
			/>
		</div>
	);
}

function InfoBasic(props:I_basicInfo){

	const [lecture, setLecture] = useState(props.data);

	const onChange = (type:string, value:string) => {
		let new_lecture:T_lecture = {...lecture};
		switch(type){
			case "title" : new_lecture.title = value; break;
			case "subtitle" : new_lecture.subtitle = value; break;
			case "date" : new_lecture.date = value; break;
 		}

 		setLecture(new_lecture);
		props.onChange(new_lecture);
	};

	useEffect(()=>{
		setLecture(props.data);
	}, [props.data]);

	return(
		<div className={styles.root}>
			<p>기본 정보</p>
			<div className={styles.content}>
				<div>
					<InputBox name="Title" type="title" value={lecture.title} onChange={onChange} />
					<InputBox name="Sub Titme" type="subtitle" value={lecture.subtitle} onChange={onChange} />
					<InputDateTime name="Date" type="date" value={lecture.date.replace('Z', '')} onChange={onChange} />
				</div>
			</div>
		</div>
	);
}

export default InfoBasic;