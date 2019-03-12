import axios from "axios";
export default () => {
	return axios.create({
		baseURL: `https://evening-beyond-21460.herokuapp.com/api`,
		//baseURL: `http://localhost:8000/api`,
		withCredentials: false,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: {
				toString() {
					let token = localStorage.getItem("access_token")
						? localStorage.getItem("access_token").replace('"', "")
						: "";
					return `Bearer ${token}`;
				}
			}
		}
	});
};
