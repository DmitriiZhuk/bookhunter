<template>
    <div class="container mt-5">

        <div class="row">
            <div class="col">
                <h4>{{ shopName }} - результаты</h4>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'vShopHeader',
    props: {
        shopName: { type: String }
    },

}
</script>