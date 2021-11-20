import React from 'react';
import styles from './InfoLecture.module.sass';

import LectureItem from '../Common/LectureItem';

function InfoLecture(){
	return(
		<div className={styles.root}>
			<p>연결된 강의</p>
			<div className={styles.content}>
				<LectureItem />
				<LectureItem />
				<LectureItem />
				<LectureItem />
				<LectureItem />
			</div>
		</div>
	);
}

export default InfoLecture;