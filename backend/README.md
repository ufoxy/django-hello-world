## Como Testar?

### O Projeto Backend tem Hospedagem na Vercel.

1. **Acesso**

   Entre pelo link do deploy e acesse o projeto.

   ```bash
   https://zmovies-backend.vercel.app/api/movies/?search=inception

2. **Como utilizar a API?**

   A API tem 1 parâmetro obrigatório, o 'search' ou apenas 's', que deverá ser informado o nome do filme, série ou episódio. E 2 parâmetros opcionais, uma informando a página utilizando o 'page' que retorna apenas 5 resultados da busca, conforme vai passando as páginas ele vai mostrando mais resultados com aquela pesquisa, e o último parâmetro é o ano do filme, série ou episódio, utilizado como 'year'. <br><br>Exemplo:

   ```bash
   https://zmovies-backend.vercel.app/api/movies/?search=inception&year=2010&page=1


