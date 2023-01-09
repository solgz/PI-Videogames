import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { addGame, getGenres, getPlatforms, cleanDetail } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { validation } from './Validation';
import styles from "../styles/Create.module.css";

export default function Form() {

    const dispatch = useDispatch();
    const history = useHistory();
    // const genres = useSelector((state) => state.genres);
    // const platforms = useSelector((state) => state.platforms);
    const {genres, platforms} =  useSelector((state) => state);

    const [input, setInput] = useState({
        name: "",
        description: "", 
        image: "",
        released: "",
        rating: "",
        genres: [],
        platforms: []
    });

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        platforms: "",
        rating: "",
        image: ""
    });

    const handleChange = (event) => {
        setErrors(
            validation({
                ...input,
                [event.target.name]: [event.target.value]
            })
        )
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newGame = await dispatch(addGame(input))
        if(newGame.status){
            alert('Game added!')
            dispatch(cleanDetail())
            setInput({
                name: "",
                description: "", 
                image: "",
                released: "",
                rating: "",
                genres: [],
                platforms: []
            })
            history.push(`/home/${newGame.data.id}`)
        } else {
            alert("There is a game with that name already!")
        }
    }

    function handlePlatforms(event) {
        if (!input.platforms.includes(event.target.value)) { 
            setInput({
            ...input,
            platforms: [...input.platforms, event.target.value]
        })}
        
        setErrors(
            validation({
                ...input,
                [event.target.name]: [event.target.value]
            })
        )
        
    }

    function handleGenres(event) {
        if(!input.genres.includes(event.target.value)) {
            setInput({
                ...input,
                genres: [...input.genres, event.target.value]
            })
        }
    }

    function handleDeleteGenre(e) {
        e.preventDefault();
        setInput({
            ...input,
            genres: input.genres.filter((gen) => gen !== e.target.value)
        })
    }

    function handleDeletePlatforms(e) {
        setInput({
            ...input,
            platforms: input.platforms.filter((p) => p !== e.target.value)
        })
    }

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    },[dispatch])



    return(
        <div className={styles.createPage}>
            <div className={styles.createContainer}>
                <div className={styles.volverContainer}>
                    <Link to="/home" className={styles.volverLink}><button className={styles.volverButton}>🔙</button></Link>
                </div>
                <h1 className={styles.title}>ADD GAME</h1>
                <form onSubmit={(event) => handleSubmit(event)}  >
                    <div className={styles.fieldContainer}>
                        <label className={styles.labels}>Name*</label>
                        <input 
                            type='text' 
                            placeholder='Name'
                            value= {input.name}
                            name='name'
                            onChange={handleChange}
                        />                        
                    </div>
                    <div className={styles.validationErrors}>{errors.name && <p>{errors.name}</p>}</div>

                    <div className={styles.fieldContainer}>
                        <label className={styles.labels}>Description*</label>
                        <input 
                            type='text' 
                            placeholder='Description'
                            value= {input.description}
                            name='description'
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.validationErrors}>{errors.description && <p>{errors.description}</p>}</div>

                    <div className={styles.fieldContainer}>
                        <label className={styles.labels}>Image</label>
                        <input 
                            type='text' 
                            placeholder='Image URL'
                            value= {input.image}
                            name='image'
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.validationErrors}>{errors.image && <p>{errors.image}</p>}</div>

                    <div className={styles.fieldContainer}>
                        <label className={styles.labels}>Released</label>
                        <input 
                            type='date' 
                            placeholder='Released'
                            value= {input.released}
                            name='released'
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.fieldContainer}>
                        <label className={styles.labels}>Rating*</label>
                        <input 
                            type='number' 
                            placeholder='Rating'
                            value= {input.rating}
                            name='rating'
                            step="0.1"
                            min="0"
                            max="5"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.validationErrors}>{errors.rating && <p>{errors.rating}</p>}</div>

                    <div className={styles.fieldContainer}>
                            <label className={styles.labels}>Genres</label>
                            <select onChange={(event) => handleGenres(event)}>
                                <option value="" hidden>Select genres</option>
                                { genres.map((genre) => {
                                    return(
                                        <option
                                        key={genre.id}
                                        >{genre.name}</option>
                                    )
                                    })}
                            </select> 

                            <div className={styles.selectedGandPContainer}>
                            {input.genres.map((gen) => {
                                return(
                                    <div className={styles.selectedGandP}>
                                    <button 
                                        key={gen + "button"} 
                                        value={gen} 
                                        onClick={handleDeleteGenre}
                                        className={styles.selectedGandPButtons}
                                        >{gen} x</button>
                                    </div>
                                    )
                                })}
                            </div>

                            <label className={styles.labels}>Platforms*</label>
                            <select name="platforms" onChange={(event) => handlePlatforms(event)}>
                                <option value="" hidden>Select platforms</option>
                                { platforms.map((plat) => {
                                    return(
                                        <option
                                        key={plat}
                                        >{plat}</option>
                                    )
                                    })}
                            </select> 

                            <div className={styles.selectedGandPContainer}>
                            {input.platforms.map((plat) => {
                                return(
                                    <div className={styles.selectedGandP}>
                                    <button 
                                        key={plat + "button"} 
                                        value={plat} 
                                        onClick={handleDeletePlatforms}
                                        className={styles.selectedGandPButtons}
                                        >{plat} x</button>
                                    </div>
                                    )
                                })}
                            </div>
                    </div>
                    <div className={styles.validationErrors}>{errors.platforms && <p>{errors.platforms}</p>}</div>

                    <h4 className={styles.labels}>*Required Field</h4>
                    <div className={styles.addButtonContainer}>
                        <button 
                        type="submit" 
                        id='submitButton' 
                        disabled={errors.name || errors.description || errors.platforms|| errors.image || errors.rating || !input.name || !input.description || !input.platforms}
                        className={styles.addButton} 
                        >Add</button>
                    </div>

                </form>
            </div>
        </div>
    )
} 