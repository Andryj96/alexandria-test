# Desafio técnico para desenvolvedores

Construa uma nova aplicação usando NodeJS, que se conecte à [API do GitHub](https://docs.github.com/pt/rest/guides/getting-started-with-the-rest-api). Sua aplicação deve oferecer as seguintes funcionalidades:

- Rota para buscar e armazenar repositórios destacados de 5 linguagens à sua escolha;
- Rota para listar os repositórios encontrados;
- Rota para visualizar os detalhes de cada repositório;
- Rota para favoritar/desfavoritar repositórios, salvando a data, hora e IP usado para realizar a operação;
- Rota para listar os repositórios favoritados, mostrando a data e hora em que foram favoritados *no fuso horário do usuário* com base no ip utilizado no momento da consulta.

Alguns requisitos:

- A aplicação deve ser nova e disponibilizada em um repositório público do BitBucket;
- Crie um fork desse repositório;
- As informações devem ser armazenadas usando um banco de sua escolha (PostgreSQL, MySQL, SQL Server, etc);
- O deploy da aplicação deve ser realizado em um serviço de nuvem de sua escolha (Heroku, AWS, DigitalOcean, etc), e o link de acesso deve ser disponibilizado;
- A aplicação deve ter testes automatizados e preferencialmente ser dockerizada;
- O arquivo README deve conter um guia passo a passo para configurar o ambiente.

Quando terminar, faça um Pull Request neste repositório e avise-nos por email.

Lembre-se: não há certo ou errado, e se você não conseguir concluir o desafio, não tem problema. Explique o motivo e descreva suas dificuldades. Você também pode sugerir outra abordagem para avaliar suas habilidades técnicas, vender seu peixe, mostrar-nos do que é capaz. Boa sorte!