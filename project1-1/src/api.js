const API_END_POINT = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

export const request = async(nodeId) => {
    try{
        const res = await fetch(`${API_END_POINT}/${nodeId? nodeId:''}`)
        if(!res.ok) throw new Error('서버통신오류')
        return res.json()
    }catch(err){
        throw new Error(err.message)
    }
}
