import { IResult } from "../types/types";

export const calcMonthPay = (price: number, initPay: number, months: number, percent: number): IResult => {
    const monthPay = Math.round((price - initPay) * ((percent * Math.pow((1 + percent), months)) / (Math.pow((1 + percent), months) - 1)));
    const totalSum = initPay + months * monthPay;
    const result = {monthPay, totalSum};

    return result;
};

export const convertNumToStr = (num: number): string => {
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};  

export const convertStrToNum = (str: string): number => {
    return Number(str.replace(/\s+/g, ''));
};  