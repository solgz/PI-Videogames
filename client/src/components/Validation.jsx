
export function validation(input){
    let errors = {};
    
    if(!input.name) errors.name = "Name is required!"
    if(!input.description) errors.description = "Description is required!"
    if(!input.platforms.length) errors.platforms = "Platforms are required!"
    

    //ademas, el rating deberia ser un num entre 0 y 5
    //podria validar q el input de imagen sea un url

    return errors;
}