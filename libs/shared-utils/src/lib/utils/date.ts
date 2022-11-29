// import moment from "moment";
import parseISO from 'date-fns/fp/parseISO';
import format from 'date-fns/fp/format';

export const convertDate = (date: string) => {
    if(date){
        const parseDate = parseISO(date);
        return format("dd-MM-yyyy", parseDate);
    }
    return ''
}
