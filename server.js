import Fastify from 'fastify'
import got from 'got'
import axios from 'axios'

const fastify = Fastify({
  logger: true
})

fastify.get('/', async function handler (request, reply) {
  let payload = JSON.stringify({
    "category_id": 1,
    "subcategory_id": 1,
    "search_in": "contractor",
    "keyword": "SB",
    "limit": 12,
    "start_date_selected": "2020-05-25T11:12:45.119Z",
    "end_date_selected": "2024-05-31T22:00:00.000Z",
    "sort_type": "position",
    "sort_order": "asc"
  });
  const {data} = await got.post({
    url: 'https://www.olis.pl/api/search',
    headers: { 
      'referer': 'https://www.olis.pl/charts/oficjalna-lista-sprzedazy/albumy', 
      'Content-Type': 'application/json'
    },
	  json: payload,
  })

  console.log(`data: ${data}`)

// let data = JSON.stringify({
//   "category_id": 1,
//   "subcategory_id": 1,
//   "search_in": "contractor",
//   "keyword": "SB",
//   "limit": 12,
//   "start_date_selected": "2020-05-25T11:12:45.119Z",
//   "end_date_selected": "2024-05-31T22:00:00.000Z",
//   "sort_type": "position",
//   "sort_order": "asc"
// });

// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: 'https://www.olis.pl/api/search',
//   headers: { 
//     'referer': 'https://www.olis.pl/charts/oficjalna-lista-sprzedazy/albumy', 
//     'Content-Type': 'application/json'
//   },
//   data : data
// };

// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });


  return { data: data }
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
