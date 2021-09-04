import axios from 'axios';

export default axios.create({
    baseURL:'https://nepisirsemapi.herokuapp.com',
    headers:{"Access-Control-Allow-Origin":"*"}
})

