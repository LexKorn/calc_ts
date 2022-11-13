import {makeAutoObservable} from 'mobx';

export default class InputStore {
    _price: number;
    _initial: number;
    _months: number;

    constructor() {
       this._price = 3300000;
       this._initial = 13;
       this._months = 60;

       makeAutoObservable(this); 
    };

    setPrice(price: number) {
        this._price = price;
    };
    setInitial(initial: number) {
        this._initial = initial;
    };
    setMonths(months: number) {
        this._months = months;
    };


    get price() {
        return this._price;
    };
    get initial() {
        return this._initial;
    };
    get months() {
        return this._months;
    };
}