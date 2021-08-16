import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from '../lang/en';
import es from '../lang/es';

Vue.use(VueI18n);

const messages = {
    en,
    es
}

function getLanguage() {
    const lng = localStorage.getItem('lng');
    return lng || 'en';
}

// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: getLanguage(), // set locale
    fallbackLocale: 'en',
    messages, // set locale messages

});

export function changeLanguage(lng: string) {
    console.log(lng)
    localStorage.setItem('lng', lng);
    i18n.locale = lng;
}

export default i18n;

