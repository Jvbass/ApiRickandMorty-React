import { useState, useEffect } from "react"; 

const MiApi = () => {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);

  const [value, setValue] = useState(""); 

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    filterData();
  }, [value])

  const getData = () => {
  
    const url = "https://rickandmortyapi.com/api/character";
    fetch(url) 
      .then((res) => res.json()) 
      .then((json) => {
        setAllData(json.results); 
        setData(json.results); 
      })
      .catch((e) =>
        alert("Error de conexion con la API, intente denuevo mas tarde", e)
      ); 
  };

  const filterData = () => { 

    const buscar = value.toLowerCase();
    const filtrado = allData.filter((personaje) => {
      const name = personaje.name.toLowerCase(); 
      return name.includes(buscar); 
    });
    setData(filtrado); 
  }

  return (
    <main>
      <fieldset>
        <legend>
          <h2>Personajes Rick y Morty </h2>
        </legend>

        <div className="inputs">
          <input
            type="text"
            placeholder="Nombre de personaje"
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </fieldset>
      <h3 className="descripcion">{`${data.length} Personajes encontrados`}</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Origen</th>
            <th>Episodios</th>
          </tr>
        </thead>
        <tbody>
          {data.map((personaje) => {
            return (
              <tr key={personaje.id}>
                <td>{personaje.name}</td>
                <td>{personaje.species}</td>
                <td> {personaje.origin.name} </td>
                <td>{personaje.episode.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};

export default MiApi;
