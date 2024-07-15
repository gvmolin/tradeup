<template>

    <div class="conferir-container">
        <h2>Pesquisar por CEP</h2>
        <el-form ref="ruleFormRef" :model="form" :rules="rules" @submit.prevent>
            <el-form-item label="CEP" prop="cep">
                <div class="input-w-button">
                    <el-input label="Cep" style="margin-right: 1vh;" v-model="form.cep" :mask="['#####-###']"></el-input>
                    <el-button @click="searchCep(ruleFormRef)" type="primary">
                        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                    </el-button>


                </div>
            </el-form-item>

            <hr />
            <div v-if="!!data">
                <h2>Resultado</h2>
                <el-descriptions :column="3" border>
                    <el-descriptions-item v-for="key in Object.keys(data)" :label="key.toLocaleUpperCase()">{{ data[key].length ? data[key] : "-" }}</el-descriptions-item>

                </el-descriptions>
            </div>


        </el-form>


    </div>

</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElNotification } from 'element-plus';
import { LocalStorageUtils } from "../utils/LocalStorageUtils";
import axios from 'axios';

const form = ref<{ cep: string }>({ cep: "" });
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    cep: [
        { required: true, message: 'Campo obrigatório!', trigger: 'blur' },
        { min: 9, message: 'Preencha os oito digitos!', trigger: 'blur' },
    ],
});
const data = ref<any>(null);
const localStorageUtils = new LocalStorageUtils();

watch(() => form.value.cep, () => {
    form.value.cep = formatCEP(form.value.cep);
})

async function searchCep(formEl: FormInstance | undefined) {
    if (!!formEl) await formEl.validate(async (valid, fields) => {
        if (valid) {
            const sanitized = sanitizeCEP(form.value.cep);
            await axios.get(`https://viacep.com.br/ws/${sanitized}/json/`)
                .then(res => {
                    if (res.data.erro) {
                        ElNotification({
                            title: 'Erro',
                            type: "error",
                            message: 'CEP inválido, tente novamente',
                        })
                        data.value = null;
                    } else {
                        data.value = res.data;
                        localStorageUtils.insertData({ date: new Date(), query: form.value.cep, info: res.data.logradouro })

                    }


                })
                .catch(err => {
                    console.log(err);
                })

        } else {
            console.log('Erro de validaçao!', fields)
        }
    })
}

function sanitizeCEP(cep: string) {
    return cep.replace(/-/g, "");

}


function formatCEP(val: string): string {
    let result = val.replace(/\D/g, '');

    if (result.length >= 6) {
        result = result.slice(0, 5) + '-' + result.slice(5, 8);
    }

    return result;
}

</script>

<style lang="scss" scoped>
@import '/src/assets/variables.scss';

.input-w-button {
    display: flex;
    width: 100%;

}

hr {
    border-top: 1px solid #f1f1f1;
}
</style>
