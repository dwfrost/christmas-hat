<template>
    <div class="snow-wrap"></div>
</template>
<script>
export default {
    name: 'snow',
    components: {},
    data() {
        return {}
    },
    methods: {}
}
</script>
<style lang="scss" scoped>
.snow-wrap {
    // 雪花
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: url('../assets/snow1.png'), url('../assets/snow2.png');
    -webkit-animation: snow 10s linear infinite;
    animation: snow 10s linear infinite;
    @keyframes snow {
        0% {
            background-position: 0 0, 0 0;
        }
        100% {
            background-position: 500px 1000px, 500px 500px;
        }
    }
    @-webkit-keyframes snow {
        0% {
            background-position: 0 0, 0 0;
        }
        100% {
            background-position: 500px 1000px, 500px 500px;
        }
    }
}
</style>
