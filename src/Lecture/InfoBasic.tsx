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

function InputTextBox(props:any){
	return(
		<div className={styles.inputTextBox}>
			<span>{props.name}</span>
			<textarea
			  value={props.value}
			  onChange={(e)=>props.onChange(props.type, e.target.value)}
			  placeholder={props.placeholder}
			/>
		</div>
	);
}

function Spacer(){
	return(
		<div style={{height: "25px"}}>
		</div>
	);
}

function InfoBasic(props:I_basicInfo){

	const [lecture, setLecture] = useState(props.data);

	const onChange = (type:string, value:string) => {
		let new_lecture:T_lecture = {...lecture};
		switch(type){
			case "title" : new_lecture.title = value; break;
			case "date" : new_lecture.date = value; break;
			case "category" : new_lecture.category = value; break;
			case "description" : new_lecture.description = value; break;
			case "theme" : new_lecture.theme = value; break;
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
					<InputBox
					  name="Title"
					  type="title"
					  placeholder="20자 내로 적어주세요"
					  maxlength={20}
					  value={lecture.title}
					  onChange={onChange} />
					<InputDateTime
					  name="Date"
					  type="date"
					  value={lecture.date.replace('Z', '')}
					  onChange={onChange} />
					<Spacer />
					<InputBox
					  name="Category"
					  type="category"
					  placeholder="20자 내로 적어주세요"
					  maxlength={20}
					  value={lecture.category}
					  onChange={onChange} />
					<InputTextBox
					  name="Description"
					  type="description"
					  placeholder="300자 내로 적어주세요"
					  maxlength={300}
					  value={lecture.description}
					  onChange={onChange} />
					<InputBox
					  name="Theme"
					  type="theme"
					  placeholder="20자 내로 적어주세요"
					  maxlength={20}
					  value={lecture.theme}
					  onChange={onChange} />
				</div>
			</div>
		</div>
	);
}

export default InfoBasic;