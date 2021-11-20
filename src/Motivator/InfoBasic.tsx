import React, { useState, useEffect } from 'react';
import styles from './InfoBasic.module.sass'

import type { T_motivator } from './Motivator';

interface I_basicInfo{
	data: T_motivator,
	onChange: (v:T_motivator)=>void,
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

	const [motivator, setMotivator] = useState(props.data);

	const onChange = (type:string, value:string) => {
		let new_motivator:T_motivator = {...motivator};
		switch(type){
			case "name_kor" : new_motivator.name_kor = value; break;
			case "name_eng" : new_motivator.name_eng = value; break;
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
					<InputBox name="이름 (한글)" type="name_kor" value={motivator.name_kor} onChange={onChange} />
					<InputBox name="이름 (영문)" type="name_eng" value={motivator.name_eng} onChange={onChange} />
				</div>
			</div>
		</div>
	);
}

export default InfoBasic;