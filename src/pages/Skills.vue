<script>

export default {
    data() {
        return {
            subjects: [
                { name: "CSS", id: 1, class: "fa-brands fa-css3-alt" },
                { name: "Bootstrap", id: 2, class: "fa-brands fa-bootstrap" },
                { name: "Vue.js", id: 3, class: "fa-brands fa-vuejs" },
                { name: "JavaScript", id: 4, class: "fa-brands fa-js" },
                { name: "MySQL", id: 5, class: "fa-solid fa-database" },
                { name: "PHP", id: 6, class: "fa-brands fa-php" },
                { name: "Laravel", id: 7, class: "fa-brands fa-laravel" },
                { name: "Figma", id: 8, class: "fa-brands fa-figma" },
            ]
        };
    },
    components: {

    },
    methods: {

    },
}
</script>

<template>
    <div class="container">
        <p class="parag">
            Ho sviluppato le mie competenze tecniche seguendo un corso intensivo di 700 ore, durante le quali ho
            partecipato a lezioni teoriche e
            pratiche e dove ho appreso le basi della programmazione front-end, back-end e l'utilizzo di MySQL così come
            i principali strumenti di sviluppo.
        </p>
        <div class="orb-cont">
            <div class="center">
                <i class="fa-brands fa-html5">
                    <span class="txt-m">HTML</span>
                </i>
            </div>
            <div class="box" v-for="subject in subjects">
                <i class="rotate" :class="`r${subject.id} ${subject.class}`">
                    <span class="txt-m">{{ subject.name }}</span>
                </i>
            </div>
            <div class="orb orb1"></div>
            <div class="orb orb2"></div>
            <div class="orb orb3"></div>
            <div class="orb orb4"></div>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
@use "../style/partials/mixin" as *;
@use "../style/partials/variables" as *;

@keyframes myOrbit1 {
    from {
        transform: rotate(0deg) translateX(100px) rotate(0deg);
    }

    to {
        transform: rotate(-360deg) translateX(100px) rotate(360deg);
    }
}

@keyframes myOrbit2 {
    from {
        transform: rotate(0deg) translateX(-100px) rotate(0deg);
    }

    to {
        transform: rotate(-360deg) translateX(-100px) rotate(360deg);
    }
}

@keyframes myOrbit3 {
    from {
        transform: rotate(0deg) translateX(-150px) rotate(0deg);
    }

    to {
        transform: rotate(360deg) translateX(-150px) rotate(-360deg);
    }
}

@keyframes myOrbit4 {
    from {
        transform: rotate(0deg) translateX(150px) rotate(0deg);
    }

    to {
        transform: rotate(360deg) translateX(150px) rotate(-360deg);
    }
}

@keyframes myOrbit5 {
    from {
        transform: rotate(0deg) translateX(-200px) rotate(0deg);
    }

    to {
        transform: rotate(-360deg) translateX(-200px) rotate(360deg);
    }
}

@keyframes myOrbit6 {
    from {
        transform: rotate(0deg) translateX(200px) rotate(0deg);
    }

    to {
        transform: rotate(-360deg) translateX(200px) rotate(360deg);
    }
}

@keyframes myOrbit7 {
    from {
        transform: rotate(0deg) translateX(-260px) rotate(0deg);
    }

    to {
        transform: rotate(360deg) translateX(-260px) rotate(-360deg);
    }
}

@keyframes myOrbit8 {
    from {
        transform: rotate(0deg) translateX(260px) rotate(0deg);
    }

    to {
        transform: rotate(360deg) translateX(260px) rotate(-360deg);
    }
}
.orb{
    border-radius: 50%;
    border: 2px dotted $color;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.orb1{
    height: 190px;
    width: 190px;
}
.orb2{
    height: 285px;
    width: 285px;
}
.orb3{
    height: 390px;
    width: 390px;
}
.orb4{
    height: 500px;
    width: 500px;
}

.container {
    max-width: 100%;
    background-image: url(../assets/spazio-bg.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow-y: auto;
    @media screen and (max-width: 500px) {
        overflow-y: auto;
        display: flex;
        justify-content: center;
        padding: 3rem 1rem;
    }
    .parag {
            position: absolute;
            top: 15%;
            left: 3%;
            width: 25%;
            color: white;
            text-align: center;
            align-self: center;
            justify-content: center;
            background-color: $color-h;
            opacity: 0.8;
            border-radius: 15px;
            padding: 1em 0.5em;
            @media screen and (max-width: 500px) {
                display: none;
            }
        }
    .orb-cont {
        width: 100%;
        height: 100%;
        padding: 8rem 0;
        @media screen and (max-width: 500px) {
            width: 100%;
            position: relative;
        }
      
        .center {
            width: 100px;
            height: 100px;
            position: absolute;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
            z-index: 999;
            

            i {
                color: red;
                font-size: 3rem;
                position: absolute;
                width: 100%;
                margin: auto;
                display: flex;
                align-items: center;
                justify-content: center;
                padding-top:10px ;
                flex-direction: column;
            }
            .txt-m {
                    font-size: 1.5rem;
                    display: block;
                }
        }

        .box {
            width: 50px;
            height: 50px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-100%, -100%);


            .rotate {
                display: flex;
                flex-direction: column;
                align-items: center;
                border: 1px solid $color-f;
                background-color: $color-h;
                opacity: 0.5;
                padding: 0.5em 0.5em;
                border-radius: 50%;
                z-index: 999;
                .txt-m {
                    font-size: 0.8rem;
                    display: block;
                }
            }

            .r1 {
                animation: myOrbit1 6s linear infinite;
            }

            .r2 {
                animation: myOrbit2 6s linear infinite;
            }

            .r3 {
                animation: myOrbit3 10s linear infinite;
            }

            .r4 {
                animation: myOrbit4 10s linear infinite;
            }

            .r5 {
                animation: myOrbit5 13s linear infinite;
            }

            .r6 {
                animation: myOrbit6 13s linear infinite;
            }

            .r7 {
                animation: myOrbit7 16s linear infinite;
            }

            .r8 {
                animation: myOrbit8 16s linear infinite;
            }

            i {
                font-size: 1.8rem;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: pink;
            }
        }

        .r-link {
            position: absolute;
            bottom: 75px;
            left: 20px;
        }
    }
}
</style>