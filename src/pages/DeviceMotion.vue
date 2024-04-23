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
      directionZ: false
    };
  },
  computed: {
    // Calcola se lo schermo è più grande di quello di un tablet
    isScreenLarge() {
      return window.innerWidth > 800;
    }
  },
  methods: {
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
      console.error('Errore durante la verifica del permesso:', error);
      this.error = "Si è verificato un errore durante la verifica del permesso: " + error.message;
    });
  } else {
    console.error('L\'API Permissions non è supportata dal browser.');
    this.error = "L'API Permissions non è supportata dal browser.";
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
  <div>
    <!-- <div class="overlay" v-if="isScreenLarge">
      <p>il sito è utilizzabile solo su telefoni o teblet</p>
    </div> -->
    <div>
      <h2>Benvenuto In fliPhone</h2>
    <p v-if="isRecording">Registrazione attiva...</p>
    <p v-else>
      Questo Gioco registra i dati del sensore dopo aver premuto il pulsante e riporta il flip effettuato dal tuo telefono.
      Lancia in aria il tuo dispositivo e prova a eseguire un flip!
    </p>
    </div>

    <button class="btn btn-primary" @click="startRecording" :disabled="isRecording">Avvia registrazione</button>

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

</template>



<style scoped>


div {
  width: 70%;
  height: 70%;
  margin: 5rem auto;
  .error-message {
  color: red;
  font-size: 1.2rem;
  margin-top: 1rem;
}

.overlay {
  position: fixed;
  top: 0;
  left: 50;
  width: 70%;
  height: 60%;
  background-color: rgb(0, 0, 0); 
  z-index: 9999; 
  display: flex;
  align-items: center;
  justify-content: center;
  p{
    font-size: 2rem;
    font-weight: bolder;
    color: red;
  }
}
  .risult-box {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    flex-direction: column;

    p {
      font-size: 1.5rem;
      font-weight: bold;
      padding-top: 3rem;
    }
  }
}
</style>