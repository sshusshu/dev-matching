
const Request = async()=>{
    try{
        const res = await fetch('https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev')
        if(!res.ok) throw new Error('http 오류')
        return res.json()
    }catch(err){

    }

}

export default Request;