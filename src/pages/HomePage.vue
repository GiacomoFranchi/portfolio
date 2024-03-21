<script>



export default {
    data(){
        return{
        };
    },
    components:{
    
    },
    methods:{
        
    },
}
</script>

<template>
    <main>
        <h1>Giacomo Franchi Portfolio</h1>
        <container>
            <div class="row">
                <div class="img-box">
                        <img src="../assets/avatar-g.png" alt="avatar Giacomo"> 
                </div>
                <div class="info">
                    <p>
                        Benvenuti nel mio portfolio! Sono Giacomo Franchi, un appassionato Full-Stack Web Developer con sede a Milano. Attraverso il mio sito, vi invito a esplorare il mio lavoro. Dalla progettazione di siti web responsive all'implementazione di robusti backend, ho affinato le mie competenze per offrire esperienze digitali coinvolgenti e funzionali. Scoprite i miei progetti e contattatemi per trasformare le vostre idee in realtà digitali.
                    </p>
                </div>
            </div>
        </container>
        <div class="btn-zone">
            <router-link to="/AboutMe">
                <button class="btn">About Me</button>
            </router-link>
            <router-link to="/Projects">
                <button class="btn">Progetti</button>
            </router-link>
        </div>

    </main>
</template>
    
<style lang="scss" scoped>
@use "../style/partials/mixin" as *;
@use "../style/partials/variables" as *;
@import '../style/partials/mixin';
main{
    h1{
        margin-bottom: 0.5em;
        color: $color ;
        font-size: 3rem;
    }
    text-align: center;
    width: 100vw;
    height: 90vh;
    background-color:$bg-color;
    padding: 2em 0;
    container{
        .row{
        height: 60%;
        width: 80%;
        margin: 0 auto;
        display: flex;

        justify-content: flex-start;
        align-items: stretch;
        border: 1px solid $color;
        border-radius: 15px;
        background-color: $color-f;
        .img-box{
            width: 30%;
            height: 100%;

            img{
                height: 100%;
                border-radius: 15px;
            }
        }
        .info{
            min-width: 70%;
            height: 100%;
            text-align: left;
            padding: 1em;
            display: flex;
            align-items: center;
           p{
            color: $color;
            font-family: "Tilt Neon", sans-serif;
            font-size: 1.5em;
            }
        }
    }
    }
    .btn-zone{
        width: 20%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn{
            @include btn($color-f, $color, $color-h, 15px, 1rem );
            margin-top: 2rem;
        }
    }
}

</style>
    