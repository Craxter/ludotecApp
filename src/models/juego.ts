export class Juego {
    ID: string;
    nombre: string;
    minJugadores: string;
    maxJugadores: string;
    img: string;
    constructor(ID: string, nombre: string, minJugadores: string, maxJugadores: string, img: string) {
        this.ID = ID;
        this.nombre = nombre;
        this.minJugadores = minJugadores;
        this.maxJugadores = maxJugadores;
        this.img = img;
    }
}
