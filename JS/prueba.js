import { camper } from "./clases.js";

function mostrarModal() {

    const modalRegistro = document.getElementById('modalRegistro');
    const botonX = document.getElementById('boton_x');

    modalRegistro.style.display = 'flex';
    botonX.addEventListener('click', function () {
        modalRegistro.style.display = 'none';
    });
}
function mostrarDatosCamper(camper) {
    let contenido = document.createRange().createContextualFragment(
        `
        <div class="camper_listado">
            <p>${camper.nombres}</p>
            <p>${camper.grupo}</p>
            <p>${camper.campcoins}</p>
            <p>${camper.email}</p>
            <p>${camper.telefono}</p>
            <p>${camper.id}</p>
        </div>
        `    
    )
    let div_padre = document.getElementById("lista_campers");
    div_padre.append(contenido)
}


class ListaCampers {
    constructor() {
        this.listaDeCampers = this.obtenerCampersLocalStorage() || [];
    }
    guardarCampersLocalStorage() {
        localStorage.setItem('campers', JSON.stringify(this.listaDeCampers));
    }
    obtenerCampersLocalStorage() {
        return JSON.parse(localStorage.getItem('campers')) || [];
    }

    agregarCamper(camper) {      
        console.log(this.listaDeCampers)  
        this.listaDeCampers.push(camper);
        this.actualizarVista();

        this.guardarCampersLocalStorage();
        console.log('Nuevo Camper Agregado:\n', camper);
        console.log('Listado Actual Campers:\n', this.obtenerCampersLocalStorage());
        
    }
    modificarCamperPorID(id) {
        const camper = this.listaDeCampers.find(camper => camper.id === id);
        if (camper) {
            camper.nombres = prompt("Nuevo nombre Completo:", camper.nombres);
            camper.telefono = prompt("Nuevo teléfono:", camper.telefono);
            camper.email = prompt("Nuevo email:", camper.email);
            camper.grupo = prompt("Nuevo Grupo:", camper.grupo);
            camper.campcoins = prompt("Nuevos Campcoins:", camper.campcoins);

            this.actualizarVista();
            console.log("Camper Modificado:\n", camper)
            this.guardarCampersLocalStorage();
        }
    }
    eliminarcamperPorID(id) {
        const index = this.listaDeCampers.findIndex(camper => camper.id === id);
        if (index !== -1) {

            this.listaDeCamperss.splice(index, 1);
            this.actualizarVista();
            this.guardarCampersLocalStorage();
            console.log("Camper Eliminado, Nueva Lista:\n", this.obtenerCampersLocalStorage())
        }
    }
    actualizarVista() {
        const campersContainer = document.getElementById('lista_campers');
        campersContainer.innerHTML = '';
        this.listaDeCampers.forEach(camper => {
        mostrarDatosCamper(camper);
    });
    }
}
const campers_guardados = JSON.parse(localStorage.getItem('campers')) || [];
const listaCampers = new ListaCampers();



const add_client = document.getElementById('add_camper');
add_client.addEventListener('click', () => {
    mostrarModal();

    const formularioRegistro = document.getElementById('formularioRegistro');
    formularioRegistro.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const id = document.getElementById('id').value;
        const nombres = document.getElementById('nombre_completo').value;
        const telefono = document.getElementById('telefono').value;
        const email = document.getElementById('email').value;
        const grupo = document.getElementById('grupo_campus').value;
        const campcoins = document.getElementById('campcoins').value;
        console.log(id, nombres, telefono, email, grupo, campcoins)

        const nuevo_camper = new camper(id, nombres, telefono, email, grupo, campcoins);
        console.log(nuevo_camper)
        listaCampers.agregarCamper(nuevo_camper);
        formularioRegistro.reset();
        modalRegistro.style.display = 'none';
    });
})



document.addEventListener('DOMContentLoaded', () => {
    listaCampers.actualizarVista();

    const botonListar = document.getElementById('for_camper');
    botonListar.addEventListener('click', () => {

        let lista = document.getElementById('mostrar_lista');
        lista.style.display = 'flex';
        let esconder_lista = document.getElementById('mostrar_lista');
        esconder_lista.addEventListener('click', () => {
            lista.style.display = 'none';
        });
    });

    const botonEliminar = document.getElementById('delete_camper');
    botonEliminar.addEventListener('click', () => {
        const id = prompt("Ingrese el ID del cliente a eliminar:");
        listaCampers.eliminarcamperPorID(id);
    });

    const botonModificar = document.getElementById('modify_camper');
        botonModificar.addEventListener('click', () => {
        const id = prompt("Ingrese el ID del cliente a modificar:");
        listaCampers.modificarCamperPorID(id);
    });
});


const descarga = document.getElementById('btn_reporte');
descarga.addEventListener('click', function () {
    const usuarios = JSON.parse(localStorage.getItem('campers'));

    if (!usuarios || usuarios.length === 0) {
        alert('No hay usuarios en el Local Storage.');
        return;
    }
    let content = '';
    usuarios.forEach((usuario) => {
        content += `${usuario.nombres} - Campcoins: ${usuario.campcoins}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);


    const a = document.createElement('a');
    a.href = url;
    a.download = 'usuarios.txt';
    document.body.appendChild(a);

    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
