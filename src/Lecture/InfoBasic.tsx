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

function InputTime(props:any){

	const onClick = () => {
		let text = prompt("소요시간 (5분 단위로 입력)", props.time);
		if(text === null) return;
		let time:number = parseInt(text);
		if(isNaN(time)) return;

		time = Math.floor(time / 5) * 5;
		props.onChange(time);
	}
	return(
		<div className={styles.inputTime}>
			<span>소요시간</span>
			<div onClick={onClick}>{props.time} 분</div>
		</div>
	);
}

function Difficulty(props:any){
	return(
		<div className={styles.inputDifficulty}>
			<span>난이도</span>
			<div>
				<button 
				  className={props.difficulty === 0 ? styles.activeBtn : ''}
				  onClick={()=>props.onChange(0)}>초급</button>
				<button 
				  className={props.difficulty === 1 ? styles.activeBtn : ''}
				  onClick={()=>props.onChange(1)}>중급</button>
				<button 
				  className={props.difficulty === 2 ? styles.activeBtn : ''}
				  onClick={()=>props.onChange(2)}>상급</button>
			</div>
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
			case "description" : new_lecture.description = value; break;
			case "theme" : new_lecture.theme = value; break;
 		}

 		setLecture(new_lecture);
		props.onChange(new_lecture);
	};

	const onChangeDiff = (value:number) => {
		let new_lecture:T_lecture = {...lecture};
		new_lecture.difficulty = value;

		setLecture(new_lecture);
		props.onChange(new_lecture);
	}

	const onChangeTime = (time:number) => {
		let new_lecture:T_lecture = {...lecture};
		new_lecture.time = time;

		setLecture(new_lecture);
		props.onChange(new_lecture);
	}

	useEffect(()=>{
		setLecture(props.data);
	}, [props.data]);

	return(
		<div className={styles.root}>
			<p>기본 정보</p>
			<div className={styles.content}>
				<div>
					<InputBox
					  name="클래스명"
					  type="title"
					  placeholder="20자 내로 적어주세요"
					  maxlength={20}
					  value={lecture.title}
					  onChange={onChange} />
					<InputDateTime
					  name="날짜"
					  type="date"
					  value={lecture.date.replace('Z', '')}
					  onChange={onChange} />
					<InputTime 
					  time={lecture.time}
					  onChange={onChangeTime}
					/>

					<Spacer />

					<InputTextBox
					  name="클래스설명"
					  type="description"
					  placeholder="300자 내로 적어주세요"
					  maxlength={300}
					  value={lecture.description}
					  onChange={onChange} />
					<InputBox
					  name="테마"
					  type="theme"
					  placeholder="20자 내로 적어주세요"
					  maxlength={20}
					  value={lecture.theme}
					  onChange={onChange} />

					<Spacer />
					<Difficulty
					  difficulty={lecture.difficulty}
					  onChange={(d:number)=>onChangeDiff(d)} />
				</div>
			</div>
		</div>
	);
}

export default InfoBasic;