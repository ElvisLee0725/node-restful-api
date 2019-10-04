const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);     // When this is resolved, return something (here is 1)
        reject(new Error('This is not working...'));    // When it's rejected, return an error object
    }, 2000);
});

p.then(result => console.log(result))  
 .catch(err => console.log(err.message));