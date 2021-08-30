export default function Nodes($app,initialState,onCLick){

    this.state = initialState;

    this.$target = document.createElement('div');
    this.$target.className = 'Nodes';
    $app.appendChild(this.$target)

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }

    this.render = ()=>{
        const nodes = this.state.nodes.map(node =>{
            let nodeTpl;
            if(node.type === 'DIRECTORY'){
                nodeTpl =`<img src="./assets/directory.png"><div>${node.name}</div>`
            }else if(node.type === 'FILE'){
                nodeTpl =`<img src="./assets/file.png"><div>${node.name}</div>`
            } 
            return `<div class="Node">${nodeTpl}</div>`
        }).join('')
        this.$target.innerHTML = nodes
    }
}