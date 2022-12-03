import { toast } from 'react-toastify';

export const showToast = (toastText, options) => {
    toast(toastText, options);
}

export const getFormattedDate = (inputDate) => {
    if (inputDate === '' || !inputDate) {
        return '';
    }
    const date = new Date(inputDate);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
  
    if (dt < 10) {
        dt = `0${dt}`;
    }
    if (month < 10) {
        month = `0${month}`;
    }
    if (hh < 10) {
        hh = `0${hh}`;
    }
    if (mm < 10) {
        mm = `0${mm}`;
    }
    if (ss < 10) {
        ss = `0${ss}`;
    }
  
    return `${dt}.${month}.${year}`;
};