import React, {useContext, useEffect, useState} from 'react';
import { observer } from "mobx-react-lite";

import { Context } from "../../index";

import './inputField.sass';

interface InputPercentProps {
    id: string;
    title: string;
    initPay: number;
    disabled: boolean;
};


const InputPercent: React.FC<InputPercentProps> = observer(({id, title, initPay, disabled}) => {
    const {input} = useContext(Context);
    const [value, setValue] = useState<number>(input.initial);
    const [range, setRange] = useState<number>(input.initial);
    const [right, setRight] = useState<number>(input.initial);

    let minValue = 10;
    let maxValue = 60;
    
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
        input.setInitial(value);       
    }, [value]);
  

    return (
        <div className='input' id={id}>
            <div className='input__title'>{title}</div>
            <input
                type="number"
                className="input__text input__text_value"
                // @ts-ignore
                placeholder={initPay}
                readOnly
                disabled={disabled}
            />
            <input 
                type="number"
                className="input__text input__text_percent"                
                value={value}
                onChange={e => {
                    (+e.target.value > minValue) ? 
                        (+e.target.value > maxValue) ? setValue(maxValue) : setValue(+e.target.value)
                    : setValue(minValue)
                }} 
                disabled={disabled}
            /><span className="input__text input__text_percent input__text_unit">%</span>

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
                    step={1} 
                    onChange={e => setRange(+e.target.value)} 
                />
            </div>
        </div>
    );
});

export default InputPercent;