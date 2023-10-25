const campers = JSON.parse(localStorage.getItem('campers'));

const btn_añadir = document.getElementById('add_campcoins');
const btn_eliminar = document.getElementById('remove_campcoins');

import { reiniciarAnimacion } from "./utilidades.js";

btn_añadir.addEventListener('click', () => {
    function pao() {
        const cantidad = prompt('cantidad de campcoins a añadir: ');
        if(!cantidad) {return};
    
        const modal = document.getElementById('modal_tabla');
        modal.style.display = 'flex';
    
        let tabla_padre = document.getElementById("papa_clientes");
        tabla_padre.innerHTML = '';
    
        campers.forEach(camper => {
            let tarjeta = document.createRange().createContextualFragment(
                `
                <div class="ordenacion">
                    <p>${camper.nombres} ${camper.campcoins}</p>
                </div>
                `
            );
            let divOrdenacion = tarjeta.querySelector('.ordenacion');
    
            const botonAnadir = document.createElement('button');
            botonAnadir.className = 'cocoloco';
            botonAnadir.textContent = 'añadir';
    
    
            botonAnadir.addEventListener('click', () => {
                const total = parseInt(cantidad) + (parseInt(camper.campcoins))
                camper.campcoins = total;
                console.log(camper);
                modal.style.display = 'none';

                const mensaje_logeado = document.getElementById('mensaje_logeado');
                mensaje_logeado.innerHTML = `${camper.nombres}: ${camper.campcoins}`
                reiniciarAnimacion(4000);
                localStorage.setItem('campers', JSON.stringify(campers));
                console.log(JSON.parse(localStorage.getItem('campers')))
            });
            divOrdenacion.appendChild(botonAnadir);
            tabla_padre.append(tarjeta);
        });
    
        let boton_x = document.getElementById('cerrar_x');
        boton_x.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    pao();
});



btn_eliminar.addEventListener('click', () => {
        const cantidad = prompt('cantidad de campcoins a eliminar: ');
        if(!cantidad) {return};
    
        const modal = document.getElementById('modal_tabla');
        modal.style.display = 'flex';
    
        let tabla_padre = document.getElementById("papa_clientes");
        tabla_padre.innerHTML = '';
    
        campers.forEach(camper => {
            let tarjeta = document.createRange().createContextualFragment(
                `
                <div class="ordenacion">
                    <p>${camper.nombres} ${camper.campcoins}</p>
                </div>
                `
            );
            let divOrdenacion = tarjeta.querySelector('.ordenacion');
    
            const botonAnadir = document.createElement('button');
            botonAnadir.className = 'chupacabra';
            botonAnadir.textContent = 'eliminar';
    
    
            botonAnadir.addEventListener('click', () => {
                const total = parseInt(camper.campcoins) - parseInt(cantidad)
                if(total < 0) {
                    alert("Operacion invalida");
                    modal.style.display = 'none';
                    return
                }
                camper.campcoins = total;
                console.log(camper);
                modal.style.display = 'none';

                const mensaje_logeado = document.getElementById('mensaje_logeado');
                mensaje_logeado.innerHTML = `${camper.nombres}: ${camper.campcoins}`
                reiniciarAnimacion(4000);
                localStorage.setItem('campers', JSON.stringify(campers));
                console.log(JSON.parse(localStorage.getItem('campers')))
            });
            divOrdenacion.appendChild(botonAnadir);
            tabla_padre.append(tarjeta);
        });
    
        let boton_x = document.getElementById('cerrar_x');
        boton_x.addEventListener('click', () => {
            modal.style.display = 'none';
        });
});