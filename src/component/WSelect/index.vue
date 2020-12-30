<template>
    <div class="select c-pointer" @click="show = !show" v-clickoutside="() => (show = false)">
        <div :class="{ 'select-placeholder': !current }">
            {{ (current && current.label) || placeholder }}
        </div>
        <div class="select-option-box" v-show="show">
            <div
                class="select-option-item"
                :class="{ 'select-option-item--active': value === item.value }"
                v-for="(item, index) in options"
                :key="index"
                @click="$emit('input', item.value)"
            >
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<script>
import clickoutside from "@/public/directive/clickoutside";

export default {
    name: "WSelect",
    directives: {
        clickoutside,
    },
    props: {
        options: {
            type: Array,
            default() {
                return [];
            },
        },
        value: [String, Number],
        placeholder: {
            type: String,
            default: "请选择...",
        },
    },
    data() {
        return {
            show: false,
        };
    },
    computed: {
        current() {
            return this.options.find((item) => item.value === this.value);
        },
    },
};
</script>

<style lang="scss" scoped>
.select {
}
.select-placeholder {
}
.select-option-box {
}
.select-option-item {
}
.select-option-item--active {
}
</style>
