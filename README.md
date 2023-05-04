# Desafio técnico para desenvolvedores

Construa uma nova aplicação, utilizando NodeJS, a qual deverá conectar na [API do GitHub](https://docs.github.com/pt/rest/guides/getting-started-with-the-rest-api) e disponibilizar as seguintes funcionalidades:

- Rota para buscar e armazenar os repositórios destaques de 5 linguagens à sua escolha;
- Rota para listar os repositórios encontrados;
- Rota para visualizar os detalhes de cada repositório.
- Rota para favoritar/desfavoritar repositórios, salvando a data, hora e IP usado para realizar a operação;
- Rota para listar os repositórios favoritados mostrando a data e hora em que os repositorios foram favoritados, sendo que a data e hora deve ser mostrada no fuso horario do usuario com base no ip utilizado no momento da consulta;

Alguns requisitos:

- Deve ser uma aplicação totalmente nova;
- Crie um fork desse repositório;
- A solução deve estar em um repositório público do BitBucket;
- A aplicação deve armazenar as informações encontradas utilizando PostgreSQL, MySQL, SQL Server ou outro;
- Realizar deploy da aplicação, preferencialmente no Heroku, AWS ou Azure;
- O link da aplicação deployada deverá ser disponibilizado;
- A aplicação precisa ter testes automatizados;
- Preferenciamente dockerizar a aplicação;
- Por favor atualizar o readme da aplicação com passo a passo com instrução para subir o ambiente.

Quando terminar, faça um Pull Request neste repo e avise-nos por email.

**IMPORTANTE:** não tem certo ou errado, se você não conseguir finalizar o teste está tudo bem. Nos diga o motivo e descreva quais foram as suas dificuldades. Você pode também sugerir uma outra abordagem para avaliarmos seus skills técnicos, vender seu peixe, mostrar-nos do que é capaz.