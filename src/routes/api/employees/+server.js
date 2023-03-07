import {json} from '@sveltejs/kit';
import { collection, getDocs, addDoc} from 'firebase/firestore';
import {db} from '$lib/firebase/client.js';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    let employees = [];

    const querySnapshot = await getDocs(collection(db, 'employees'));
    querySnapshot.forEach((doc) => {
        employees = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });

    return json(employees);
};

/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
    const addUserInput = await request.json();
    const docRef = await addDoc(collection(db, "employees"), {
        name:addUserInput.name,
        address:addUserInput.address,
        contactInfo:addUserInput.contactInfo,
        role:addUserInput.role
    });
    return json(docRef);

};