## Instalação e Iniciar Ambiente de Desenvolvimento

Siga os passos abaixo para instalar e configurar o projeto em sua máquina local.

### Pré-requisitos

Antes de começar, verifique se você tem os seguintes pré-requisitos instalados:

- [Python](https://www.python.org/downloads/) (versão 3.8 ou superior)
- [pip](https://pip.pypa.io/en/stable/) (geralmente instalado com o Python)
- [Virtualenv](https://virtualenv.pypa.io/en/latest/) (opcional, mas recomendado)

### Passos para Instalação

1. **Clone o repositório**

   Abra o terminal e execute o seguinte comando para clonar o repositório:

   ```bash
   git clone https://github.com/ufoxy/zmovies

2. **Navegue até o diretório do projeto**

   ```bash
   $ cd backend

3. **Crie um ambiente virtual**

   ```bash
   $ npm install

3. **Ative o ambiente virtual**

   No Windows

   ```bash
   $ venv\Scripts\activate
   ```

   No macOS/Linux

   ```bash
   $ source venv/bin/activate
   ```

3. **Instale as dependências**

   ```bash
   $ pip install -r requirements.txt

### Passos para Iniciar o Ambiente de Desenvolvimento

1. **Inicie o projeto**

   Após fazer os passos da instalação apenas inicie o projeto:

   ```bash
   $ python manage.py migrate

## Como Testar?

### O Projeto Backend tem Hospedagem na Vercel.

1. **Acesso**

   Entre pelo link do deploy e acesse o projeto.

   ```bash
   https://zmovies-backend.vercel.app/api/movies/?search=inception
   ```

   Se você deseja testar a API pelo projeto em sua máquina local, quando iniciar o projeto acesse:
   
   ```bash
   http://127.0.0.1:8000/api/movies/?search=Inception&page=1
   ```

3. **Como utilizar a API?**

   A API tem 1 parâmetro obrigatório, o 'search' ou apenas 's', que deverá ser informado o nome do filme, série ou episódio. E 2 parâmetros opcionais, uma informando a página utilizando o 'page' que retorna apenas 5 resultados da busca, conforme vai passando as páginas ele vai mostrando mais resultados com aquela pesquisa, e o último parâmetro é o ano do filme, série ou episódio, utilizado como 'year'. <br><br>Exemplo:

   ```bash
   https://zmovies-backend.vercel.app/api/movies/?search=inception&year=2010&page=1


