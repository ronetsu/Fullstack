const Phonebook = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person, index) => (
        <div key={person.id || index}>
          <p>{person.name} {person.number}</p>
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Phonebook;
