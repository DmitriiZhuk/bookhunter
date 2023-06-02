<template>
    <vLoader v-show="isLoading"/>
    <div class="container pt-3">
        <section class="search mt-5 pt-3 bg-light">

            <div v-show="alertShow">
                <p class="font-weight-bold text-center">Пожалуйста, заполните поле поиска ниже</p>
            </div>

            <div class="form-floating m-3">
                <input type="text" class="form-control" v-model="searchReq" ref="clearInput" @keyup.enter="startSearch">
                <label for="bookSearch">Введите автора или название книги </label>
                <div class="row">

                    <div class="col">
                        <button type="submit" class="btn btn-primary mt-3 me-3" @click="startSearch">Начать
                            поиск</button>

                        <button type="reset" class="btn btn-primary mt-3" @click="clearInput">Очистить
                            поиск</button>
                    </div>

                    <div class="col d-flex flex-row-reverse pt-2">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox"
                                :disabled="arrayOfArrays.length !== 0 ? false : true" role="switch"
                                ref="flexSwitchCheckDefault" @change="changeSort">
                            <label class="form-check-label" for="flexSwitchCheckDefault">Сортировка по
                                возрастанию</label>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    </div>
</template>

<script>
import axios from 'axios';
import vLoader from './vLoader.vue'

export default {
    name: 'vSearch',
    components: { vLoader },

    data() {
        return {
            searchReq: '',
            arrayOfArrays: [],
            alertShow: false,
            isLoading: false,
        }
    },

    methods: {

        startSearch() {
            if (this.searchReq != "") {
                
                console.log(this.searchReq)
                
                this.alertShow = false
                this.isLoading = true
                
                axios.get(`http://localhost:3000/request?first=${this.searchReq}`)
                    .then(response => {
                        this.arrayOfArrays = response.data;
                        console.log(this.arrayOfArrays)
                        this.$emit('array-updated', this.arrayOfArrays);
                        this.$emit('search-results', true)
                        this.isLoading = false
                
                    })
                    .catch(error => {
                        console.log(error);
                        this.isLoading = false
                    });
            } else {
                this.alertShow = true
            }
        },

        clearInput() {
            this.$refs["clearInput"].value = "";
            this.searchReq = ""
            this.alertShow = false
        },

        changeSort() {
            if (this.$refs.flexSwitchCheckDefault.checked) {
                this.$emit('sort-change', true)

            } else (this.$emit('sort-change', false)
            )
        },

        prepareSearch(searchText) {
            this.searchReq = searchText
            this.startSearch()
        }
    },

}

</script>