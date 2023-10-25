function reiniciarAnimacion(tiempo) {
    const progressBar = document.querySelector('.progreso');
    const nuevoProgressBar = progressBar.cloneNode(true);
    progressBar.parentNode.replaceChild(nuevoProgressBar, progressBar);

    const msg = document.querySelector('.mensaje_exito');
    progressBar.style.animationDuration = `${tiempo}`;
    msg.style.display = 'flex';

    setTimeout(() => {msg.style.display = 'none';}, tiempo);
}

export { reiniciarAnimacion };