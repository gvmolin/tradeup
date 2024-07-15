<template>
    <header>
        <div :class="`container ${menuStore.active ? '' : 'hidden'}`">

            <div>
                <LogoComponent></LogoComponent>
                <nav>
                    <RouterLink to="/">Home</RouterLink>
                    <RouterLink to="/conferirCep">Consultar</RouterLink>

                    <el-button @click="menuStore.swapActive" type="primary" class="swap-button" style="color: black;">
                        <span>
                            <font-awesome-icon class="arrow-icon" :icon="['fas', 'arrow-left']" />
                        </span>
                    </el-button>
                </nav>


            </div>



            <div>
                <img src="/logo2.png">
                <p>Desafio TradeUp - Gabriel Molin 2024</p>
            </div>

        </div>


    </header>

</template>

<script lang="ts" setup>
import LogoComponent from '../Logo/LogoComponent.vue';
import { useMenuStore } from '../../stores/menu';
import { RouterLink } from 'vue-router'
import { ref, watch } from 'vue';

const menuStore = useMenuStore();

watch(() => menuStore.active, () => {
    if (!!menuStore.active) {

    }

})


</script>

<style lang="scss" scoped>
@import '/src/assets/variables.scss';


header {
    position: relative;
}

.container {
    position: fixed;
    top: 0;
    left: 0;
    width: $menuWidth;
    height: 100vh;
    background-color: $color3;
    padding: $defaultPadding;
    transition: 1s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    img {
        height: 5vh;
    }

    a {
        text-decoration: none;
        color: $color4;
        margin-bottom: 1vh;
    }

    a.router-link-exact-active {
        color: $color1;
    }

    nav {
        display: flex;
        flex-direction: column;

        .swap-button {
            color: $color4 !important;
            position: absolute;
            top: 0;
            right: 0;
            margin: $defaultPadding;
            margin-top: 4.2vh;
        }
    }

    p {
        font-size: 9px;
        padding-bottom: 4vh;
    }

    .arrow-icon {
        transition: transform 1s;
    }
}

.hidden {
    left: $hiddenMenu;
    transition: 1s;

    &::before {
        transition: 1s;
    }

    .arrow-icon {
        transform: rotate(-180deg);
        transition: transform 1s;
    }
}
</style>