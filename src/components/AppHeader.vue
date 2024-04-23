<script>
export default {
    data() {
        return {
            links: [
                { id: "/", active: true, name: "HOME" },
                { id: "/skills", active: false, name: "SKILLS" },
                { id: "/projects", active: false, name: "PROJECTS" },

            ]
        }
    },
    methods: {
        active(id) {
            this.links.forEach((link, i) => {
                link.active = (i === id);
            });
        }
    }

}
</script>

<template>
    <header>
        <div class="logo">
            <h2>Giacomo Franchi Portfolio</h2>
        </div>
        <ul class="links">
            <li v-for="(link, id) in links" :key="id">
                <router-link :to="link.id">
                    <a @click="active(id)" :class="{ active: link.active }">{{ link.name }}</a>
                </router-link>
            </li>
        </ul>
    </header>
</template>

<style lang="scss" scoped>
@use "../style/partials/mixin" as *;
@use "../style/partials/variables" as *;

header {
    width: 100vw;
    z-index: 9;
    background-color: $color-f;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    margin: 0;
    padding: 0 0.5rem;


    .logo {
        width: 50%;
        height: 10%;
        display: flex;
        align-items: center;
        color: black;
        @media screen and (max-width: 500px) {
            display: none;
        }

        h2 {
            font-size: 1.2rem;
            margin: 0;
            @media screen and (max-width: 768px) {
            font-weight: bold;
        }
        }

    }

    .links {
        width: 40%;
        height: 10%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: $color-f;
        list-style: none;
        padding-bottom: 0;
        margin: 0;
        
        @media screen and (max-width: 768px) {
            width: 50%;
            justify-content: space-around;
            margin-right: 1em;
        }

        @media screen and (max-width: 500px) {
            width: 90%;
            margin: 0 auto;
            padding: 0;
            margin: 0;
        }

        li {
            width: calc(100% / 3 );
            display: flex;
            align-items: center;
            justify-content: center;
            @media screen and (max-width: 768px) {
            width: 100%;
            padding: 0;
            justify-content: space-around;
        }
            a {
                text-decoration: none;
                color: black;
                font-size: 1.2rem;
                &.active {
                    color: $color-h;
                    list-style: lower-roman;
                }

                &:hover {
                    color: $bg-color;
                }
            }
        }

    }
}
</style>
