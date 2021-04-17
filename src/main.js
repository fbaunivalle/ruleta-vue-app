import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Panel from 'primevue/panel'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice';
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice';
import DataView from 'primevue/dataview';
import Divider from 'primevue/divider';

import 'primevue/resources/themes/nova/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const app = createApp(App)

app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);

app.component('DataTable', DataTable) 
app.component('Column', Column) 
app.component('Panel', Panel) 
app.component('Menubar', Menubar) 
app.component('Button', Button) 
app.component('Dialog', Dialog) 
app.component('InputText', InputText) 
app.component('ConfirmDialog', ConfirmDialog) 
app.component('Toast', Toast) 
app.component('DataView', DataView) 
app.component('Divider', Divider) 

app.mount('#app')
