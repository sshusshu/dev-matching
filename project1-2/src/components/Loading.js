export default function Loading($app,initialState){

    this.state = initialState
    this.$target = document.createElement('div');
    this.$target.className = 'Modal Loading';
    $app.appendChild(this.$target)

    this.setState = (nextState) =>{
        this.state = nextState;
        console.log(nextState)
        this.render();
    }

    this.render = ()=>{
        const loadTpl = `<div class="content"><img src="./assets/nyan-cat.gif"></div>` 
        this.$target.innerHTML = loadTpl
        this.$target.style.display= this.state.isLoading?'block':'none'
    }
}