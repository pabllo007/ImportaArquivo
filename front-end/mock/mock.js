/**
 * @author Rafael Fernandes Silva
 * 10/01/2019
 *  Mock para autenticação de usuário SISBR usando CAS + API Manager
 *
 * Dependencias:
 *  json-server -> npm install -g json-server
 *
 * Usage: node mock.js
 *  Inicia um servidor node provendo o mock
 */
const jsonServer = require('json-server')
const server = jsonServer.create();
const router = jsonServer.router('mock/rest-mock.json');
const middlewares = jsonServer.defaults();

const accessToken = "80aaadc2-1a94-339a-b776-2ca499469a19";
const refreshToken = "8de29471-c1e0-3f58-ac44-2fb62ff7f0ce";

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  var authHeader = req.headers.authorization;
  if(! authHeader) {
      return res.status(401).json({ error: 'Nao autorizado! (Você deve informar um header Authorization!)' });
  }

  //Se não é para buscar um token
  if(req.url.indexOf('/token') == -1) {
    if(authHeader != `Bearer ${accessToken}`) {
      return res.status(401).json({ error: `Nao autorizado! (Você deve informar Bearer com o accessToken '${accessToken}'!)` });
    }
  }

  console.log("Access-Control-Allow-Origin setted");
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


/*
 * Passo 1:
 *  Recupera o acess token para requisições no API manager.
 */
server.post('/token', (req, res) => {
    var authHeader = req.headers.authorization;
    if(! authHeader.startsWith("Basic")) {
        return res.status(401).json({ error: 'Nao autorizado! (Você deve informar basic com o base64(clientId:ClientSecrete)!)' });
    }

    if(req.body.grant_type == "st" ) {
        if(! req.body.ST ) {
            return res.status(500).json({ error: 'Session Token invalido!' });
        }
        if(! req.body.service ) {
            return res.status(500).json({ error: 'Servico invalido!' });
        }

        return res.jsonp({
            "access_token": accessToken,
            "refresh_token": refreshToken,
            "scope": "openid",
            "id_token": "eyJ4NXQiOiJObUptT0dVeE16WmxZak0yWkRSaE5UWmxZVEExWXpkaFpUUmlPV0UwTldJMk0ySm1PVGMxWkEiLCJraWQiOiJkMGVjNTE0YTMyYjZmODhjMGFiZDEyYTI4NDA2OTliZGQzZGViYTlkIiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiVVUtdTEwQ3hsRGFPbFZ5QUR0UG1tUSIsImFjciI6InVybjptYWNlOmluY29tbW9uOmlhcDpzaWx2ZXIiLCJzdWIiOiJzaWNvb2IuY29tLmJyXC9SQUZBRUxGMDMwMF8wMCIsImF1ZCI6WyJLYXRJcXlaUHRXWlBENlBjTHRJMDBualJqeWdhIl0sImF6cCI6IkthdElxeVpQdFdaUEQ2UGNMdEkwMG5qUmp5Z2EiLCJpc3MiOiJodHRwczpcL1wvMTAuMjIxLjEuMTAwOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE1NDc0ODcyMTAsImlhdCI6MTU0NzQ4MzYxMH0.Q7il8UV5HcMPDz7L92zGoEXgCosxnEq206j8gymgkGWSyevuunbD4a1fRHmHkioARY6r0rphfa_Bk8Fl0sjDImU_jYf7TpSrb76XKMFzWT0jl1h1Az7LGQXXNzisNtgmNHO8IjExfYGPtFe-EGm9xMNdnYp4NQWHgckd2QdI-ZY",
            "token_type": "Bearer",
            "expires_in": 3600
        });
    }

    if(req.body.grant_type == "refresh_token" ) {
        if(req.body.refresh_token != refreshToken ) {
            return res.status(500).json({ error: 'refresh_token invalido! (Utilize o refresh_token recebido ao buscar o access token original.)' });
        }

        return res.jsonp({
          "access_token": accessToken,
          "refresh_token": refreshToken,
          "scope": "openid",
          "id_token": "eyJ4NXQiOiJObUptT0dVeE16WmxZak0yWkRSaE5UWmxZVEExWXpkaFpUUmlPV0UwTldJMk0ySm1PVGMxWkEiLCJraWQiOiJkMGVjNTE0YTMyYjZmODhjMGFiZDEyYTI4NDA2OTliZGQzZGViYTlkIiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiVVUtdTEwQ3hsRGFPbFZ5QUR0UG1tUSIsImFjciI6InVybjptYWNlOmluY29tbW9uOmlhcDpzaWx2ZXIiLCJzdWIiOiJzaWNvb2IuY29tLmJyXC9SQUZBRUxGMDMwMF8wMCIsImF1ZCI6WyJLYXRJcXlaUHRXWlBENlBjTHRJMDBualJqeWdhIl0sImF6cCI6IkthdElxeVpQdFdaUEQ2UGNMdEkwMG5qUmp5Z2EiLCJpc3MiOiJodHRwczpcL1wvMTAuMjIxLjEuMTAwOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE1NDc0ODcyMTAsImlhdCI6MTU0NzQ4MzYxMH0.Q7il8UV5HcMPDz7L92zGoEXgCosxnEq206j8gymgkGWSyevuunbD4a1fRHmHkioARY6r0rphfa_Bk8Fl0sjDImU_jYf7TpSrb76XKMFzWT0jl1h1Az7LGQXXNzisNtgmNHO8IjExfYGPtFe-EGm9xMNdnYp4NQWHgckd2QdI-ZY",
          "token_type": "Bearer",
          "expires_in": 3600
      });
    }

    return res.status(500).json({ error: 'Grant type invalido! (Utilize st ou refresh_token)' });
});

/**
 * Passo 2:
 *  Recupera as informações do usuário logado.
 */
server.get('/permissao/1.0.0/autorizacao/usuarios', (req, res) => {

    res.jsonp({
        "resultado": {
            "login": "gearqc0300_00",
            "nome": "USUARIO CORPORATIVO DA GEARQ",
            "cpf": "62663522732",
            "email": "gearqc@sicoob.com.br",
            "numeroCooperativa": 300,
            "idInstituicaoOrigem": 2,
            "idUnidadeInstOrigem": 0,
            "dataHoraUltimoLogin": Date.now() - 1000
        }
    });

});

/*
 * Passo 3:
 *  Recupera recupera a foto do usuário
 */
server.get('/rhs/api/successfactors/v1/fotos/:cpf/:numeroCooperativa/perfil', (req, res) => {
	
	//return res.status(500).json({ error: 'Foto nao encontrada' });	

    res.jsonp({"resultado":
      {
        "foto": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJycfLT0tMTU3Ojo6Iys/QEE/QCo/QT8BCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc1NTcyNzc3Nzc3Nzc3NzU1NzU3LS83KzU1LS01Nf/AABEIACgAKAMBIgACEQEDEQH/xAAbAAADAQADAQAAAAAAAAAAAAAABQYEAQMHAv/EAC8QAAIBAwMCBAUDBQAAAAAAAAECAwAEBRESMSFBBhNRYRQycYHBUpGhByIjJEL/xAAYAQADAQEAAAAAAAAAAAAAAAADBAUCBv/EACERAAICAQMFAQAAAAAAAAAAAAECABEhAxIxBBMiUbEF/9oADAMBAAIRAxEAPwBPZ+IJZLhmR9VLBSf069dBVPjMvJeyiADo52Ivr069akf6XYqK8lu5buIyw2oDFG4Lnj+OavbC+waXJs8XbW8rMwVpIJA5Rj2PcVLdc4ljSI22Z8z2VhIHTykOwEqw4JrDcXkUKgWsIQhux57VtyN5j8ZeNYvLKs8vUBoy5Y+utL7yyJinEL75GGqAjSsCxDEKRJbxVcxzyfFQptG0CRfzXNIsjfSQBzIAApI2sOx5FcU0qkiT3YAz2XFYm3xfiLJeWqJb3ao6x9uCG0+9MbaPEDJPDahGnTR2baAqHsNdOfasueubbz4LRpf9l1YhFOjBdNeex76e1K7fEPbYj4ZzFc28ztIHuGMco69CSP8Ar36VL/M1W1elRm5r5iNIAwwZsv7LGZLLSwZFIpHm3eSXXcCRyNfXTtWO5xVhgYX+C3lj101/tB9gSdKUHESwWk1pi40gckT/ABMl2ZXVxwSQPtp710tfvFjnvcpOHMUZaTaNFJA7d6db1CUAbk94rxAvLOO7LKs11c7vQLGo6lj9dKKXPlZMtFC+XmTyRF/hCJtXaT6Dkg8/SijqGqokX02Nyg8QPcXYe8SUreROt0kg53Kev201GlXaeI7fE2vk5aMONA8U23VXU8fQ0UUtp4wIr0DnY1xPk/GGPlhaPGwqJG+ZtNAo9SfxUheY+bxDjrweaYY/mRiOjbep/fiiiiHxyJRHng8TNZ2MTYiwjuV3JHHseMdOunzA8g0UUVnusODOe3sCaM//2Q=="
      }
    });

});

server.use(router);
server.listen(3000, () => {
  console.log('Json Server -> Sicoob Mock com está rodando na porta 3000!')
})
