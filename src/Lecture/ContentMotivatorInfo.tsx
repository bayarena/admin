import React, { useState, useRef, useEffect } from 'react';
import styles from './ContentMotivatorInfo.module.sass';

import MotivatorItem from '../Common/MotivatorItem';

function ContentMotivatorInfo(){
	return(
		<div className={styles.root}>
			<p>강사 정보</p>
			<div className={styles.content}>
				<div>
					<MotivatorItem />
					<MotivatorItem />
					<MotivatorItem />
					<MotivatorItem />
					<MotivatorItem />
					<MotivatorItem />
					<MotivatorItem />
					<MotivatorItem />
					<MotivatorItem />
				</div>
				<div>
					<MotivatorItem />
				</div>
			</div>
		</div>
	);
}

export default ContentMotivatorInfo;