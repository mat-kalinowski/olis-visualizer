import Fastify from 'fastify'
import got from 'got'
import axios from 'axios'

const fastify = Fastify({
  logger: true
})

fastify.get('/', async function handler (request, reply) {
  var data = {
    category_id: 1,
    subcategory_id: 1,
    search_in: "contractor",
    keyword: "SB",
    limit: 12,
    start_date_selected: "2020-05-25T11:12:45.119Z",
    end_date_selected: "2024-05-31T22:00:00.000Z",
    sort_type: "position",
    sort_order: "asc",
  };
  var response_data = await got.post({
    url: 'https://www.olis.pl/api/search',
    headers: { 
      'referer': 'https://www.olis.pl/charts/oficjalna-lista-sprzedazy/albumy', 
      'Content-Type': 'application/json'
    },
    json: data,
  })

  return { data: response_data.body }
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
