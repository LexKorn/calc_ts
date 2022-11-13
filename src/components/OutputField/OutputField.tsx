import React from 'react';

import { IResult } from '../../types/types';

import './outputField.sass';

interface OutputFieldProps {
    title: string;
    result: IResult;
}

const OutputField: React.FC<OutputFieldProps> = ({title, result}) => {
    return (
        <div className='output'>
            <div className='output__title'>{title}</div>
            {/* @ts-ignore */}
            <div className='output__result'>{result} ₽</div>
        </div>
    );
};

export default OutputField;