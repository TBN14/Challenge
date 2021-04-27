//import Carro from './carro.js'
"use strict";
console.log('hola mundo');
//en la clase carro puse la entidad carril para no crear el atributo carril
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
//en este realice lo mismo 
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
_checkGameStatus() {
    this._setGameStatus(this._getPlayerList().every(conductor => {
        return conductor.getArrived() === true;
    }));
}
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
