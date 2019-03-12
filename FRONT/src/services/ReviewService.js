import Api from "@/services/Api";

export default {
	saveReview(review) {
		return new Promise((resolve,reject)=>{
			Api()
			.post("/rates",review)
			.then(function(response) {
				resolve(response)
			}).catch(error => {
				reject(error.response)
			});
			
		})
		
	}
}
