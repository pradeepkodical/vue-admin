import Vue from 'vue';
import Vuetify from 'vuetify';
import { colors } from 'vuetify/lib';
import i18n from './vueI18n';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        t: (key, ...params) => i18n.t(key, params) as string,
    },
    theme: {
        themes: {
            light: {
                primary: colors.lightGreen.base,
                secondary: colors.pink.base,
                accent: colors.cyan.base,
                error: colors.deepOrange.base,
                warning: colors.orange.base,
                info: colors.teal.base,
                success: colors.green.base,
                appBar: '#bbe6d6',
                background: '#c8ebdf',
                panelBg: '#fefefe',
                sideBar: '#fefefe'
            },
            dark: {
                primary: colors.pink.base,
                secondary: colors.cyan.base,
                accent: colors.deepPurple.base,
                error: colors.red.base,
                warning: colors.amber.base,
                info: colors.blue.base,
                success: colors.green.base,
                appBar: '#344a5f',
                background: '#304457',
                panelBg: '#1d2935',
                sideBar: '#1d2935'
            }
        },
        options: {
            customProperties: true
        },
    }
});
