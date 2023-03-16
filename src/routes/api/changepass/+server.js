import {adminAuth} from '$lib/firebase/admin.server.js'


export async function POST({ request }) {
	const data = await request.json();
    console.log(data);
    const {uid,newPassword} = data;
    if(!uid || !newPassword){
        return new Response(JSON.stringify({message:'Bad Request'}));
    }
    try {
        const userRecord = await adminAuth.updateUser(uid,{password:newPassword})
        console.log(userRecord);
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message:error?.message??'Something went wrong'}));
    }

    return new Response(JSON.stringify({message:'Password Reset Success'}));


    // getAuth()
    // .updateUser(uid, {
    //     email: 'modifiedUser@example.com',
    //     phoneNumber: '+11234567890',
    //     emailVerified: true,
    //     password: 'newPassword',
    //     displayName: 'Jane Doe',
    //     photoURL: 'http://www.example.com/12345678/photo.png',
    //     disabled: true,
    // })
    // .then((userRecord) => {
        
    //     console.log('Successfully updated user', userRecord.toJSON());
    // })
    // .catch((error) => {
    //     console.log('Error updating user:', error);
    // });
}

