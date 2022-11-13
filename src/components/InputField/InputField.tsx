import React, {useContext, useEffect, useState} from 'react';
import { observer } from "mobx-react-lite";

import { Context } from "../../index";
import { convertNumToStr, convertStrToNum } from '../../utils/calc';

import './inputField.sass';

interface InputFieldProps {
    id: string;
    title: string;
    units: string;
    disabled: boolean;
};


const InputField: React.FC<InputFieldProps> = observer(({id, title, units, disabled}) => {
    const {input} = useContext(Context);

    let minValue = id === "price" ? 1000000 : 1;
    let maxValue = id === "price" ? 6000000 : 60;

    const [value, setValue] = useState<number>(id === "price" ? input.price : input.months);
    const [range, setRange] = useState<number>(id === "price" ? input.price : input.months);
    const [right, setRight] = useState<number>(id === "price" ? input.price : input.months);
    
    const handlervalue = () => {
        setRange(value);
        setRight(100 - ((value - minValue) * 100 )/ (maxValue - minValue));
    };

    const handlerrange = () => {
        setValue(range);
        setRight(100 - ((range - minValue) * 100 )/ (maxValue - minValue));
    };

    useEffect(() => {
        if (value > maxValue) {
        }
        handlervalue();
    }, [value]);

    useEffect(() => {
        handlerrange();
    }, [range]);

    useEffect(() => {
        if (id === "price") {
            input.setPrice(range); 
        } else {
            input.setMonths(range); 
        }              
    }, [range]);


    return (
        <div className='input' id={id}>
            <div className='input__title'>{title}</div>
            <input
                type="text"
                className="input__text input__text_value"
                value={id === "price" ? convertNumToStr(value) : value}
                onChange={e => {
                    (convertStrToNum(e.target.value) > minValue) ? 
                        (convertStrToNum(e.target.value) > maxValue) ? setValue(maxValue) : setValue(convertStrToNum(e.target.value))
                    : setValue(minValue)
                }} 
                disabled={disabled}
            />
            <div className='input__text input__text_units'>{units}</div>
            
            <div className="input__slider">
                <div className="input__progress" style={{left: `0%`, right: `${right}%`}}></div>
            </div>
            <div className="input__range">
                <input 
                    type="range" 
                    className="input__range-max" 
                    min={minValue} 
                    max={maxValue} 
                    value={range} 
                    step={id === "price" ? 100000 : 1} 
                    onChange={e => setRange(+e.target.value)} 
                />
            </div>
        </div>
    );
});

export default InputField;