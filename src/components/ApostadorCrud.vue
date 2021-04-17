<template>
    <div id="main-div" style="margin: 0 auto; width: 80%">
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <Panel header="Apostadores CRUD">
            <Menubar :model="items"/>
            <DataTable :value="apostadores" v-model:selection="selected" selectionMode="single" dataKey="id" :loading="loading" @rowSelect="onRowSelect">
                <Column field="id" header="Id"></Column>
                <Column field="nombre" header="Nombre"></Column>
                <Column field="saldo" header="Saldo"></Column>
            </DataTable>
        </Panel>
        <Dialog header="Crear Apostador" v-model:visible="displayCrearModal" :style="{width: '450px'}" :modal="true" class="p-fluid">
            <div class="p-field">
                <label for="nombre">Nombre:</label>
                <InputText id="nombre" type="text" v-model.trim="apostador.nombre" />
            </div>
            <div class="p-field">
                <label for="saldo">Saldo:</label>
                <InputText id="saldo" type="text" v-model.trim="apostador.saldo" />
            </div>
            <template #footer>
                <Button label="Guardar" icon="pi pi-save" @click="crear" autofocus/>
                <Button label="Cancelar" icon="pi pi-times" @click="ocultarCrearModal" autofocus/>
            </template>
        </Dialog>
        <Dialog header="Editar Apostador" v-model:visible="displayEditarModal" :style="{width: '450px'}" :modal="true" class="p-fluid">
            <div class="p-field">
                <label for="id">Id:</label>
                <InputText id="id" type="text" v-model.trim="apostador.id" readonly="true"/>
            </div>
            <div class="p-field">
                <label for="nombre">Nombre:</label>
                <InputText id="nombre" type="text" v-model.trim="apostador.nombre" />
            </div>
            <div class="p-field">
                <label for="saldo">Saldo:</label>
                <InputText id="saldo" type="text" v-model.trim="apostador.saldo" />
            </div>
            <template #footer>
                <Button label="Guardar" icon="pi pi-save" @click="editar" autofocus/>
                <Button label="Cancelar" icon="pi pi-times" @click="ocultarEditarModal" autofocus/>
            </template>
        </Dialog>
    </div>
</template>

<script>
import ApostadorService from '../service/ApostadorService'
export default {
    name: 'ApostadorCrud',
    data () {
        return {
            //Modelo de items opciones CRUD del menu
            items: [
                {
                    label: 'Nuevo',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        this.mostrarCrearModal();
                    }
                },
                {
                    label: 'Editar',
                    icon: 'pi pi-fw pi-pencil',
                    disabled: this.disabledEditarItem,
                    command: () => {
                        this.mostrarEditarModal();
                    }
                },
                {
                    label: 'Eliminar',
                    icon: 'pi pi-fw pi-trash',
                    disabled: this.disabledEliminarItem,
                    command: () => {
                        this.eliminar();
                    }
                },
                {
                    label: 'Refrescar',
                    icon: 'pi pi-fw pi-refresh',
                    command: () => {
                        this.obtenerTodos();
                    }
                }
            ],

            // Lista de apostadores
            apostadores: null, 

            // Objeto entidad Apostador
            apostador: {
                id: null,
                nombre: null,
                saldo: '15000',
            },

            //El item seleccionado en el datable
            selected: {
                id: null,
                nombre: null,
                saldo: null,
            },

            loading: false,
            displayCrearModal: false,
            displayEditarModal: false,
            disabledEditarItem: true,
            disabledEliminarItem: true,
            submitted: false
        }
    },
    apostadorService: null,
    created() {
        // Se instancia el servicio de la entidad Apostador
        this.apostadorService = new ApostadorService()
    },
    mounted() {
        this.obtenerTodos();
    },
    methods: {
        mostrarCrearModal: function() {
            this.displayCrearModal = true;
        },
        ocultarCrearModal: function() {
            this.displayCrearModal = false;
            this.reiniciarEntidad();
            this.obtenerTodos();
        },
        mostrarEditarModal: function() {
            this.apostador = this.selected;
            this.displayEditarModal = true;
        },
        ocultarEditarModal: function() {
            this.displayEditarModal = false;
            this.reiniciarEntidad();
            this.obtenerTodos();
        },
        obtenerTodos: function() {
            this.loading = true;
            this.apostadorService.obtenerTodos().then(data => { 
                console.log(data); 
                this.apostadores = data.data;
            })
            this.loading = false;
        }, 
        crear: function() {
            this.submitted = true;
            this.apostadorService.crear(this.apostador).then(data => {
                console.log(data);
                if (data.status === 200) {
                    this.ocultarCrearModal();
                    this.obtenerTodos();
                    this.$toast.add({severity:'success', summary: 'Se creó el apostador exitosamente', detail:'Message Content', life: 3000});
                }
            });
        },
        editar: function() {
            this.submitted = true;
            this.apostadorService.editar(this.apostador).then(data => {
                console.log(data);
                if (data.status === 200) {
                    this.ocultarEditarModal();
                    this.obtenerTodos();
                    this.$toast.add({severity:'success', summary: 'Se actualizó el apostador exitosamente', detail:'Message Content', life: 3000});
                }
            });
        },
        eliminar: function() {
            this.$confirm.require({
                message: '¿Confirma eliminar apostador?',
                header: 'Confirmación',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.apostadorService.eliminar(this.selected.id).then(data => {
                        if (data.status === 200) {
                            this.reiniciarEntidad();
                            this.obtenerTodos();
                            this.$toast.add({severity:'success', summary: 'Se eliminó el apostador exitosamente', detail:'Message Content', life: 3000});
                        }
                    });
                },
                reject: () => {
                    //callback to execute when user rejects the action
                }
            })
        },
        reiniciarEntidad: function() {
            this.apostador = {
                id: null,
                nombre: null,
                saldo: '15000',
            }
        },
        onRowSelect(event) {
            event.data;
            this.disabledEditarItem = false;
            this.disabledEliminarItem = false;
        }
    }
}
</script>