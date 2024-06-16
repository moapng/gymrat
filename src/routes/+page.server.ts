// // since there's no dynamic data here, we can prerender

// import { browser } from '$app/environment';
// import { user } from '$lib/stores/user';

// // it so that it gets served as a static asset in production
// export const prerender = true;
// if (browser) {
// 	const local_storage = localStorage.getItem('sb-rlngiatspbpitutsmmil-auth-token');
// 	if (local_storage) {
// 		const authorized_user = JSON.parse(local_storage);
// 		console.log(authorized_user);
//         user.set({ name: authorized_user.user.user_metadata.user_name, role: authorized_user.user.role });
// 	}
// }
