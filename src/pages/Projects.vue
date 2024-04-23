<script>
export default {
  data() {
    return {
      projects: [
        {
          nome: "FliPhone",
          img: "FliPhone.png",
          link: "fliphone",
          descrizione: "Questo gioco registra i dati del sensore dopo aver premuto il pulsante e riporta il flip effettuato dal tuo telefono. Lancia in aria il tuo dispositivo e prova a eseguire un flip!"
        },
        {
          nome: "Presto in arrivo",
          img: "bg-spazio.jpg",
          link: "presto-in-arrivo",
          descrizione: "Descrizione del progetto Presto in arrivo."
        },
        {
          nome: "Presto in arrivo",
          img: "bg-spazio.jpg",
          link: "presto-in-arrivo",
          descrizione: "Descrizione del progetto Presto in arrivo."
        },        {
          nome: "Presto in arrivo",
          img: "bg-spazio.jpg",
          link: "presto-in-arrivo",
          descrizione: "Descrizione del progetto Presto in arrivo."
        },
      ]
    };
  },
  methods: {
    getUrl(path) {
      return new URL(`../assets/${path}`, import.meta.url);
    }
  }
}
</script>

<template>
  <div class="container">
    <h1>I MIEI PROGETTI</h1>
    <div class="row">
      <div v-for="project in projects" :key="project.nome" class="col col-xs-12 col-sm-6 col-lg-4">
        <router-link :to="project.link">
          <div class="card">
            <img :src="getUrl(project.img)" :alt="`Immagine progetto ${project.nome}`">
            <div class="card-body-x">
              <p class="card-text">{{ project.descrizione }}</p>
            </div>
            <span class="titolo">{{ project.nome }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
@use "../style/partials/mixin" as *;
@use "../style/partials/variables" as *;
.container {
  max-width: 100%;
  max-height: 100%;
  background-color: $bg-color;
  overflow: auto;

  h1 {
    margin-bottom: 1.5rem;
    text-align: center;
    color: #000000;
  }

  .row {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;

    .col {
      margin-bottom: 1rem;

      .card {
        height: 100%;
        position: relative;
        border-radius: 15px; 
        .card-body-x {
          display: none;
          position: absolute;
          bottom: 0;
          width: 100%;
          background-color: rgba($color: #000000, $alpha: 0.8);
          color: white;
          padding: 0.5em;
          border-radius: 0 0 15px 15px;
        }
        &:hover{
          .card-body-x{
            display: block;
          }
          .titolo{
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 15px;
            text-align: center;
            font-weight: bold;
            font-size: 1rem;
            color: white;
          }
        }
        img {
          height: 100%;
          border-radius: 15px; 
        }
        .titolo{
          background-color: rgba($color: #000000, $alpha: 0.8);
          position: absolute;
          right: 0;
          padding: 0.5rem;
          border-radius:0  15px;
          text-align: center;
            font-weight: bold;
            font-size: 1rem;
            color: white;
        }
      }
    }
  }
}

</style>