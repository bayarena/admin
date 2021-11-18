import React, { useState, useRef, useEffect } from 'react';
import styles from './ContentMotivatorInfo.module.sass';

function MotivatorItem(props:any){
  return(
    <div className={styles.motivatorItem} onClick={()=>props.onClick ? props.onClick() : ''}>
      <div style={{
        background: "url(" + props.image_thumb + ")"
      }}>
      </div>
      <div>
        <p>{props.name_kor} <span>{props.name_eng}</span></p>
        <p>informations...</p>
      </div>
    </div>
  );
}

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