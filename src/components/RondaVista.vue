<template>
    <div id="main-div" style="margin: 0 auto; width: 80%">
        <Panel header="Rondas Jugadas">
            <Button label="Jugar ronda" @click="jugarRonda()"/>
            <br/><br/>
            <div id="ronda-div" class="p-d-flex p-flex-column" v-for="ronda in rondas" :key="ronda.id">
                <div class="p-mb-2">
                    ID: {{ ronda.id }} <br/>
                    Color ganador: {{ ronda.colorGanador.nombre }} <br/>
                    Apuestas realizadas en la ronda: <br/>
                    <DataTable :value="ronda.apuestas">
                        <Column field="id" header="Id"></Column>
                        <Column field="apostador.nombre" header="Apostador"></Column>
                        <Column field="color.nombre" header="Color apostado"></Column>
                        <Column field="saldoInicial" header="Saldo inicial"></Column>                        
                        <Column field="cantidadApostada" header="Cantidad apostada"></Column>
                        <Column field="cantidadGanada" header="Cantidad ganada"></Column>
                        <Column field="saldoFinal" header="Saldo final"></Column>
                    </DataTable>
                </div>
                <Divider type="dashed" />
            </div> 
        </Panel>
    </div>
</template>

<script>
import RondaService from '../service/RondaService'
export default {
    name: 'ApostadorCrud',
    data () {
        return {
            rondas: null,
            timer: null
        }
    },
    rondaService: null,
    created() {
        // Se instancia el servicio de la entidad Apostador
        this.rondaService = new RondaService();
        this.timer = setInterval(this.jugarAutomatico, 180000);        
    },
    mounted() {
        this.jugarRonda();
        this.obtenerTodos();
    },
    methods: {
        obtenerTodos: function() {
            this.rondaService.obtenerRondas().then(data => { 
                console.log(data); 
                this.rondas = data.data;
            })
        },
        jugarRonda: function() {
            this.rondaService.jugarRonda().then(data => { 
                console.log(data);
                if (data.status === 200) {
                    this.obtenerTodos();
                }
            })
        },
        jugarAutomatico() {
            this.jugarRonda();
            this.obtenerTodos();
            this.$forceUpdate();
        }
    }
}
</script>