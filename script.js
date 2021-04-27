//import Carro from './carro.js'
"use strict";
console.log('hola mundo');
//en la clase carro puse la entidad carril para no crear el atributo carril ya que asi funciona la arquitectura que estoy usando
class Carro {
    _carril = '';

    constructor(carril) {
        this._carril = carril;
    }

    getCarril() {
        return this._carril;
    }
    setCarril(value) {
        this._carril = value;
    }
}
//en la clase conductor realice algo similar que la clase carro
class Conductor extends Carro{
    _arrived = false;
    _pista = 0;

    constructor(carril, pista){
        super(carril);
        this._pista = pista;
    }
    getPista(){
        return this._pista
    }
    setPista(value){
        this._pista=value;
    }
    getArrived(){
        return this._arrived;
    }
    setArrived(value){
        this._arrived = value;
    }
}
//En la clase podio cree un array para los ganadores y sus setters and getters
class Podio{

    _winners = [];

    constructor(){

    }
    getWinners(){
        return this._winners
    }
    setWinners(value){
        this._winner = value;
    }
    addPlayer(player){
        this._winners.push(player);
    }
}
//en la clase juego ya empece a realizar parte del funcionamiento donde utilice la funcion prompt para arrojar algunos mensajes alerta para insertar datos y utilice el ciclo forEach para mostrar la lista de los jugadoress
class Juego{
    _podio = new Podio();
    _numPlayers = 0;
    _limit = 0;
    _playerList = [];
    _gameStatus = false;

    constructor(_numPlayers, _limit){
        this._numPlayers = Number(prompt("Ingrese el numero de jugadores"));
        this._limit = Number(prompt("Ingrese el limite en kilometros"))* 1000;
        this._playerList = Array.from({length: this._getNumPlayers()}, (v, k)=>{
            return new Conductor(`Carril ${k + 1}`,0);
        });

    }

_getNumPlayers(){
    return this._numPlayers;
}
_serNumPlayers(value){
    this._numPlayers = value ;
}
_getLimit(){
    return this._limit;
}
_setLimit(value){
    this._limit = value;
}
_getPlayerList(){
    return this._playerList;
}
_getGameStatus(){
    return this._gameStatus;
}
_setGameStatus(value){
    this._gameStatus = value;
}
//este metodo es para saber si los jugadores completaron la pista
_checkGameStatus() {
    this._setGameStatus(this._getPlayerList().every(conductor => {
        return conductor.getArrived() === true;
    }));
}
//y este nos arroja el valor del anterior metodo
_move() {
    this._playerList.forEach(conductor => {
        conductor.setPista(conductor.getPista() + (Math.floor(Math.random() * 6) + 1)*100);
        if(conductor.getPista() >= this._getLimit()) {
            conductor.setPista(this._limit);
            conductor.setArrived(true);
        }
        this._checkGameStatus();
        console.log(conductor);
    });
}
}
const juego     = new Juego()
window.juego = juego;
//console.log(juego1)
