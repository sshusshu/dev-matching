import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import ImageViewer from "./components/ImageViewer.js";
import Loading from "./components/Loading.js";
import Request from "./api.js";


export default function App($app){
    this.state = {
        nodes:[],
        isLoading : false
    }

    const breadcrumb = new Breadcrumb($app)
    const nodes = new Nodes({
        $app,
        initialState: this.state.nodes,
        onClick: (node)=>{
            try{
                if(node.type === 'DIRECTORY'){
                    this.setState({

                    })
                }else if(node.type === 'FILE'){
                    this.setState({
                        
                    })
                }
            }catch(err){

            }
        },

    }
        )
    const imageviewer = new ImageViewer($app)
    const loading = new Loading($app,this.state.isLoading)

    this.setState = (nextState) =>{
        this.state = nextState

        breadcrumb.setState(nextState)
        nodes.setState(nextState)
        imageviewer.setState(nextState)
        loading.setState(nextState)
    }

    const init = async() =>{
        try{
            this.setState({
                ...this.state,
                isLoading: true
            })
            const rootNodes = await Request()
            this.setState({
                ...this.state, 
                nodes:rootNodes,
            })
        }catch(err){

        }finally{
            this.setState({
                ...this.state,
                isLoading:false
            })

        }

    }

    init()
}