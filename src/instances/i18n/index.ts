
import I18n from 'react-native-i18n';
import { en } from './en';
import { th } from './th';
import { store } from '../../redux';

I18n.fallbacks = true;
I18n.defaultLocale = 'en'

I18n.translations = {
    en,
    th
};

const trans = (string: string) => {
    let language = store.getState().user.language
    I18n.locale = language
    return I18n.t(string)
}

export default { ...I18n, trans };