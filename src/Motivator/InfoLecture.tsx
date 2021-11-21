import React, { useState, useEffect } from 'react';
import styles from './InfoLecture.module.sass';

import LectureItem from '../Common/LectureItem';

import { SETTINGS } from '../settings';
import type { T_lecture } from '../settings';

function InfoLecture(props:any){

	const [lectures, setLectures] = useState([]);

	useEffect(() => {
		let new_lecs = props.data.map((d:T_lecture) => {
			d.thumbs = d.thumbs.map((url:string) => {return SETTINGS.REST_URL + url});
			return d;
		});

		setLectures(new_lecs);
	}, [props.data]);

	const onClickLecture = (d:number) => {
		// TODO: Go to lecture page...
	}

	return(
		<div className={styles.root}>
			<p>연결된 강의</p>
			<div className={styles.content}>
			{lectures.map((d:T_lecture,i:number) => {
	          return <LectureItem {...d} key={i} onClick={()=>onClickLecture(d.id)} />
	        })}
			</div>
		</div>
	);
}

export default InfoLecture;