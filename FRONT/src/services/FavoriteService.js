import Api from "@/services/Api";

export default {
	saveFavorite(place_id,user_id) {
		return new Promise((resolve,reject)=>{
			Api()
			.post("/favorites",{place_id:place_id,user_id:user_id})
			.then(function(response) {
				resolve(response)
			}).catch(error => {
				reject(error.response)
			});
			
		})
		
	},
	removeFavorite(place_id,user_id) {
		return new Promise((resolve,reject)=>{
			Api()
			.post("/removeFavorite",{place_id:place_id,user_id:user_id})
			.then(function(response) {
				resolve(response)
			}).catch(error => {
				reject(error.response)
			});
			
		})
		
	}
}
