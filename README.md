# poe_curr

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Push
```
git subtree push --prefix dist origin gh-pages
```

### DISCORD
```
let ParentsSS = [];
let lastName = {};
let includesTotalsS = [];



let concatAndDeDuplicate = (...arrs) => [ ...new Set( [].concat(...arrs) ) ];
let recalculateDuplicate = () => {
    let kkRsult = [];
    for (let oneParent of ParentsSS){
        let childs = [];
        for (let oneChild of oneParent.childs){
            let finded = includesTotalsS.find((o, i)=>{
                return o.name == oneChild;
            })
            childs.push(finded);
        }
        kkRsult.push({
            'name': oneParent.name,
            'childs': childs
        })
    }
    return kkRsult;
};
function gotall(){
    let a = document.querySelectorAll("div[class*='scrollerBase']")[1].children[0].children;
    for (let elema of a) {
        
        if (elema.nodeName == 'LI'){
            isDraggable = elema.hasAttribute('draggable');
            if (isDraggable){
                let rootChannel = {
                    'name' : elema.getAttribute('data-dnd-name'),
                    'childs' : []
                }
                let myChilds = [];
                sibling = elema;
                while (sibling.nextElementSibling) {
                    
                    sibling = sibling.nextElementSibling;
                    if (sibling.hasAttribute('draggable')) {
                        break;
                    }
                    if (sibling.nodeType == 1) { 
                        myChilds.push(sibling.getAttribute('data-dnd-name')) 
                    };
                    
                }
                
                let includesTotals = ParentsSS.map((e)=>{return e.name})
                let indexInResults = includesTotals.indexOf(rootChannel.name)
                if (indexInResults === -1){
                    rootChannel.childs = myChilds;
                    ParentsSS.push(rootChannel);
                } else {
                    let oldChilds = ParentsSS[indexInResults].childs
                    myChilds.concat(oldChilds);
                    rootChannel.childs = myChilds;
                    ParentsSS[indexInResults] = rootChannel;
                }
            } else {
                var currentName = elema.getAttribute('data-dnd-name');
                var includesTotals = includesTotalsS.map((e)=>{return e.name})
                if (includesTotals.indexOf(currentName) === -1){
                    let link = elema.querySelector('a').getAttribute("href");;
                    includesTotalsS.push({'name': currentName, 'link': link})
                }
            }
        }
    }
}

document.querySelectorAll("div[class*='scrollerBase']")[1].addEventListener('scroll', function() {
    console.log('////////////////////////////');
    gotall();
    console.log(lastName);
})
```