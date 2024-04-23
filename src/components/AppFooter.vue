<script>
export default {
    data() {
        return {}
    }
}
</script>

<template>
    <footer>
        follow me
    </footer>
</template>

<style lang="scss" scoped>
@use "../style/partials/mixin" as *;
@use "../style/partials/variables" as *;

footer{
    width: 100%;
    padding: 1rem;
    background-color: $color-f;
    position: fixed;
    bottom: 0;
    color: black;
}
</style>