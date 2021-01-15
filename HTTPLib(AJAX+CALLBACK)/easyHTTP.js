function easyHTTP(){
    this.http = new XMLHttpRequest();
}



// Make an HTTP GET Req
easyHTTP.prototype.get = function(url,callback){
    this.http.open('GET',url,true);

    let self = this;
    this.http.onload = function(){

        if(self.http.status === 200){
            callback(null,self.http.responseText);
        }else{
            callback('Error: '+ self.http.status);
        }

    }


    this.http.send();
}

// Make an HTTP POST Req
easyHTTP.prototype.post = function(url,data,callback){

    this.http.open('POST',url,true);

    this.http.setRequestHeader('Content-type','application/json');

    let self = this;
    this.http.onload = function(){
        
        callback(null,self.http.responseText);

    }

    this.http.send(JSON.stringify(data));
}


// Make an HTTP PUT Req



// Make an HTTP DELETE Req

easyHTTP.prototype.delete = function(url,callback){

    this.http.open('DELETE',url,true);

   // this.http.setRequestHeader('Content-type','application/json');

    let self = this;
    this.http.onload = function(){
        

        if(self.http.status === 200){
            callback(null,'Deleted Successfully');
        }else{
            callback('Error: '+ self.http.status);
        }

    }

    this.http.send();
}
