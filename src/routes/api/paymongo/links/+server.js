import {env} from '$env/dynamic/private'
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
    const attributesObject = await request.json()

    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: `Basic ${env.PAYMONGO_SECRET_KEY}`
        },
        body: JSON.stringify({
          data: {
            attributes: attributesObject
          }
        })
      };
      
     try {
        const response = await fetch('https://api.paymongo.com/v1/links', options)
        const result = await response.json()
        return json(result)
     } catch (error) {
        console.log(error)
     }
};
