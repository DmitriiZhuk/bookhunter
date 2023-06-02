import {getBook24} from './parserBook24.js';
import {getChitaiGorod} from './parserChitaigorod.js';
import {getMyShop} from './parserMyshop.js';
import {getLabirint} from './parserLabirint.js';

export function getAll(request = 'януш корчак') {
    return Promise.all([
        getBook24(request),
        //getChitaiGorod(request), //fixme: vpn needed
        getMyShop(request),
        getLabirint(request),
    ]);
}
