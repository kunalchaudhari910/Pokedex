import './Pokemon.css'
function Pokemon( {name, image} ){
    return(
        <div className='pokemon'>
            <h3 className='pokemon-name'>{name}</h3>
            <div>
                <img className='pokemon-image' src={image} alt="image" />
            </div>
        </div>
    )
}
export default Pokemon;