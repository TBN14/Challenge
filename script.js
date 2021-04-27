//Creacion de la clase carro con la entidad carril ya que asi funciona en mi arquitectura.
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
    _pista = 0;
    _arrived = false;
    _victory = 0;

    constructor(carril, pista){
        super(carril);
        this._pista = pista;
    }

    getPista() {
        return this._pista;
    }
    setPista(value) {
        this._pista = value;
    }
    getArrived() {
        return this._arrived;
    }
    setArrived(value) {
        this._arrived = value;
    }
    getVictory() {
        return this._victory;
    }
    addVictory() {
        this._victory++;
    }
}
//En la clase podio use los array _winners y _allWinners y el objeto _counter.
class Podio {
    _winners = [];
    _counter = {};
    _allWinners = [];
    save = {}

    constructor() {

    }

    getWinners() {
        return this._winners;
    }
    setWinners(value) {
        this._winners = value;
    }
    addPlayer(player) {
        this._winners.push(player);
    }
    getCounter() {
        return this._counter;
    }
    setCounter(value) {
        this._counter = value;
    }
    createCounter(player, times) {
        this._counter[player] = times;
    }
    addCounter(player) {
        this._counter[player]++;
    }
    getAllWinners() {
        return this._allWinners;
    }
    setAllWinners(podium) {
        this._allWinners = podium;
    }
    addAllWinners(podium) {
        this._allWinners.push(podium);
    }
    copy() {
        this.save = {
            _winners : this.getWinners(),
            _counter : this.getCounter(),
            _allWinners : this.getAllWinners()
        }
        return this.save;
    }
}
//En la clase juego cree el objeto _podio con las variables _numPlayers y _limit. Tambien un array para la lista de jugadores y por ultimo un boolean para el estado de juego
class Juego {
    _podio = new Podio();
    _numPlayers = 0;
    _limit = 0;
    _playerList = [];
    _gameStatus = false;
    save = {}
  //en el constructor del  juego ya empece a realizar parte del funcionamiento donde utilice la funcion prompt para arrojar algunos mensajes alerta para insertar datos y utilice la funcion array.from para crear conocer la cantidad de jugadores y crear la lista de jugadores
    constructor(numPlayers, limit) {
        this._numPlayers = Number(prompt('Ingrese el numero de jugadores'));
        this._limit = Number(prompt('Ingrese el limite en kilómetros')) * 1000;
        this._playerList = Array.from({length: this._getNumPlayers()}, (v, k) => {
            return new Conductor(`Carril ${k + 1}`, 0);
        });
    }

    _getNumPlayers() {
        return this._numPlayers;
    }
    _setNumPlayers(value) {
        this._numPlayers = value;
    }
    _getLimit() {
        return this._limit;
    }
    _setLimit(value) {
        this._limit = value;
    }
    _getPlayerList(){
        return this._playerList;
    }
    _getGameStatus() {
        return this._gameStatus;
    }
    _setGameStatus(value) {
        this._gameStatus = value;
    }
    _getPodio() {
        return this._podio;
    }
    _setPodio(podio) {
        this._podio = podio;
    }
    _copy() {
        this.save = {
            _podio : this._getPodio().copy(),
            _numPlayers : this._getNumPlayers(),
            _limit : this._getLimit(),
            _playerList : this._getPlayerList(),
            _gameStatus : this._getGameStatus()
        }
        return this.save;
    }
        //este metodo es para saber si los jugadores completaron la pista
    _checkGameStatus() {
        this._setGameStatus(this._getPlayerList().every(conductor => {
            return conductor.getArrived() === true;
        }));
    }
       //en esta parte del metodo use un ciclo foreachh para recorrer todo la lista de jugadores y asignarle una tirada de dado a cada jugador este valor lo multiplique por 100 porque va en kilometros.
    _move() {
        this._playerList.forEach(conductor => {
            //en esta funcion nos arroja un numero alatorio y se guarda en el conductor
            if(!this._getPodio().getWinners().includes(conductor)) {
                conductor.setPista(conductor.getPista() + (Math.floor(Math.random() * 6) + 1) * 100);
                 //en esta parte del metodo se agrega  una victoria al piloto en el podio teniendo en cuenta quien gano.
                if(conductor.getPista() >= this._getLimit()) {
                    if(this._getPodio().getWinners().length === 0) {
                        //Aca use el metodo hasOwnProperty para buscar directamente el valor o la propiedad del carril del conductor y añadirlo al contador
                        conductor.addVictory();
                        if(!this._getPodio().getCounter().hasOwnProperty(conductor.getCarril())) {
                            this._getPodio().createCounter(conductor.getCarril(), conductor.getVictory());
                        } else {
                            this._getPodio().addCounter(conductor.getCarril());
                        }
                    }
                     //Aca sabemos si el jugador completo la pista para poder asignar el jugador al podio
                    conductor.setPista(this._getLimit());
                    conductor.setArrived(true);
                    this._getPodio().addPlayer(conductor);
                }
                            //y este metodo nos ejecuta el estado de la carrera
                this._checkGameStatus();
            }
            console.log(conductor);                     
        });
        //En este metodo mostraria solo los primeros 3 puestos en el podio y estos se agregarian a todos los ganadores.
        if(this._getGameStatus()) {
            this._getPodio().setWinners(this._getPodio().getWinners().slice(0, 3));
            this._getPodio().addAllWinners(this._getPodio().getWinners());
            this._getPodio().setWinners([]);
            this._copy()
             //Este caraga los datos en el navegador(persistencia de datos)
            console.log(this.save);
            this._localStorage();            
            this._restart();
        }
    }
        //Este metodo reinicia el juego para poder empezar una carrera nuevamente
    _restart() {
        this._getPlayerList().forEach(conductor => {
            conductor.setPista(0);
            conductor.setArrived(false);
        })
        this._setGameStatus(false);
    }
    //Aca es donde manejamos la persistencia de datos donde localStorage nos permite almacenar los datos en el navegador.
    _localStorage() {
        window.localStorage.setItem('Juego', JSON.stringify(this._copy()));
    }
}

const juego = new Juego();
window.juego = juego;
//IMPORTANTE para ejecutar el codigo toca abrir live server y ejecutar en la consola.
//juego
//juego._move();    Este va moviendo el juego asi que, repetirlo hasta que termine el limite de la pista que hayan dado al comienzo.
//para reiniciar el juego y empezar una carrera nuevamente otra vez repetir los comandos anteriores.
//y por ultimo para revisar los datos ir a application y en storage, local storage