import {json} from '@sveltejs/kit';
import { collection, getDocs, addDoc} from 'firebase/firestore';
import {db} from '$lib/firebase/client.js';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    let activityLogs = [];

    const querySnapshot = await getDocs(collection(db, 'activitylogs'));
    querySnapshot.forEach((doc) => {
        activityLogs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });

    return json(activityLogs);
};

/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
    const addUserInput = await request.json();
    const docRef = await addDoc(collection(db, "activitylogs"), {
        date:addUserInput.date,
        user:addUserInput.user,
        activityType:addUserInput.activityType,
        details:addUserInput.details
    });
    return json(docRef);

};