# ZMovies 🎬

Este projeto foi criado para demonstrar minhas habilidades técnicas durante o processo seletivo do programa de estágio da Zandir. (ZLabs)

Se você é um avaliador ou avaliadora da Zandir, seja bem-vindo ao meu projeto, fique a vontade para testar todas a funcionalidades. Durante essa documentação tentarei explicar ao máximo como funciona cada pedacinho do projeto.

Gostaria de aproveitar este momento para agradecer sinceramente pela oportunidade de trabalhar em um projeto tão bacana durante o processo de seleção. Independentemente do resultado, essa experiência me desafiou e me ajudou a desenvolver ainda mais minhas habilidades. Foi gratificante explorar novas ideias e aprender ao longo do caminho. Agradeço de coração pela chance de me aprimorar!

## Índice

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Visualização](#visualização)
- [Instalação](#instalação)

## Sobre

O projeto foi iniciado dia 30/10/2024 e concluído dia 01/11/2024.

Durante 3 dias de desenvolvimento tive exito na maioria dos requisitos solicitados, inclusive opcionais. Entretanto, citarei alguns requisitos que não cumpri e o porquê em 'observações'. 

Observações: 

1. Não utilizei o SHADCN na criação de componentes pois vi que demoraria para aprender a utilizar a biblioteca com o tempo curto para criação, então optei por utilizar modelos prontos de componentes disponíveis na internet.
2. Os dados recebidos não estão sendo salvo no banco de dados local do Django, pois o vercel (plataforma em que hospedei o backend) não aceita databases locais, apenas os externos com o uso de PostgreSQL e MySQL, e isso ia além do escopo do projeto, então decidi não continuar com a implementação desse requisito.
3. Confesso que a responsividade da página não está 100%. Em dispositivos mobile e desktop podem estar funcionando normalmente, mas em tablet e alguns celulares em específico podem não rodar como deveria. Resolver isso não seria um problema, mas pelo prazo curto foi entregue como está.

O projeto foi desenvolvido em uma estrutura monorepo, onde todo o código-fonte está organizado em um único repositório para facilitar o gerenciamento.

Nas duas partes do projeto, tanto na pasta do frontend quanto no backend, eu explico em detalhes como cada uma pode ser testada.

## Tecnologias

As principais tecnologias utilizadas neste projeto incluem:

Frontend: JavaScript, React, Redux <br>

[![My Skills](https://skillicons.dev/icons?i=js,react,redux)](https://skillicons.dev)

Backend: Python, Django <br>

[![My Skills](https://skillicons.dev/icons?i=python,django)](https://skillicons.dev)

## Visualização

![Screenshot do Projeto](https://media.discordapp.net/attachments/1097323194874073198/1302086130652545104/zmovie_screenshot.png?ex=6726d5b5&is=67258435&hm=47d4298e1feca70090ed4e5c21f6bfea8f60fe35560317d097bbe93f4d8272b4&=&format=webp&quality=lossless&width=1920&height=1080)

## Instalação

Siga os passos abaixo para instalar e configurar o projeto em sua máquina local.

### Pré-requisitos

Antes de começar, verifique se você tem os seguintes pré-requisitos instalados:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)
- [Git](https://git-scm.com/) (opcional, se você for clonar o repositório)

### Passos para Instalação

1. **Clone o repositório**

   Abra o terminal e execute o seguinte comando para clonar o repositório:

   ```bash
   git clone https://github.com/ufoxy/zmovies
