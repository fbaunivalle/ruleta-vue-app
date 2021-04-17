import axios from 'axios'

export default class RondaService {
    //url = "http://localhost:8080/api/v1/";
    url = "https://ruleta-api.herokuapp.com/api/v1/";
    
    obtenerRondas() {
        return axios.get(this.url + "rondas");
    }

    jugarRonda() {
        return axios.get(this.url + "jugar");
    }
}