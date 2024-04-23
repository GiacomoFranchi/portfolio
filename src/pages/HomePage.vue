<script>



export default {
    data() {
        return {
        };
    },
    components: {

    },
    methods: {
        active(id){
            this.links.forEach((link, i) => {
                link.active = (i === id);
            });
        }
    }
}
</script>

<template>
    <main class="container">
        <h1>Giacomo Franchi Portfolio</h1>
        <div class="row">
            <div class="info">
                <p>
                    Benvenuti nel mio portfolio! Sono Giacomo Franchi, un appassionato Full-Stack Web Developer con
                    sede a Milano. Attraverso il mio sito, vi invito a esplorare il mio lavoro. Dalla progettazione
                    di siti web responsive all' implementazione di robusti backend, ho affinato le mie competenze per
                    offrire esperienze digitali coinvolgenti e funzionali. Scoprite i miei progetti e contattatemi
                    per trasformare le vostre idee in realtà digitali.
                </p>
            </div>
        </div>



    </main>
</template>

<style lang="scss" scoped>
@use "../style/partials/mixin" as *;
@use "../style/partials/variables" as *;
@import '../style/partials/mixin';

@keyframes float {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-20px);
  }
  100% {
    transform: translatey(0px);
  }
}

.container {
    max-width: 100%;
    background-color: $bg-color;
    text-align: center;
    padding: 3rem 2rem;
    overflow-x: auto;

    h1 {
        font-size: 3rem;
        color: $color;
        margin-bottom: 2.5rem;
        animation: float 6s ease-in-out infinite;
    }

    .row{
        width: 80%;
        margin: 0 auto;
        margin-bottom: 2.5rem;
        background-color:$color-h;
        padding: 2rem;
        border-radius: 15px;
        border: 2px solid $color-f;
        box-shadow: 0 5px 15px 0px;
        p{
            font-size: 1.5rem;
            background-color: $color-h;
            @media screen and (max-width: 500px) {
                font-size: 1rem;
            }
        }
    }

}
</style>