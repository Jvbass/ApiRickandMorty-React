import { useState, useEffect } from "react"; // importamos los hooks que usaremos de la libreria de react

const MiApi = () => {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]); //definimos dos versiones de la data para poder resetear a la data original para mostrar y una data filtrada o modificada, esto para no redundar en filtro sobre filtros

  const [value, setValue] = useState(""); //guaradmos lo que ingresemos en un estado value

  useEffect(() => {
    getData(); //llamamos la data desde la api cuando el componente carge con array[]
  }, []);

  useEffect(() => {
    //cuando cambie el valor del input llamamos a la funcion filterData
    filterData();
  }, [value]);

  const getData = () => {
    //funcion declarada donde obtendremos la data de la api
    const url = "https://rickandmortyapi.com/api/character";
    fetch(url) //hacemos un fetch a la url de rickandmortyapi
      .then((res) => res.json()) //la respuesta la convertimos a formato json array de objetos
      .then((json) => {
        setAllData(json.results); //la respuesta la ingresamos a seteamos en filtrado y data
        setData(json.results); //por formato de la api llamamos a la propiedad results
      })
      .catch((e) =>
        alert("Error de conexion con la API, intente denuevo mas tarde", e)
      ); //si recibimos un error lo devolvemos por un alert
  };

  const filterData = () => {
    const buscar = value.toLowerCase(); //definimos la palabra a buscar como el valor del input convertido a minusculas
    const filtrado = allData.filter((personaje) => {
      //con metodo filter filtramos allData segun  lo ingresado en input
      const name = personaje.name.toLowerCase(); //definimos name para convertir los nombre de los peronsajes a lowercase
      return name.includes(buscar); //retornamos los names que incluyan los paramentro de buscar
    });
    setData(filtrado); // definimos la lista con la data fitrada
  };

  const sortData = (data)=> { //funcion para ordenar data segun cantidad de episodios, recibe data ya que la podremos usar cuando la data este filtrada o con toda la data
     

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
          {/* hacemos hook del input para que cuando cambie ejecutamos con useffect la funcion que filtra la data  */}
          <select >
            <option value="Human">Humano</option>
            <option value="Alien">Alien</option>
          </select>
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
