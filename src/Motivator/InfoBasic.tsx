import React, { useState, useEffect } from 'react';
import styles from './InfoBasic.module.sass'

import type { T_motivator } from '../settings';

interface I_basicInfo{
	data: T_motivator,
	onChange: (v:T_motivator)=>void,
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

function InfoBasic(props:I_basicInfo){

	const [motivator, setMotivator] = useState(props.data);

	const onChange = (type:string, value:string) => {
		let new_motivator:T_motivator = {...motivator};
		switch(type){
			case "name_kor" : new_motivator.name_kor = value; break;
			case "name_eng" : new_motivator.name_eng = value; break;
			case "description" : new_motivator.description = value; break;
			case "expertise" : new_motivator.expertise = value; break;
 		}

 		setMotivator(new_motivator);
		props.onChange(new_motivator);
	};

	useEffect(()=>{
		setMotivator(props.data);
	}, [props.data]);

	return(
		<div className={styles.root}>
			<p>기본 정보</p>
			<div className={styles.content}>
				<div>
					<InputBox 
					  name="이름 (한글)"
					  type="name_kor"
					  placeholder="30자 내로 적어주세요"
					  maxlength={30}
					  value={motivator.name_kor}
					  onChange={onChange} />
					<InputBox 
					  name="이름 (영문)"
					  type="name_eng"
					  placeholder="30자 내로 적어주세요"
					  maxlength={30}
					  value={motivator.name_eng}
					  onChange={onChange} />
					<InputTextBox
					  name="강사 설명"
					  type="description"
					  placeholder="300자 내로 적어주세요"
					  maxlength={300}
					  value={motivator.description}
					  onChange={onChange}/>
					<InputBox 
					  name="전문성"
					  type="expertise"
					  placeholder="30자 내로 적어주세요"
					  maxlength={30}
					  value={motivator.expertise}
					  onChange={onChange} />
				</div>
			</div>
		</div>
	);
}

export default InfoBasic;