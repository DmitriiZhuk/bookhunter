<template>
    <div class="container">

        <div class="mt-2">
            <button type="button" class="btn btn-light" @click="showTable">{{ isVisible ? "Свернуть результаты поиска" :
                "Развернуть результаты поиска" }}</button>
        </div>

        <table class="table table-hover table-sm" v-show="isVisible">
            <thead>
                <tr>
                    <th class="text-start column--title">Название</th>
                    <th class="text-center column--price">Цена</th>
                    <th class="text-center column--cover">Изображение</th>
                    <th class="text-center column--action">Поиск</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(innerArray, index) in myArray" :key="index">
                    <td class="text-start"><a v-bind:href="innerArray[2]" target="_blank">{{ innerArray[0] }}</a></td>
                    <td class="text-center">{{ formatPrice(innerArray[1]) }}</td>
                    <td class="text-center"><img :src="innerArray[3]" v-bind:alt="innerArray[0]" width="40" class="rounded">
                    </td>
                    <td>
                        <button type="button" class="btn btn-light" @click="clarifyResults(innerArray[0])">Уточнить</button>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import formatPrice from '@/common/utils';

export default {
    name: 'vArrContent',
    props: {
        myArray: {
            type: Array
        },
    },

    methods: {
        formatPrice,
        clarifyResults(specifyText) {
            this.$emit("clarify-request", specifyText)
            window.scrollTo(0, 0);

        },
        showTable() {
            this.isVisible = !this.isVisible
        },
    },
    data() {
        return {
            isVisible: true,
        }
    }
}
</script>
