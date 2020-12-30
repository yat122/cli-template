<template>
    <div class="checkbox">
        <div
            class="checkbox-item"
            :class="{ 'checkbox-item--active': value === item.value }"
            v-for="(item, index) in options"
            :key="index"
            @click="$emit('input', item.value)"
        >
            {{ item.label }}
        </div>
    </div>
</template>

<script>
export default {
    name: "WCheckbox",
    props: {
        options: {
            type: Array,
            default() {
                return [];
            },
        },
        value: [String, Number],
    },
};
</script>

<style lang="scss" scoped>
.checkbox {
    display: inline-block;
}
.checkbox-item {
    cursor: pointer;
}
.checkbox-item--active {
}
</style>
