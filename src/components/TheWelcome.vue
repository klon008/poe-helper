<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import axios from 'axios';
import { VueCookieNext } from 'vue-cookie-next'
import { defineComponent } from 'vue';
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <img class="css-mpit4l" src="https://www.poewiki.net/images/5/58/Divine_Orb_inventory_icon.png" width="48" height="48" alt="">
    </template>
    <template #heading>Divine</template>

    <div class="row">
    <input v-model="exaltz" v-on:change="meowMow($event)" placeholder="Divine to Chaos" class="flat" v-on:keypress="NumbersOnly" >
    <button  @click="buttonClick" class="refresh-button ">
    <img :class="{'animate__animated animate__rotateIn': btnAnimated}"  @animationend="btnAnimated = false" src="@/assets/img/refresh-button.png" width="48" height="48" />
    </button>
    </div>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <div class="chaos-text">{{chaosText}}</div>
      <img class="css-mpit4l" src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1" alt="">
    </template>
    <template #heading>Chaos orb</template>

    <input v-model="chaoses" placeholder="Chaoses" class="flat" disabled>
  </WelcomeItem>
</template>

<style scoped>
.refresh-button{
  border: 1px solid var(--color-border);
  background: var(--color-background);
  border-radius: 8px;
  cursor: pointer;
}
.chaos-text{
  position: absolute;
  top: -25px;
  left: 0px;
  z-index: 11111111111;
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgb(192, 192, 192);
}
.row{
  display: flex;
}
.row > *:first-child {
  margin-right: 5%;
}
</style>

<script>
export default defineComponent({
  name: "HelloWorld",
  data() {
    return {
      exaltz: "",
      chaoses: "",
      sjson: "",
      chaosText: "",
      btnAnimated: false
    }
  },
  watch: {
    exaltz(newQuestion, oldQuestion) {
      const numbersReg = /(?<=^| )\d+(\.\d+)?(?=$| )|(?<=^| )\.\d+(?=$| )/g;
      if (newQuestion.length > 0 && newQuestion !== oldQuestion && this.chaosText){
        const exalts = newQuestion.match(numbersReg);
        if (exalts){
          this.chaoses = this.chaosText * exalts
          //axios.get('https://poe.ninja/api/data/currencyoverview?league=Sentinel&type=Currency').then((response) => this.sjson = response.data.response)
          //.catch((error) => console.log(error.response.data));          
        }
      }
    },
  },
  methods: {
    NumbersOnly(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    },
    meowMow(dam){

      var exa = this.exaltz;
      const numbersReg = /(?<=^| )\d+(\.\d+)?(?=$| )|(?<=^| )\.\d+(?=$| )/g;
      if (exa.length > 0 ){
        this.chaoses = exa.match(numbersReg) * this.chaosText;
        if (this.chaoses){
          let axconfig = {
              "sell": "Chaos Orb",
              "buy": "Divine Orb",
              "limit": 5
          }
          //axios.get('https://poe.ninja/api/data/currencyoverview', axconfig).then((response) => this.sjson = response.data.response)
          axios({
            method: "get",
            url:'https://raw.githubusercontent.com/The-Forbidden-Trove/poeninja-prices/main/League/Currency.txt',
            data: axconfig,
            headers: { "Content-Type": "multipart/form-data" },

          }).then((response) => {
            console.log(response);
            this.sjson = response.data;
            const tempJson = response.data;
            const selectedEx = tempJson.find(o => o.name == 'Divine Orb')
            const chaosEquivalent = selectedEx.chaosEquivalent;
            this.chaosText = chaosEquivalent;
            VueCookieNext.setCookie('chaosEquivalent', chaosEquivalent, { 
              expire: '1d'
            });

            }
          )
          .catch(
            (error) => console.log(error.response)
            );          
        }
      }
    },
    buttonClick(){
      this.btnAnimated = true;
      const axconfig = {
          "sell": "Chaos Orb",
          "buy": "Divine Orb",
          "limit": 5
      }
      axios({
            method: "get",
            url:'https://raw.githubusercontent.com/The-Forbidden-Trove/poeninja-prices/main/League/Currency.txt',
            data: axconfig,
            headers: { "Content-Type": "multipart/form-data" },

          }).then((response) => {
            this.sjson = response.data;
            const tempJson = response.data;
            const selectedEx = tempJson.find(o => o.name == 'Divine Orb')
            const chaosEquivalent = selectedEx.chaosEquivalent;
            this.chaosText = chaosEquivalent;
            VueCookieNext.setCookie('chaosEquivalent', chaosEquivalent, { 
              expire: '1d'
            });

            }
          )
          .catch(
            (error) => console.log(error.response)
            );          
    },
    
  },
  mounted(){
      this.$nextTick(() => {
        this.buttonClick();
        let loadCookie = VueCookieNext.getCookie('chaosEquivalent');
        if (!loadCookie){
          loadCookie = 100;
        }
        this.chaosText = loadCookie;
      })
    }
})
</script>