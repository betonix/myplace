import Api from "@/services/Api";

export default {
	getPlacesNear(position) {
		return new Promise((resolve,reject)=>{
			Api()
			.post("/places",{lat:position.lat,lng:position.lng,radius:500,type:'restaurant'})
			.then(function(response) {
				resolve(response.data.places.results)
			}).catch(error => {
				reject(error.response)
			});
			
		})
		
	},
	getPlaceDetail(place_id,user_id) {
		return new Promise((resolve,reject)=>{
			Api()
			.post("/placeDetail",{place_id:place_id,user_id:user_id})
			.then(function(response) {
				resolve(response.data.place)
			}).catch(error => {
				reject(error.response)
			});
			
		})
		
	}
}
