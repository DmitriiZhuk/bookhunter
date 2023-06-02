
<template>
    <div class="container">
        <table class="table table-hover table-sm">
            <thead>
                <tr>
                    <th class="text-start">Магазин</th>
                    <th class="text-start">Название</th>
                    <th class="text-center">Цена</th>
                    <th class="text-center">Изображение</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(innerArray, index) in mySortArray" :key="index">
                    <td class="text-start"><a v-bind:href="innerArray[2]" target="_blank">{{ innerArray[4] }}</a></td>
                    <td class="text-start w-75"><a v-bind:href="innerArray[2]" target="_blank">{{ innerArray[0] }}</a></td>
                    <td class="text-center">{{ innerArray[1] }} ₽</td>
                    <td class="text-center"><img :src="innerArray[3]" v-bind:alt="innerArray[0]" width="40" class="rounded"></td>

                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'vSortContent',
    props: {
        mySortArray: {
            type: Array
        },
    }
}
</script>
