import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { gameDetail, cleanDetail } from "../redux/actions";
import { useDispatch, useSelector} from "react-redux";
import Loading from "./Loading";
import styles from "../styles/Detail.module.css";


export default function Detail(props) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const game = useSelector((state) => state.gameDetail);

    // useEffect(() => {
    //     dispatch(gameDetail(id))
    // }, [dispatch, id])
    useEffect(() => {
        dispatch(gameDetail(id))
        return dispatch(cleanDetail())
    }, [dispatch, id])
   
    return(
        <>
            <div>
            { !game.name && <Loading/> }
            </div>
            <div className={styles.detailPage}>
                <div className={styles.detailsContainer}>
                    <div className={styles.volverContainer}>
                        <Link to='/home' className={styles.volverLink}><button className={styles.volverButton}>🔙</button></Link>
                    </div>
                    <h1 className={styles.title}>{game.name}</h1>
                    <div className={styles.rrContainer}>
                        <div className={styles.ratingContainer}>
                            <label>Rating:</label>
                            <p>{game.rating}</p>
                        </div>
                        <div className={styles.releaseContainer}>
                            <label className={styles.rating}>Released:</label>
                            <p>{game.released ? game.released : game.release}</p>
                        </div>
                    </div>
                    <div className={styles.imageContainer}>
                    {game.image 
                    ?  <img src={game.image} alt="" className={styles.gameImage}/> 
                    : <img src="https://alicepos.com/wp-content/uploads/2018/08/video_games_header_2022.jpg" alt="" className={styles.gameImage} />} 
                    </div>
                    <div className={styles.description}><p dangerouslySetInnerHTML={{ __html: game.description }}/></div>

                    <div className={styles.gAndPContainer}>
                        <div className={styles.genres}>
                            <h1 className={styles.subtitles}>Genres</h1>
                            {
                                isNaN(game.id)
                                ? game.Genres?.map((gen) => {
                                    return(
                                        <p key={gen.id}>{gen.name}</p>
                                    )
                                })
                                : game.genres?.map((gen) => {
                                    return(
                                        <p key={gen.id}>{gen.name}</p>
                                    )
                                })
                            }
                        </div>

                        <div className={styles.platforms}>
                            <h1 className={styles.subtitles}>Platforms</h1>
                            {game.platforms?.map((plat) => {
                                return(
                                    <p key={plat}>{plat}</p>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}