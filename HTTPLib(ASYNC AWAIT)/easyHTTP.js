class EasyHTTP{

    async get(url){

        const data = await fetch(url).then(res => res.json());

        return data;
        
    }
}