import { adminAuth } from '$lib/firebase/admin.server';
import {json} from '@sveltejs/kit';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import {db} from '$lib/firebase/client.js';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    let adminInfo = []
    let adminUser = []
    const querySnapshot = await getDocs(collection(db, "userinfo"));
    querySnapshot.forEach((doc) => {
    adminInfo = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });
    for (let i = 0; i < adminInfo.length; i++) {
        const userRecord = await adminAuth.getUser(adminInfo[i].id);
        adminUser.push(userRecord);
    }
    return json(adminUser);
};




/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
    const addUserInput = await request.json();
    const userRecord = await adminAuth.createUser({ email:addUserInput.email, password:addUserInput.password, displayName:addUserInput.name});
    const docRef = await setDoc(doc(db, "userinfo", userRecord.uid), {
        admin: true
    });
    return json(docRef);

};
