
export default {
    GEO(){
        return new Promise((resolve,reject)=>{
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position=>{
                    const lng = position.coords.longitude;
                    const lat = position.coords.latitude;

                    resolve({lng:lng,lat:lat})
                });
            }else{
                reject('dont suporte')
            }
              
        })
      
}
}