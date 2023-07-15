export const peso = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  });

export const sendEmail = async (
  mailOptions = {
    to: 'maxpascual16@gmail.com',
    subject: 'Email Subject',
    html: '<h1>Hello World</h1>'
  }
) =>
  await (
    await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify({ mailOptions })
    })
  ).json();

 

  export async function saveActivityLogs(addUserInput){
    const date = new Date();
    let currentDate = date.toJSON();
    console.log(addUserInput);
    try {
    const docRef = await fetch('/api/activity-logs',{method:'POST',
      body: JSON.stringify({
        date:currentDate.slice(0,10),
        user:addUserInput.displayName,
        activityType:addUserInput.activityType,
        details:addUserInput.details
    })});
    } catch (e) {
    console.error("Error adding document: ", e);
    }
  }