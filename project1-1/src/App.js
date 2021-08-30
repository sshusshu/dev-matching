import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import ImageViewer from "./components/ImageViewer.js";
import Loading from "./components/Loading.js";
import {request} from "./api.js";

export default function App($app){

    this.state = {
        isRoot : false,
        filePath : [],
        nodes : [],
        isLoading : false,
        selectedFilePath: null,
        isOpen:false,
    }
  
    const breadcrumb = new Breadcrumb($app)
    const nodes = new Nodes({
        $app,
        initialState : {
            isRoot : this.state.isRoot,
            nodes : this.state.nodes
        },
        onClick: async(node)=>{
            try{
                if(node.type === 'DIRECTORY'){
                    const nextNodes = await request(node.id)
                    this.setState({
                        ...this.state,
                        filePath:[...this.state.filePath, node],
                        nodes: nextNodes
                    })
                }else if(node.type === 'FILE'){
                    this.setState({
                        ...this.state,
                        selectedFilePath : node.filePath,
                        isOpen : true
                    })
                }

                if(this.state.isOpen){
                    document.body.addEventListener('click',(e)=>{
                        const imgCont = document.querySelector('.ImageViewer .content img')
                            if(e.target !== imgCont){
                            this.setState({
                                ...this.state,
                                selectedFilePath : null,
                                isOpen :false
                            })
                        }
                    })
                }
            }catch(err){

            }
        },
        onBackClick : async() =>{
            try{
                const nextState = {...this.state}
                nextState.filePath.pop()
                const prevNodeId = nextState.filePath.length===0?null:nextState.filePath[nextState.filePath.length-1].id
                
                if(prevNodeId === null){
                    const rootNodes = await request()
                    this.setState({
                        ...nextState,
                        isRoot: true,
                        nodes: rootNodes
                    })
                }else{
                    const prevNodes = await request(prevNodeId)
                    this.setState({
                        ...nextState,
                        isRoot : false,
                        nodes : prevNodes
                    })
                }
           
           
            }catch(err){

            }
        }
    })
    const imageviewer = new ImageViewer({
        $app,
        initialState: this.state.selectedFilePath
    })

    const loading = new Loading($app,this.state.isLoading)

    this.setState = (nextState) =>{
        this.state = nextState
        breadcrumb.setState(this.state.filePath)
        nodes.setState({
            isRoot : this.state.isRoot,
            nodes: this.state.nodes,
        })
        imageviewer.setState(this.state.selectedFilePath)
        loading.setState(this.state.isLoading)
    }

    const init = async() =>{
        try{
            this.setState({
                ...this.state,
                isLoading:true
            })
            const rootNodes = await request();
            this.setState({
                ...this.state,
                isRoot : true,
                nodes : rootNodes,
            })
        }catch(e){

        }finally{
            this.setState({
                ...this.state,
                isLoading:false
            })
        }
    }

    init();
}