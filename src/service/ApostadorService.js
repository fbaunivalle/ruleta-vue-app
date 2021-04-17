import axios from 'axios'

export default class ApostadorService {

    //url = "http://localhost:8080/api/v1/";
    url = "https://ruleta-api.herokuapp.com/api/v1/";
    
    obtenerTodos() {
        return axios.get(this.url + "apostadores");
    }

    crear(apostador) {
        return axios.post(this.url + "crear", apostador);
    }

    editar(apostador) {
        return axios.post(this.url + "editar", apostador);
    }

    eliminar(id) {
        return axios.get(this.url + "eliminar/" + id);
    }
}