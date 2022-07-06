import Fastify from 'fastify';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

fastify.post('/uppercase', (request, reply) => {
  const textToUppercase = request.body.toUpperCase();
  if (textToUppercase.indexOf('FUCK') !== -1) {
    return reply.status(403).send(`unresolved`);
  }
  return reply.status(200).send(textToUppercase);
});

fastify.post('/lowercase', (request, reply) => {
  const textLowerCase = request.body.toLowerCase();
  if (textLowerCase.indexOf('fuck') !== -1) {
    return reply.status(403).send(`unresolved`);
  }
  return reply.status(200).send(textLowerCase);
});

fastify.get('/user/:id', (request, reply) => {
  const id = request.query.id;
  console.log(id);
  const user = users[id];
  console.log(user);
  if (user) {
    return reply.status(200).send(user);
  }

  return reply.status(400).send(`User not exist`);
});


export default fastify;
