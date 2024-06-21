function Pokemon( {name, image} ){
    return(
        <>
            <h3>{name}</h3>
            <div><img src={image} alt="image" /></div>
        </>
    )
}
export default Pokemon;