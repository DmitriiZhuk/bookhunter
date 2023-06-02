<template>
    <div class="container">
        <table class="table table-hover table-sm">
            <thead>
                <tr>
                    <th class="text-start column--store" style="width: 120px;">Магазин</th>
                    <th class="text-start column--title">Название</th>
                    <th class="text-end column--price" style="width: 120px;">Цена</th>
                    <th class="text-center column--cover" style="width: 140px;">Изображение</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(innerArray, index) in mySortArray" :key="index">
                    <td class="text-start"><a v-bind:href="innerArray[2]" target="_blank">{{ innerArray[4] }}</a></td>
                    <td class="text-start"><a v-bind:href="innerArray[2]" target="_blank">{{ innerArray[0] }}</a></td>
                    <td class="text-end">{{ formatPrice(innerArray[1]) }}</td>
                    <td class="text-center"><img :src="innerArray[3]" v-bind:alt="innerArray[0]" width="40" class="rounded"></td>

                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import formatPrice from '@/common/utils';

export default {
    name: 'vSortContent',
    props: {
        mySortArray: {
            type: Array,
        },
    },
    methods: {
        formatPrice,
    },
};
</script>
