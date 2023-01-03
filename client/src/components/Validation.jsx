const regexRating = /^[0-5]$|^[0-4]\.[0-9]{1,2}$/;
const regexImage = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/;

export function validation(input){
    let errors = {};
    
    if(!input.name) errors.name = "Name is required!"
    if(!input.description) errors.description = "Description is required!"
    if(!input.platforms.length) errors.platforms = "Platforms are required!"
    if (!regexRating.test(input.rating)) errors.rating = "Rating should be a number between 0 and 5!"
    if (!regexImage.test(input.image)) errors.image = "Should be a valid URL!"

    return errors;
}