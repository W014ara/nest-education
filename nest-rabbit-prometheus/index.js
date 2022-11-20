const axios = require('axios');

const intervalTime = 1500;
const POST_MSG_URL = `http://localhost:3000/api/generator/new`;
const GET_MSG_URL = `http://localhost:3000/api/generator/last`;


setInterval(()=>{
    axios.post(POST_MSG_URL, createRandomString(getRandomArbitrary(1, 10)), {
        headers: {
            'Content-Type': 'text/plain',
        },
        responseType: "text"
    }).then((response) => {
        axios.get(GET_MSG_URL).then((response)=> {}).catch((error)=>{
            console.log("ERROR", error)
        })
    }).catch((error)=>{
        console.log("ERROR:", error);
    })


}, intervalTime)

const getRandomArbitrary = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

const createRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let index = 0; index < length; ++index) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



