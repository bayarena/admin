import React from 'react';
import styles from './ContentLectureInfo.module.sass';

function LectureItem(){
	return(
		<div className={styles.lectureItem}>
			<p>2021-11-18 PM 2:00</p>
			<p>Title</p>
			<p>subTitle</p>
			<p>informations...</p>
		</div>		
	);
}

function ContentLectureInfo(){
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

export default ContentLectureInfo;