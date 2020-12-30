<template>
    <table class="table">
        <thead>
            <tr>
                <th v-for="(item, index) in columns" :key="index">{{ item.label }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(data, index) in dataSource" :key="index">
                <td v-for="(item, i) in columns" :key="i">
                    <component
                        :is="item.is"
                        v-if="item.is"
                        :row="data"
                        :value="data[item.prop]"
                        v-bind="item.props"
                    />
                    <span v-bind="item.props" v-else>{{ data[item.prop] }}</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "WTable",
    props: {
        columns: {
            type: Array,
            default() {
                return [];
            },
        },
        dataSource: {
            type: Array,
            default() {
                return [];
            },
        },
    },
};
</script>

<style lang="scss" scoped>
.table {
    width: 100%;
    color: #ffffff;
    text-align: center;
    border-collapse: collapse;
}
thead {
}

tbody {
}
</style>
