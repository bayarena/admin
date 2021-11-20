import React from 'react';
import styles from './ContentLectureInfo.module.sass';

import LectureItem from '../Common/LectureItem';

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