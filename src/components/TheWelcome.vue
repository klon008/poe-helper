<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import axios from 'axios';

</script>

<template>
  <WelcomeItem>
    <template #icon>
      <img class="css-mpit4l" src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyAddModToRare.png?scale=1&amp;w=1&amp;h=1" alt="">
    </template>
    <template #heading>Exalted</template>

    <input v-model="exalt" placeholder="Exalt to Chaos" class="flat" v-on:keypress="NumbersOnly">
    <p>Введённое сообщение: {{ exalt }}</p>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <img class="css-mpit4l" src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1" alt="">
    </template>
    <template #heading>Chaos orb</template>

    <input v-model="chaoses" placeholder="Chaoses" class="flat" disabled>
  </WelcomeItem>
  <WelcomeItem> 
    <textarea name="aaa" id="" cols="30" rows="10">{{sjson}}</textarea>
  </WelcomeItem>
</template>

<style scoped>
input.flat {
	background-color: var(--vt-c-text-light-2);
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
export default {
  name: "HelloWorld",
  data() {
    return {
      exalt: "",
      chaoses: "",
      sjson: "",
    }
  },
  watch: {
    exalt(newQuestion, oldQuestion) {
      const numbersReg = /(?<=^| )\d+(\.\d+)?(?=$| )|(?<=^| )\.\d+(?=$| )/g;
      if (newQuestion.length > 0 && newQuestion !== oldQuestion){
        this.chaoses = newQuestion.match(numbersReg);
        if (this.chaoses){
          axios.get('https://poe.ninja/api/data/currencyoverview?league=Sentinel&type=Currency').then((response) => this.sjson = response.data.response)
          .catch((error) => console.log(error.response.data));          
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
    }
  }
}
</script>