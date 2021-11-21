import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './InfoMotivator.module.sass';

import { SETTINGS } from '../settings';
import type { T_motivator } from '../settings';

import MotivatorItem from '../Common/MotivatorItem';

function InfoMotivator(props:any){

  	const [motivatorList, setMotivatorList] = useState([]);
  	const [lectureMotivators, setLectureMotivators] = useState([]);

  	useEffect(() => {
    	axios.get(SETTINGS.REST_URL + '/motivators/')
	    .then((res) => {
	      if(res.status === 200){
	        setMotivatorList(res.data.results);
	      }
	    });
  	},[]);

  	useEffect(() => {
  		const mots = props.data.map(async (d:number) => {
  			const res = await axios.get(SETTINGS.REST_URL + '/motivators/' + d + '/');
  			if(res.status === 200) return res.data;
  			else return null;
  		});
  		
  		Promise.all(mots).then((d:any) =>{
  			setLectureMotivators(d);
  		});
  	}, [props.data]);

  	const onAddMotivator = (id:number) => {
  		let mots = [...props.data];
  		const idx = mots.indexOf(id);
  		if(idx === -1){ // New item
  			mots.push(id);
  			mots.sort();
  			props.onChange(mots);
  		}
  	};

  	const onRemoveMotivator = (id:number) => {
  		let mots = [...props.data];
  		const idx = mots.indexOf(id);
  		if(idx > -1){
  			mots.splice(idx, 1);
  			props.onChange(mots);
  		}
  	};

	return(
		<div className={styles.root}>
			<p>강사 정보</p>
			<div className={styles.content}>
				<div>
				{motivatorList.map((d:T_motivator, i:number) => {
			        return <MotivatorItem {...d} key={i} onClick={()=>onAddMotivator(d.id)} />
			    })}
				</div>
				<div>
				{lectureMotivators.map((d:T_motivator, i:number) => {
			        return <MotivatorItem {...d} key={i} onClick={()=>onRemoveMotivator(d.id)} />
			    })}
				</div>
			</div>
		</div>
	);
}

export default InfoMotivator;