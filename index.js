import fetch from 'node-fetch';
const getAllPosts = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
}

const getPost = async(id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return response.json();
}

const getComments = async(id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    return response.json();
}

const LoadPostAndComments = async(int) => {
    let result = {};
    const arr = await Promise.all([getPost(int), getComments(int)]);
    result = arr[0];
    result.comments = arr[1];
    return result;
}

const rndİnt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const run = async function() {
    let postLen = await getAllPosts(); // tüm postları getir
    postLen = postLen.length || 20; //postların uzunluğunu al ya da 20 uzunluğunu al
    const randomİnt = rndİnt(1, postLen); // 1 ile post uzunluğu arasında random sayı generate edildi
    console.log(`Total Post: ${postLen}`)
    console.log(`Random Post Id : ${randomİnt}`)





    LoadPostAndComments(randomİnt)
        .then((result) => {
            console.log(result);
            console.log('bunu yapan yeteri kadar javascript çalışmıştır')
        }).catch((err) => {
            console.log("Error: ", err.message);
        });
}();