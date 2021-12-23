import React from 'react';
import styles from './InfoLecture.module.sass';

import LectureItem from '../Common/LectureItem';

import type { T_lecture } from '../settings';

function InfoLecture(props:any){

	return(
		<div className={styles.root}>
			<p>연결된 강의</p>
			<div className={styles.content}>
			{props.data.map((d:T_lecture,i:number) => {
	          return <LectureItem {...d} key={i} />
	        })}
			</div>
		</div>
	);
}

export default InfoLecture;