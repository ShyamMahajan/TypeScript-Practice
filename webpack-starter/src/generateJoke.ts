import axios from 'axios'

export function generateJoke():void{
  const config = {
    headers: {
      Accept: 'application/json',
    },
  }

  axios.get('https://icanhazdadjoke.com', config).then((res: {data : {joke : string}}) => {
    (document.getElementById('joke') as HTMLDivElement)!.innerHTML = res.data.joke
  })
}
