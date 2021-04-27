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
    _victory = 0;

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
    getVictory(){
        return this._victory;
    }
    addVictory(){
        this._victory++;
    }
}
//En la clase podio cree un array para los ganadores y sus setters and getters
class Podio{

    _winners = [];
    _counter = {}

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
    getCounter(){
        return this._counter;
    }
    setCounter(value){
        this._counter = value;
    }
    createCounter(player, times){
        this._counter[player] = times;
    }
    addCounter(player){
        this._counter[player]++;
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
    _getPodio(){
        return this._podio;
    }
    _setPodio(podio){
        this._podio = podio;
    }
    //este metodo es para saber si los jugadores completaron la pista
    _checkGameStatus() {
        this._setGameStatus(this._getPlayerList().every(conductor => {
            return conductor.getArrived() === true;
        }));
    }
    _move() {
        this._playerList.forEach(conductor => {
            //en esta funcion nos arroja un numero alatorio y se guarda en el conductor
            if(!this._getPodio().getWinners().includes(conductor)){
                conductor.setPista(conductor.getPista() + (Math.floor(Math.random() * 6) + 1)*100);
                if(conductor.getPista() >= this._getLimit()) {
                    //y en esta le agregamos la victoria al conductor
                    if(this._getPodio().getWinners().length === 0) {
                        conductor.addVictory();
                        if(this._getPodio().getCounter().hasOwnProperty(conductor.getCarril())){
                         this._getPodio().addCounter(conductor.getCarril(), conductor.getVictory());
                        }else{
                            this._getPodio().addCounter(conductor.getCarril());
                        }
                    }
                    conductor.setPista(this._limit);
                    conductor.setArrived(true);
                    this._getPodio().addPlayer(conductor);
            }
            //y este metodo nos ejecuta el estado de la carrera
            this._checkGameStatus();
            }
            console.log(conductor);
        });
        if(this._getGameStatus()){
            console.log(this._getPodio().getWinners().slice(0,3))
        }
    }
}
const juego     = new Juego()
window.juego = juego;
//console.log(juego1)
