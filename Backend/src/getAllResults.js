import {getBook24} from './parserBook24.js';
import {getChitaiGorod} from './parserChitaigorod.js';
import {getMyShop} from './parserMyshop.js';
import {getLabirint} from './parserLabirint.js';

export async function getAll(request = 'януш корчак') {
    return await Promise.all([
        getBook24(request),
        getChitaiGorod(request),
        getMyShop(request),
        getLabirint(request),
    ]);
}
