import axios from 'axios';
import {Contact} from "@/types/general";

export const getContact = async (id?: number | undefined) => {
    try {
        const response = await axios.get('/data/data.json');
        if (id) {
            return response.data.find((contact: Contact) => contact.id === id);
        } else {
            return response.data
        }
    } catch (error) {
        throw new Error(`Ошибка загрузки контактов, перезагрузите или попробуйте позже (${error})`);
    }
};
