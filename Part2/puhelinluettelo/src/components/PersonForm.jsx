const PersonForm = ({ addPerson, newName, handlePersonChange, newNumber, handleNumber }) => {
    return (
        <>
            <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} 
                onChange={handlePersonChange} />
            </div>
            <div>
                number: <input value={newNumber}
                onChange={handleNumber}/> 
            </div>
            <div> <button type="submit">add</button></div>
            </form>
        </>
    )
    }

export default PersonForm