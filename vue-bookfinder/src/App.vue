<template>
  <vHeader />
  <vIntro />
  <vSearch @array-updated="handleArrayUpdate" @search-results="isOnSearchResults" @sort-change="sortChange"
    ref="childComponent4Spec" />

  <div v-show="showSearchResults">
    <vShopHeader shopName="Book24" />
    <vArrContent :myArray="parentArray[0]" @clarify-request="clarifyRequest" />

    <vShopHeader shopName="Chitai-Gorod" />
    <vArrContent :myArray="parentArray[1]" @clarify-request="clarifyRequest" />

    <vShopHeader shopName="My-Shop" />
    <vArrContent :myArray="parentArray[2]" @clarify-request="clarifyRequest" />

    <vShopHeader shopName="Labirint" />
    <vArrContent :myArray="parentArray[3]" @clarify-request="clarifyRequest" />

  </div>

  <div v-show="showSortsResults">
    <vShopHeader shopName="Сортировка по возрастанию цены" />
    <vSortContent :mySortArray="flatParrentArray" />
  </div>
</template>

<script>
import vHeader from './components/vHeader.vue'
import vIntro from './components/vIntro.vue'
import vSearch from './components/vSearch.vue'
import vShopHeader from './components/vShopHeader.vue'
import vArrContent from './components/vArrContent.vue'
import vSortContent from './components/vSortContent.vue'

export default {
  name: 'App',
  components: { vHeader, vIntro, vSearch, vArrContent, vShopHeader, vSortContent },
  data() {
    return {
      parentArray: [],
      flatParrentArray: [],
      showSearchResults: false,
      showSortsResults: false,
      specifyTextRequest: ''
    };
  },
  methods: {
    handleArrayUpdate(updatedArray) {
      this.parentArray = updatedArray;
      this.flatParrentArray = this.parentArray.flat()
      this.flatParrentArray.sort((a, b) => a[1] - b[1])
    },

    isOnSearchResults(isOnShowResults) {
      this.showSearchResults = isOnShowResults
      this.showSortsResults = isOnShowResults
    },

    sortChange(status) {
      this.showSortsResults = status
      this.showSearchResults = !status

    },
    clarifyRequest(specText) {
      this.$refs.childComponent4Spec.prepareSearch(specText)
    }

  },
}
</script>
<style>
.column--store {
    width: 120px;
}
.column--price {
    width: 120px;
}
.column--cover {
    width: 140px
}
.column--action {
    width: 120px;
}
</style>
