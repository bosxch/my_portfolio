import * as React from "react";
import { Img } from '../Projects/ProjectsStyles';
import styles from './ProjectCard.module.css'

export const ProjectCard = (props) => {
    const {
        imgs,
        handleClose
    } = props
    const [actualImg, setActualImage] = React.useState(0);
    const cant = imgs?.length;

    const next = () => {
        setActualImage(actualImg === cant - 1 ? 
            0 : actualImg+1 )
    }

    const prev = () => {
        setActualImage(actualImg === 0 ? 
            cant - 1 : actualImg-1 )
    }

    return (
        <div className={styles.container}> 
            <div className={styles.body}>
            <h3 className={styles.fle} onClick={prev}>←</h3>
                {imgs.map((img, idx) => {
                return (
                <> 
                        {actualImg === idx && (
                         <img className={styles.pop_Img} key={idx} src={img} alt='Imagen proyecto'/>
                         )}
                </>
                  )
                })}
                <h3 className={styles.fle} onClick={next}>→</h3>
            </div>
        </div>
    )
}