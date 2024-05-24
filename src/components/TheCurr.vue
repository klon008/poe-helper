<script setup>
import { defineComponent } from 'vue';
import myJson from '/json/currencies.json';
</script>


<template>
    <div>
        <input v-model="currencyNeeded" placeholder="Need Currency" class="flat" />
        <div class="gid">
            <div v-for="data in myJson" class="gid-e" v-bind:key="data.name">
                <div @click="selected=data" :class="{ active: (data.name == selected.name) }"><img
                        :src="'https://www.poewiki.net'+data.icon" :alt="data.name" :title="data.name" width="39" height="39"></div>
            </div>
        </div>
        <h3>Stash</h3>
        <div class="stash-gid">
            <div v-for="indexRow in 60" class="gid-e-cell" v-bind:key="'GiddeRow'+indexRow">
                <template v-if="indexRow <= fullCells && selected">
                    <img :src="'https://www.poewiki.net'+selected.icon" :alt="selected.name" :title="selected.name"><div class="topNumber">{{selected.maxStock}}</div>
                </template>
                <template v-if="indexRow == fullCells+1 && selected && remainsinLastCell > 0">
                    <img :src="'https://www.poewiki.net'+selected.icon" :alt="selected.name" :title="selected.name"><div class="topNumber">{{remainsinLastCell}}</div>
                </template>
            </div>
        </div>
        <div v-if="60*selected.maxStock < currencyNeeded">
            <h3>Need more than one stash</h3>
            <div>
                We can do it in x{{currencyNeeded / (60*selected.maxStock) | 0}} trade Full stash.
                <br>
                and {{ currencyNeeded % (60*selected.maxStock) }} after
            </div>
        </div>
    </div>
</template>

<style scoped>
.topNumber{
    position: absolute;
    top: 0;
    left: 2px;
    color: white;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgb(46, 46, 46);
}
.gid-e-cell{
    width: 39px;
    height: 39px;
    background-color: var(--vt-c-indigo);
    border-radius: 3px;
}

.flat{
    margin-bottom: 5%;
}
.gid, .stash-gid{
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    width: 100%;
    justify-content: space-between;
    gap: 5px;
    grid-auto-flow: column;
}
.gid-e{
    cursor: pointer;
}
.gid-e>div{
    border-radius: 3px;
    display: flex;
    place-items: center;
}
.gid-e>.active{
    background-color: var(--vt-c-indigo);
}
.gid-e:hover>div{
    background-color: var(--vt-c-text-light-2);
    
}
h3 {
    margin-top: 5%;
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    color: var(--color-heading);
}
</style>

<script>
export default defineComponent({
    name: "TheCurr",
    data() {
        return {
            selected: '',
            currencyNeeded: '',
            
            fullCells: 0,
            remainsinLastCell: 0

        }
    },
    watch: {
        currencyNeeded(newCurrencyNeeded, oldCurrencyNeeded) {
            let needCurr = newCurrencyNeeded;
            let selectedStock = this.selected.maxStock;
            let bezostatka = (needCurr/selectedStock) | 0;
            let ostatok = needCurr % selectedStock;
            this.remainsinLastCell = ostatok;
            this.fullCells = bezostatka;
        },
        selected(){
            let needCurr = this.currencyNeeded;
            let selectedStock = this.selected.maxStock;
            let bezostatka = (needCurr/selectedStock) | 0;
            let ostatok = needCurr % selectedStock;
            this.remainsinLastCell = ostatok;
            this.fullCells = bezostatka;
        }
    }
})
</script>