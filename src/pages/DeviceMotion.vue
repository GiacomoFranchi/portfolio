<script>
export default {
  data() {
    return {
      motionData: {
        rotationRate: null,
        accelerationIncludingGravity: null
      },
      error: null,
      isRecording: false,
      initialAlpha: null,
      initialBeta: null,
      initialGamma: null,
      flipXDetected: false,
      flipYDetected: false,
      flipZDetected: false,
      directionX: false,
      directionY: false,
      directionZ: false,
      scaricoResp: false,
    };
  },
  computed: {
    isScreenLarge() {
      return window.innerWidth > 800;
    }
  },
  methods: {
    getUrl(path) {
      return new URL(`../assets/${path}`, import.meta.url);
    },
    hideOverlay() {
      this.scaricoResp = true;
    },
    startRecording() {
      if ('permissions' in navigator) {
        navigator.permissions.query({ name: 'accelerometer' }).then(permissionStatus => {
          if (permissionStatus.state === 'prompt' || permissionStatus.state === 'denied') {
            navigator.permissions.request({ name: 'accelerometer' }).then(newPermissionStatus => {
              console.log('Nuovo stato del permesso accelerometro:', newPermissionStatus.state);
            });
          }

          if (permissionStatus.state === 'granted') {
            this.isRecording = true;
            this.initialAlpha = null;
            this.initialBeta = null;
            this.initialGamma = null;
            this.flipXDetected = false;
            this.flipYDetected = false;
            this.flipZDetected = false;

            setTimeout(() => {
              this.isRecording = false;
              if (!this.flipXDetected && !this.flipYDetected && !this.flipZDetected) {
                console.log("Nessun flip rilevato.");
              }
            }, 3000); // Registra i dati per 3 secondi

            window.addEventListener('devicemotion', this.handleDeviceMotion, false);
          }
        }).catch(error => {
          // Mostra un messaggio di errore se si verifica un problema con i sensori
          console.error('MI SPIACE AL MOMENTO IL SITO È DISPONIBILE SOLO PER ANDROID SU CHROME :', error);
          this.error = "MI SPIACE AL MOMENTO IL SITO È DISPONIBILE SOLO PER ANDROID SU CHROME: " + error.message;
        });
      } else {
        console.error('MI SPIACE AL MOMENTO IL SITO È DISPONIBILE SOLO PER ANDROID SU CHROME');
        this.error = "MI SPIACE AL MOMENTO IL SITO È DISPONIBILE SOLO PER ANDROID SU CHROME";
      }
    },

    stopRecording() {
      window.removeEventListener('devicemotion', this.handleDeviceMotion);
    },
    handleDeviceMotion(eventData) {
      this.motionData = {
        rotationRate: eventData.rotationRate,
        accelerationIncludingGravity: eventData.accelerationIncludingGravity
      };

      if (this.isRecording) {
        if (this.initialAlpha === null) {
          this.initialAlpha = eventData.rotationRate.alpha;
          this.initialBeta = eventData.rotationRate.beta;
          this.initialGamma = eventData.rotationRate.gamma;
          this.initialAcc = eventData.accelerationIncludingGravity;
        } else {
          let rotationX = eventData.rotationRate.alpha - this.initialAlpha;
          let rotationY = eventData.rotationRate.beta - this.initialBeta;
          let rotationZ = eventData.rotationRate.gamma - this.initialGamma;

          let accelerationX = eventData.accelerationIncludingGravity.x - this.initialAcc.x;
          let accelerationY = eventData.accelerationIncludingGravity.y - this.initialAcc.y;
          let accelerationZ = eventData.accelerationIncludingGravity.z - this.initialAcc.z;

          let angularSpeedThreshold = 50; // Velocità angolare minima per considerare un flip
          let accelerationThreshold = 0; // Accelerazione minima per considerare un flip
          let orientationThreshold = 25; // Angolo minimo di cambiamento dell'orientamento per considerare un flip

          if (
            Math.abs(rotationX) >= angularSpeedThreshold &&
            Math.abs(rotationY) >= angularSpeedThreshold &&
            Math.abs(rotationZ) >= angularSpeedThreshold &&
            Math.abs(accelerationX) >= accelerationThreshold &&
            Math.abs(accelerationY) >= accelerationThreshold &&
            Math.abs(accelerationZ) >= accelerationThreshold &&
            (Math.abs(rotationX) >= orientationThreshold ||
              Math.abs(rotationY) >= orientationThreshold ||
              Math.abs(rotationZ) >= orientationThreshold)
          ) {
            // Considera un flip solo se si verifica contemporaneamente una rotazione significativa su tutti gli assi,
            // un aumento significativo dell'accelerazione e un cambiamento significativo nell'orientamento del dispositivo.
            console.log("Flip rilevato!");
            if (Math.abs(rotationX) >= 340) {
              this.flipXDetected = true;
              this.directionX = rotationX >= 0;
              console.log(`Flip sull'asse X rilevato! Direzione: ${this.directionX ? 'positiva' : 'negativa'}`);
              this.initialAlpha = eventData.rotationRate.alpha;
            }
            if (Math.abs(rotationY) >= 340) {
              this.flipYDetected = true;
              this.directionY = rotationY >= 0;
              console.log(`Flip sull'asse Y rilevato! Direzione: ${this.directionY ? 'positiva' : 'negativa'}`);
              this.initialBeta = eventData.rotationRate.beta;
            }
            if (Math.abs(rotationZ) >= 340) {
              this.flipZDetected = true;
              this.directionZ = rotationZ >= 0;
              console.log(`Flip sull'asse Z rilevato! Direzione: ${this.directionZ ? 'positiva' : 'negativa'}`);
              this.initialGamma = eventData.rotationRate.gamma;
            }
          }

          // Resetta i valori iniziali per consentire il rilevamento di ulteriori flip
          this.initialAlpha = eventData.rotationRate.alpha;
          this.initialBeta = eventData.rotationRate.beta;
          this.initialGamma = eventData.rotationRate.gamma;
          this.initialAcc = eventData.accelerationIncludingGravity;
        }
      }
    }
  },
  // Riprodurre l'audio alla fine della registrazione
  playAudioAtEndOfRecording() {
    // Riproduci l'audio solo se è stato rilevato un flip
    if (this.flipXDetected && this.directionX) {
      this.$refs.audioFrontflip.play();
    }
    if (this.flipXDetected && !this.directionX) {
      this.$refs.audioBackflip.play();
    }
    if (this.flipYDetected && this.directionY) {
      this.$refs.audioKickflip.play();
    }
    if (this.flipYDetected && !this.directionY) {
      this.$refs.audioFrontflip.play();
    }
    if (this.flipZDetected && this.directionZ) {
      this.$refs.audio360Spin.play();
    }
    if (this.flipZDetected && !this.directionZ) {
      this.$refs.audio360Backspin.play();
    }
    if (!this.flipXDetected && !this.flipYDetected && !this.flipZDetected) {
      this.$refs.audioNoflip.play();
    }
    // Ripeti lo stesso per gli altri tipi di flip
  },

  beforeDestroy() {
    this.playAudioAtEndOfRecording(); //riprodurre l'audio alla fine della registrazione
    this.stopRecording(); // Rimuovi l'evento quando il componente viene distrutto
  }
};
</script>



<template>
  <div class="container">
    <!--AVVISO PER COMPUTER-->
    <div class="pc-size" v-if="isScreenLarge">
      <div class="txt-warn">
        <h1 class="warn-title">
          <i class="fa-solid fa-triangle-exclamation fa-flip" style="color: #dd1313;"></i>
          ATTENZIONE
          <i class="fa-solid fa-triangle-exclamation fa-flip" style="color: #dd1313;"></i>
        </h1>
        <h2>
          <div class="fl-logo"><img :src="getUrl(`fliphone-svg.png`)" :alt="`logo FliPhone`"></div> è disponibile solo
          su smartphone o tablet.
        </h2>
        <p class="txt-descr">
          <hr>
          Per goderti appieno l'esperienza interattiva di
        <div class="fl-logo-s"><img :src="getUrl(`fliphone-svg.png`)" :alt="`logo FliPhone`"></div>, è necessario
        utilizzare
        uno smartphone o un tablet, poiché il gioco richiede la lettura dei dati del giroscopio per garantire un
        coinvolgimento ottimale. <br> Sfruttando le potenzialità dei sensori integrati nei dispositivi mobili, <div
          class="fl-logo-s"><img :src="getUrl(`fliphone-svg.png`)" :alt="`logo FliPhone`"></div> offre un'esperienza
        dinamica che si adatta ai tuoi movimenti e
        all'orientamento del dispositivo.
        <br>
        Ti invitiamo a esplorare <div class="fl-logo-s"><img :src="getUrl(`fliphone-svg.png`)" :alt="`logo FliPhone`">
        </div> utilizzando uno smartphone o un tablet e
        lasciarti trasportare in un'avventura coinvolgente e immersiva.
        <br> Grazie per la comprensione e buon divertimento!
        <hr>
        </p>
      </div>
    </div>

    <!--AVVISO PER GIOCATORI-->
    <div class="game-size" v-else v-if="!scaricoResp">
      <div>
        <h1><i class="fa-solid fa-triangle-exclamation fa-flip" style="color: #dd1313;"></i>
          PRESTARE MOLTA ATTENZIONE
          <i class="fa-solid fa-triangle-exclamation fa-flip" style="color: #dd1313;"></i>
        </h1>

        <h5>Questo gioco coinvolge il lancio del telefono e richiede estrema attenzione. <br> Gli utenti partecipano a
          loro rischio e pericolo.</h5>

        <span class="span">Precauzioni:</span>
        
          <p>
            <strong>1.</strong> Assicurarsi di avere un'area sicura: Prima di lanciare il telefono, verificare che l'area circostante sia
            priva di ostacoli o persone.
            <br>    
            <strong>2.</strong> Monitorare il telefono durante il volo: Prestare attenzione al telefono durante il volo per evitare
            eventuali
            danni o lesioni.
            <br>      
            <strong>3.</strong> Impugnare saldamente il telefono: Assicurarsi di tenere il telefono in modo sicuro e saldamente prima del
            lancio.
            <br>      
            <strong>4.</strong> Evitare lanci troppo forti che potrebbero compromettere la sicurezza del telefono o causare danni a persone
            o
            cose circostanti.
          </p>     
        <h6>
          Esclusione di Responsabilità:
        </h6>
        <p>
          Gli organizzatori del gioco non sono responsabili per eventuali danni personali,
          danni materiali o perdita di dati causati dal partecipare a questo gioco. Gli utenti sono responsabili della
          propria sicurezza e dell'integrità del proprio telefono durante il gioco.
          Partecipando a questo gioco, gli utenti accettano di esonerare gli organizzatori e gli sviluppatori da
          qualsiasi
          responsabilità legale derivante dall'utilizzo del telefono durante il gioco.
        </p>
      </div>
      <button class="btn btn-primary" @click="hideOverlay">ACCETTO</button>
    </div>
    <!--SCHERMATA DI GIOCO-->
    <div class="game">
      <div class="info">
        <p v-if="isRecording">Registrazione attiva...</p>
        <p v-else>
          Questo Gioco registra i dati del sensore dopo aver premuto il pulsante e riporta il flip effettuato dal tuo
          telefono.
          Lancia in aria il tuo dispositivo e prova a eseguire un flip!
        </p>
      </div>
      <!--BOTTONE AVVIO-->
      <button class="btn btn-danger" @click="startRecording" :disabled="isRecording">Avvia registrazione</button>

      <div v-if="error !== null" class="error-message">{{ error }}</div>

      <div class="risult-box">
        <div v-if="flipXDetected && directionX">
          <p>frontflip</p>
          <audio ref="audioFrontflip" src="../public/audio/frontflip.m4a" autoplay></audio>
        </div>
        <div v-if="flipXDetected && !directionX">
          <p>backflip</p>
          <audio ref="audioBackflip" src="../public/audio/backflip.m4a"></audio>
        </div>
        <div v-if="flipYDetected && directionY">
          <p>kickflip</p>
          <audio ref="audioKickflip" src="../public/audio/kickflip.m4a"></audio>
        </div>
        <div v-if="flipYDetected && !directionY">
          <p>heelflip</p>
          <audio ref="audioHeelflip" src="../public/audio/heelflip.m4a"></audio>
        </div>
        <div v-if="flipZDetected && directionZ">
          <p>360 spin</p>
          <audio ref="audio360Spin" src="../public/audio/360spin.m4a"></audio>
        </div>
        <div v-if="flipZDetected && !directionZ">
          <p>360 backspin</p>
          <audio ref="audio360Backspin" src="../public/audio/360backspin.m4a"></audio>
        </div>
        <div v-if="!flipXDetected && !flipYDetected && !flipZDetected">
          <p>Nessun flip</p>
          <audio ref="audioNoflip" src="../public/audio/noflip.m4a"></audio>
        </div>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
@use "../style/partials/mixin" as *;
@use "../style/partials/variables" as *;

.container {
  max-width: 100vw;
  height: 100vh;
  margin: 0;
  position: fixed;
  z-index: 10;
  background-image: url(../assets/Flbkg.png);
  background-position:top;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 801px) {
    background-image: url(../assets/Flbkgxl.png);
    background-position:top;
        }

  .pc-size {
    max-width: 80%;
    height: 80%;
    background-color: beige;
    text-align: center;
    display: flex;
    align-items: center;
    padding: 2rem 1.5rem;
    border-radius: 15% 30%;
    position: absolute;
    margin: 0;
    z-index: 999;

    .txt-warn {

      .warn-title {
        color: red;

        i {
          margin: 0 0.5em;
        }
      }

      .fl-logo {
        display: inline;

        img {
          height: 40px;
          ;
        }
      }

      .txt-descr {
        text-align: center;
        padding: 0 2rem;
        font-weight: 500;

        .fl-logo-s {
          display: inline;

          img {
            height: 20px;
            ;
          }
        }
      }
    }
  }

  .game-size {
    max-width: 80%;
    height: 80%;
    overflow: auto;
    background-color: beige;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1.5rem;
    border-radius: 15%;
    position: absolute;
    margin: 0;
    z-index: 999;

    .span {
      font-weight: bold;
      text-align: left;
    }

    .btn {
      margin: 0 auto;
    }

  }

  .game {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 30%;

    .info {
      width: 50%;
      margin: 0 auto;
      text-align: center;
      font-weight: bold;
    }
    .btn{
      width: 50%;
      margin: 0 auto;
    }
    .error-message {
      background-color: rgba(0, 0, 0, 0.8);
      border: 1px solid red;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0.5rem auto;
      flex-direction: column;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      font-weight: bold;
      color: chocolate;
    }

    .risult-box{
      background-color: rgba(0, 0, 0, 0.8);
      border: 1px solid red;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0.5rem auto;
      flex-direction: column;
      padding: 0.5rem 1rem;

      p {
        font-size: 1.5rem;
        font-weight: bold;
        color: chocolate;

      }
    }
  }
}
</style>