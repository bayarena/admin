import React, { useState, useRef, useEffect } from 'react';
import styles from './InfoImage.module.sass';

interface I_ImageInfo{
	src: string | File,
	onChange: (file:File)=>void,
}

function ImageSelector(props:any){

	const [ImgSrc, setImgSrc] = useState(props.src);
  const imageInput = useRef<HTMLInputElement>(null);

  useEffect(()=>{
  	setImgSrc(props.src);
  }, [props.src]);

	const onClick = () => {
		if(imageInput.current != null){
			imageInput.current.click();
		}
	};

	const onChange = (e:any) => {
		if(e.target.files[0]){
			console.log(e.target.files[0]);
			props.onChange(e.target.files[0]);

			var reader = new FileReader();
			reader.onload = (e:any)=>{
				setImgSrc(e.target.result);
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	};

  return(
    <div onClick={()=>onClick()} className={styles.ImageSelector}>
    	<img src={ImgSrc} alt="" />
      <p>{props.alt}</p>
      <input
        style={{display: "none"}}
        type="file"
        accept="image/png, image/jpeg"
        ref={imageInput}
        onChange={onChange} />
    </div>
  );
}

function InfoImage(props:I_ImageInfo){
	return(
		<div className={styles.root}>
			<p>카테고리 이미지</p>
			<div className={styles.content}>
	          <ImageSelector
	            onChange={props.onChange}
	            width={520}
	            height={200}
	            src={props.src}
	            alt="520 x 200px 카테고리 썸네일 이미지" />
			</div>
		</div>
	);
}

export default InfoImage;