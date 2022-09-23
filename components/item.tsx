import { useState } from "react"

import styles from '../styles/Home.module.css'


const Item = (props) => {
  const [state, showPopup] = useState(false);
  const handlePopup = () => {showPopup(true)}
  const closePopup = () => {showPopup(false)}
  return (
  <div>
    <div className={styles.card} onClick={handlePopup}>
      {props.data.owner}/{props.data.name}
    </div>
    <div>
      {state ? (
        <div className='popup' onClick={closePopup}>
          <div className='popup_inner'>
            <div className='record'>
              <button onClick={closePopup} className="button__popup">X</button>
              <a href={props.data.url}>📖 {props.data.owner}/{props.data.name}</a>
              <p className="p__indent">{props.data.description}</p>
              <p className="p__special p__indent">
                  Language: {props.data.language} | Followers: {props.data.followers}
              </p>
            </div>
          </div>
        </div>
      ) : null}
      </div>
  </div>
)}

export default Item;