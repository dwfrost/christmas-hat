<template>
    <div id="app">
        <Snow />
        <div class="title">
            <img src="./assets/bg.png" alt="" />
        </div>

        <!-- 照片区 -->
        <div class="img-top">
            <div class="img-border">
                <div class="made-img">
                    <!-- 大图 -->
                    <img class="img" :src="imgUrl" @click="showBorder = false" />
                    <!-- 素材区 -->
                    <div class="hat-con" v-show="showHat" @touchstart="showBorder = true">
                        <div class="hat-border" v-show="showBorder">
                            <div class="del" @touchmove="moveBar($event)">
                                <p class="bar">||</p>
                            </div>
                        </div>
                        <img class="imghat" :src="hatUrl" @touchstart="moveStart($event)" @touchmove="moveHat($event)" @touchend="moveEnd()" />
                    </div>
                </div>
            </div>

            <div class="button-group">
                <!-- accept属性限制上传文件类型 -->
                <input class="upload" type="file" @change="fileChange" accept="image/jpeg,image/png,image/jpg" />
                <a @click="drawCanvas">保存</a>
            </div>
        </div>

        <!-- 选择帽子 -->
        <div class="hat-box">
            <div class="hat-select">
                <div class="hat-border" :class="{ on: hatUrl === hat }" v-for="(hat, index) of hatLists" :key="index" @click="selectHat(hat)">
                    <img :src="hat" />
                </div>
            </div>
        </div>

        <!-- 生成图片 -->
        <div class="download" v-show="isProduce" @click="isProduce = false">
            <img :src="downLoadImgUrl" alt="" />
            <p>长按图片保存</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from 'vue'

import html2canvas from 'html2canvas'

import Snow from '@/components/Snow.vue'

// import hat1 from './assets/hat1.png'
const hat1 = new URL('./assets/hat1.png', import.meta.url).href
import hat2 from './assets/hat2.png'
import hat3 from './assets/hat3.png'
import hat4 from './assets/hat4.png'
import hat5 from './assets/hat5.png'

let imgUrl = ref('' as any)
let hatLists = [hat1, hat2, hat3, hat4, hat5]
let sPosition = {
    x: 0,
    y: 0
}
let dX = ref(0)
let dY = ref(0)
let moveX = ref(0)
let moveY = ref(0)
let scale = ref(1) //放大的尺寸
let showHat = ref(false)
let showBorder = ref(false)
let hatUrl = ref('')
let downLoadImgUrl = ref('')
let isProduce = ref(false)
let centerX = ref(0)
let centerY = ref(0)
let rotate = ref(0)

// 上传图片显示
const fileChange = (event: Event) => {
    console.log('event', event)
    event.preventDefault()
    let reader = new FileReader()
    const target = event.target as HTMLInputElement
    const img: File = (target.files as FileList)[0]
    console.log('img', img)
    reader.readAsDataURL(img)
    reader.onloadend = function () {
        imgUrl.value = reader.result
    }
}
// 保存图片生成canvas
const drawCanvas = () => {
    if (!imgUrl.value) {
        return
    }
    showBorder.value = false
    setTimeout(function () {
        const dom = document.querySelector('.made-img') as HTMLElement
        html2canvas(dom).then(canvas => {
            downLoadImgUrl.value = canvas.toDataURL('image/jpeg')
            isProduce.value = true
        })
    }, 0)
}
const moveStart = (e: any) => {
    e.preventDefault()
    sPosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    }
}
const moveHat = (e: any) => {
    e.preventDefault()
    let moveDom = document.querySelector('.hat-con') as HTMLElement
    moveX.value = e.touches[0].clientX - sPosition.x
    moveY.value = e.touches[0].clientY - sPosition.y

    moveDom.style.transform = `translateX(${dX.value + moveX.value}px) translateY(${dY.value + moveY.value}px) scale(${scale.value}) rotate(${
        rotate.value
    }deg)`
    moveDom.style.webkitTransform = `translateX(${dX.value + moveX.value}px) translateY(${dY.value + moveY.value}px) scale(${
        scale.value
    }) rotate(${rotate.value}deg)`
}
const moveEnd = () => {
    dX.value += moveX.value
    dY.value += moveY.value
    centerX.value += moveX.value
    centerY.value += moveY.value
}
const moveBar = (e: any) => {
    let moveDom = document.querySelector('.hat-con') as HTMLElement

    let rX = e.touches[0].clientX - centerX.value
    let rY = e.touches[0].clientY - centerY.value
    if (rX >= 0) {
        rotate.value = ((Math.atan(rY / rX) - Math.PI * 0.25) / Math.PI) * 180
    } else {
        rotate.value = ((Math.atan(rY / rX) + Math.PI * 0.75) / Math.PI) * 180
    }

    scale.value =
        Math.sqrt(Math.pow(e.touches[0].clientX - centerX.value, 2) + Math.pow(e.touches[0].clientY - centerY.value, 2)) / (Math.sqrt(2) * 50)

    if (scale.value < 0.5) {
        scale.value = 0.5
    }
    if (scale.value > 2) {
        scale.value = 2
    }

    moveDom.style.transform = `translateX(${dX.value}px) translateY(${dY.value}px) scale(${scale.value}) rotate(${rotate.value}deg)`
    moveDom.style.webkitTransform = `translateX(${dX.value}px) translateY(${dY.value}px) scale(${scale.value}) rotate(${rotate.value}deg)`
    // moveDom.style.transform = `rotate(${rotate}deg)`;
}
// 还原样式
const clearHat = () => {
    let moveDom = document.querySelector('.hat-con') as HTMLElement
    moveDom.style.webkitTransform = ''
    moveDom.style.transform = ''
    dX.value = 0
    dY.value = 0
    moveX.value = 0
    moveY.value = 0
    scale.value = 1
    rotate.value = 0
}
const selectHat = (hat: string) => {
    // if (!imgUrl.value) {
    //     return
    // }
    showHat.value = true
    showBorder.value = true
    hatUrl.value = hat
    clearHat()
    let moveDom = document.querySelector('.hat-con') as HTMLElement
    let delDom = document.querySelector('.del') as HTMLElement
    setTimeout(function () {
        centerY.value = (delDom.getBoundingClientRect().top + moveDom.getBoundingClientRect().top + 10) / 2
        centerX.value = (delDom.getBoundingClientRect().left + moveDom.getBoundingClientRect().left + 10) / 2
        // alert(delDom.getBoundingClientRect().x);
    }, 0)
}
</script>

<style lang="scss">
$red: #cd0000;
body,
html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0;
    margin-top: 30px;
    padding: 0;
    height: 100%;
    .title {
        img {
            position: fixed;
            margin-top: -30px;
            z-index: -1;
            width: 100%;
            // height: 100%;
        }
    }
    .img-top {
        width: 300px;
        margin: 0 auto;
        .img-border {
            display: block;
            width: 300px;
            height: 300px;
            border: 3px solid #ddd;
            background: #fff;
            border-radius: 5px;
            box-sizing: border-box;
            overflow: hidden;
            position: relative;
            .img {
                max-width: 300px;
                min-height: 300px;
                overflow: hidden;
                clip: rect(0, 0, 300px, 300px);
            }
            .hat-con {
                position: absolute;
                z-index: 10;
                top: 50%;
                left: 50%;
                width: 100px;
                height: 100px;
                margin: -50px 0 0 -50px;
                .hat-border {
                    position: absolute;
                    border: 1px dashed #000;
                    width: 100px;
                    height: 100px;
                    .del {
                        position: absolute;
                        z-index: 5;
                        bottom: -25px;
                        right: -25px;
                        width: 50px;
                        height: 50px;
                        // background: #ddd;
                        transform: scale(1) !important;
                        .bar {
                            background: #000;
                            border-radius: 50%;
                            width: 20px;
                            height: 20px;
                            line-height: 20px;
                            margin: 0 auto;
                            margin-top: 15px;
                            color: #fff;
                            text-align: center;
                            font-size: 12px;
                        }
                    }
                }
                .imghat {
                    position: absolute;
                    width: 100px;
                    height: 100px;
                }
            }

            canvas {
                width: 300px;
                height: 300px;
            }
        }
        .button-group {
            margin-top: 20px;
            .upload {
                position: relative;
                width: 180px;
                height: 40px;
                border: 2px solid #fff;
                // margin-right: 15px;
                &::after {
                    content: '上传图片';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 190px;
                    height: 40px;
                    display: block;
                    cursor: pointer;
                    background: #586f80;
                    // border: 2px solid #fff;
                    color: #fff;
                    text-align: center;
                    line-height: 40px;
                    border-radius: 5px;
                }
            }
            a {
                display: inline-block;
                width: 100px;
                height: 40px;
                float: right;
                background: #586f80;
                border: 2px solid #fff;
                color: #fff;
                text-align: center;
                border-radius: 5px;
                line-height: 40px;
            }
        }
    }
    .hat-box {
        width: 100%;
        height: 150px;
        overflow: hidden;
        // border-bottom: 1px solid #586f80;

        .hat-select {
            margin-top: 10px;
            width: auto;
            height: 140px;
            // border-top: 2px solid #000;
            // background: #fff;
            overflow-x: scroll;
            overflow-y: hidden;
            .hat-border {
                width: 100px;
                height: 100px;
                display: table-cell;
                &.on img {
                    border-color: #ba2828;
                }
                img {
                    border-radius: 5px;
                    margin: 10px;
                    padding: 5px;
                    box-sizing: border-box;
                    border: 2px solid #fff;
                    background: #d8e1f1;
                    width: 100px;
                    height: 100px;
                }
            }
        }
    }
    .download {
        height: 100%;
        width: 100%;
        background: rgba(1, 1, 1, 0.7);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 12;
        text-align: center;
        img {
            width: 300px;
            height: 300px;
            border: 2px solid #fff;
            margin-top: 30px;
        }
        p {
            width: 6em;
            margin: 50px auto;
            color: #fff;
        }
    }
}
</style>
