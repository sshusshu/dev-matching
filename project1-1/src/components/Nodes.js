export default function Nodes({$app,initialState,onClick,onBackClick}){
    this.state = initialState;

    this.$target = document.createElement('div')
    this.$target.classList.add('Nodes')
    $app.appendChild(this.$target)

    this.onClick = onClick
    this.onBackClick = onBackClick

    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    } 
    
    this.render = () => {
        if(this.state.nodes){
          const nodesTemplate = this.state.nodes.map(node=>{
            const iconPath = node.type === 'FILE'? './assets/file.png':'./assets/directory.png'
            return `
              <div class="Node" data-node-id="${node.id}" style="border:1px solid #000">
                <img src="${iconPath}"/>
                <div>${node.name}</div>
              </div>
             `
          }).join('')
          this.$target.innerHTML = !this.state.isRoot? `<div class="Node"><img src="/assets/prev.png"></div>${nodesTemplate}`:nodesTemplate
       
        }
    }

    this.$target.addEventListener('click',(e)=>{
      const $node = e.target.closest('.Node')
      if($node){
        const {nodeId} = $node.dataset
        if(!nodeId){
          this.onBackClick()
          return
        }

        const selectedNode = this.state.nodes.find(node=>node.id === nodeId)
        if(selectedNode){
          this.onClick(selectedNode)
        }
      }
    })

}