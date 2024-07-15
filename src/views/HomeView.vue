<template>

    <div>
        <h2>Visão Geral</h2>
        <p>O projeto consiste no desenvolvimento de um sistema de busca de endereços baseado em CEP (Código de Endereçamento Postal) utilizando as tecnologias Vue.js com Pinia (para o frontend) e consumindo uma API externa para construção dos dados. O sistema é dividido em duas partes principais: uma API externa para obter informações de endereço a partir de um CEP fornecido, e uma Single Page Application (SPA) em Vue.js que oferece uma interface amigável para interação do usuário.</p>

        <h2>Objetivo:</h2>
        <p>Criar uma SPA que permita aos usuários buscar informações de endereço fornecendo um CEP válido. O sistema
            deve ser fácil de usar, eficiente e fornecer uma experiência de usuário intuitiva.</p>

        <h2>Pesquisas recentes</h2>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="Data" width="180" />
            <el-table-column prop="query" label="CEP" width="180" />
            <el-table-column prop="info" label="Endereço" />
        </el-table>

        <div class="controls-container">
            <el-button type="danger" @click="handleClearData">Limpar Dados</el-button>
        </div>
    </div>

</template>

<script setup lang="ts">

import { onMounted, ref } from "vue";
import { LocalStorageUtils, type IDataItem } from "../utils/LocalStorageUtils";
const localStorageUtils = new LocalStorageUtils();
const tableData = ref<any>();

onMounted(() => {
    formatData();
})

function handleClearData() {
    localStorageUtils.clearAll();
    formatData();
}

function formatData() {
    const formatedData = localStorageUtils.data
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map(el => {
            const formated = new Date(el.date).toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            });

            return { ...el, date: formated };

        })
        .filter(el => !!el.query && !!el.info && !!el.date)

    tableData.value = formatedData;
}

</script>

<style lang="scss" scoped>
.controls-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 1vh;
}
</style>
