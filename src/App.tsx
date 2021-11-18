import React, { useState } from 'react';
import styles from './App.module.sass';

import Motivator from './Motivator/Motivator';
import Lecture from './Lecture/Lecture';

function App() {

  const [Page, setPage] = useState(0);

  const renderPage = (n:number) => {
    switch(n){
      case 0 : return <Motivator />
      default : return <Lecture />
    }
  }

  return (
    <div className={styles.App}>

      <div className={styles.Header}>
        <div onClick={()=>setPage(0)}>강사 정보 입력</div>
        <div onClick={()=>setPage(1)}>강의 정보 입력</div>
        <div>홈페이지 제어</div>
      </div>

      <div className={styles.Content}>
        {renderPage(Page)}
      </div>
    </div>
  );
}

export default App;
