export async function customFetch(url,body,verificationId)
{
    let res= await fetch(url, 
          {
            method: "POST",
            mode:'cors',
            body: JSON.stringify({Verification_ID:verificationId,...body}),
            headers: {
            "Content-Type": "application/json"
            }
        })
    return(res);
}