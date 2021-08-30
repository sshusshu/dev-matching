export default function ImageViewer($app,initialState){

    this.state = initialState;

    this.$target = document.createElement('div');
    this.$target.className = 'Modal ImageViewer';
    // $app.appendChild(this.$target)


    this.setState = (nextState) =>{
        this.state = nextState;
        this.render();
    }

    this.render = ()=>{

    }
    // <!-- ImageViewer sample markup -->
    // <!--
    // <div class="Modal ImageViewer">
    //   <div class="content">
    //     <img src="./assets/sample_image.jpg">
    // </div>
    // -->
}