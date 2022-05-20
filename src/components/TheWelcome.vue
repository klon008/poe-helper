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
      <img class="css-mpit4l" src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&amp;w=1&amp;h=1" alt="">
    </template>
    <template #heading>Exalted</template>

    <div class="row">
    <input v-model="exaltz" v-on:change="meowMow($event)" placeholder="Exalt to Chaos" class="flat" v-on:keypress="NumbersOnly" >
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
input.flat {
	background-color: var(--vt-c-text-light-2);
	color: var(--vt-c-white-soft);
	outline-color: var(--vt-c-text-dark-2);
    border-radius: 3px;
    padding: 15px 10px;
    width: 100%;
    border: 1px solid #c9d1d7;
    box-shadow: 1px 1px 7px rgba(0,0,0,.2);
    -moz-box-shadow: 1px 1px 7px rgba(0,0,0,.2);
    -webkit-box-shadow: 1px 1px 7px rgba(0,0,0,.2);
    -ms-box-shadow: 1px 1px 7px rgba(0,0,0,.2);
    -o-box-shadow: 1px 1px 7px rgba(0,0,0,.2);
    border-radius: 3px;
}
input.flat:disabled {
	background-color: var(--color-background);
	color: var(--color-text);
	outline-color: var(--vt-c-text-dark-2);
    border-radius: 3px;
    padding: 15px 10px;
    width: 100%;
    border: 1px solid #c9d1d7;
    box-shadow: 1px 1px 7px rgba(0,0,0,.2);
    -moz-box-shadow: 1px 1px 7px rgba(0,0,0,.2);
    -webkit-box-shadow: 1px 1px 7px rgba(0,0,0,.2);
    -ms-box-shadow: 1px 1px 7px rgba(0,0,0,.2);
    -o-box-shadow: 1px 1px 7px rgba(0,0,0,.2);
    border-radius: 3px;
}

.flat::-webkit-input-placeholder {
  color: #a7a7a7;
}
.flat::-moz-placeholder {
  color: #a7a7a7;
}
.flat:-ms-input-placeholder {
  color: #a7a7a7;
}
.flat:-moz-placeholder {
  color: #a7a7a7;
}

input.flat-checkbox,
input.flat-radio {
	position: absolute;
	visibility: hidden;
}

input.flat-checkbox ~ label,
input.flat-radio ~ label {
	position: relative;
}

input.flat-checkbox ~ label:before,
input.flat-checkbox ~ label:after {
	position: absolute;
	content: '';
	top: -2px;
    right: -25px;
	width: 20px;
	height: 20px;
}

input.flat-checkbox ~ label:before {
	background-color: var(--vt-c-text-light-2);
	border: 1px solid #c9d1d7;
	border-radius: 3px;
}

input.flat-checkbox ~ label:after {
	background: url('http://s8.picofile.com/file/8334266826/tick.png') no-repeat center center;
	background-size: 75%;
	opacity: 0;
	transition: ease-in-out .3s;
}

input.flat-radio ~ label:before,
input.flat-radio ~ label:after {
	position: absolute;
	content: '';
	top: 0;
    right: -24px;
	width: 20px;
	height: 20px;
	border-radius: 50%;
}

input.flat-radio ~ label:before {
	background-color: var(--vt-c-text-light-2);
	border: 1px solid #c9d1d7;
}

input.flat-radio ~ label:after {
	background: url('http://s8.picofile.com/file/8334266868/radio.png') no-repeat center center;
	background-size: 75%;
	opacity: 0;
	transition: ease-in-out .3s;
}

input.flat-checkbox:checked ~ label:after,
.radio input.flat-radio:checked ~ label:after {
	opacity: 1;
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
              "buy": "Exalted Orb",
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
            const selectedEx = tempJson.find(o => o.name == 'Exalted Orb')
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
          "buy": "Exalted Orb",
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
            const selectedEx = tempJson.find(o => o.name == 'Exalted Orb')
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
        console.log('11')
        let loadCookie = VueCookieNext.getCookie('chaosEquivalent');
        if (!loadCookie){
          loadCookie = 100;
        }
        this.chaosText = loadCookie
      })
    }
})
</script>