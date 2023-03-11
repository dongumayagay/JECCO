import {json} from '@sveltejs/kit';
import { collection, getDocs, setDoc, doc} from 'firebase/firestore';
import {db} from '$lib/firebase/client.js';
import { adminAuth } from '$lib/firebase/admin.server';


/** @type {import('./$types').RequestHandler} */
export async function GET() {
    let clients = [];

    const querySnapshot = await getDocs(collection(db, 'clientinfo'));
    querySnapshot.forEach((doc) => {
        clients = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });

    return json(clients);
};


/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
    const addUserInput = await request.json();
    const userRecord = await adminAuth.createUser({ email:addUserInput.username, password:addUserInput.password, displayName:addUserInput.name});
    const docRef = await setDoc(doc(db, "clientinfo", userRecord.uid), {
        clientNumber:addUserInput.clientNumber,
        username:addUserInput.username,
        firstname:addUserInput.firstname,
        lastname:addUserInput.lastname,
        email:addUserInput.email,
        coMaker:addUserInput.coMaker,
        number:addUserInput.number,
        barangay:addUserInput.barangay,
        houseNo:addUserInput.houseNo,
        municipality:addUserInput.municipality,
        province:addUserInput.province,
        dateCreated:addUserInput.dateCreated,
        status:addUserInput.status
    });

    return json(docRef);

};
