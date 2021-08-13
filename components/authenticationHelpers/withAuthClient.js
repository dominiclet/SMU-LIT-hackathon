import axios from "axios";
import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react";
import { apiRoot } from "../../config";

const withAuthClient = (WrappedComponent) => {
	return (props) => {
		const router = useRouter();
		const [verified, setVerified] = useState(false);

		useEffect(() => {
			const accessToken = localStorage.getItem("jwt-token");
			if (!accessToken) {
				router.push("/login");
			} else {
				axios.post(apiRoot + "/ping/client", {}, {
					headers: {'Authorization': 'Bearer ' + accessToken}
				}).then(res => {
					if (res.status == 200) {
						setVerified(true);
					}
				}).catch(e => {
					alert(e.response.data);
					localStorage.removeItem("jwt-token");
					router.push("/login");
				})
			}
		}, []);

		if (verified) {
			return <WrappedComponent {...props} />;
		} else {
			return null;
		}

	}
}

export default withAuthClient