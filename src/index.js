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
  const id = request.params.id;
  const user = users[id];
  if (user) {
    return reply.status(200).send(user);
  }
  return reply.status(400).send(`User not exist`);
});

fastify.get('/users', (request, reply) => {
  const filter = request.query.filter;
  const value = request.query.value;
  const arrUsers = Object.values(users);
  block_1: if (filter && value) {
    const arrUser = [];
    arrUsers.forEach((item) => {
      if (item[filter] == value) {
        arrUser.push(item);
      }
    });
    if (arrUser.length == 0) {
      break block_1;
    };
    return reply.status(200).send(arrUser);
  }
  return reply.status(400).send(arrUsers);
});

export default fastify;
