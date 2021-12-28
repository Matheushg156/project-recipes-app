# Projeto App de Receitas!

Esse projeto foi desnvolvido em grupo no curso de Desenvolvimento de Software Web da Trybe. O objetivo foi desenvolver um app de receitas, utilizando o que há de mais moderno dentro do ecossistema React: Hooks e Context API!

Nesse app é possível ver, buscar, filtrar, favoritar e acompanhar o processo de preparação de receitas e drinks!

A base de dados são 2 APIs distintas, uma para comidas e outra para bebidas.

O layout tem como foco dispositivos móveis, então todos os protótipos vão estar desenvolvidos em telas menores.

<div>
  <img src="./GifComidas1.gif" width="360" height="640" />
  <img src="./GifBebidas.gif" width="360" height="640" />
</div>

---

# Tecnologias usadas

Nesse projeto, utilizamos:

  - Context API do _React_ para gerenciar estado
  - _React Hook useState_
  - _React Hook useContext_
  - _React Hook useEffect_
  - _CSS3_

---

# Instruções para rodar o projeto no seu computador

### Instalando Dependências:

1. Clone o repositório
  * `git clone git@github.com:Matheushg156/project-recipes-app.git`
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd sd-014-b-project-recipes-app`

2. Instale as dependências e inicialize o projeto
  * Instale as dependências:
    * `npm install`
  * Inicialize o projeto:
    * `npm start` (uma nova página deve abrir no seu navegador com a página de login)
  * Configure o tamanho da tela para visualizar o projeto:
    * Clique com o botão direito do mouse na tela do proje e selecione "inspecionar"
    * Na parte superior da tela clique na caixa de texto e digite os tamanhos: 360 e 640
    * Aperte a tecla enter e veja a mudança no estilo do projeto


## APIs

### TheMealDB API

O [TheMealDB](https://www.themealdb.com/) é um banco de dados aberto, mantido pela comunidade, com receitas e ingredientes de todo o mundo.

Os end-points são bastante ricos, você pode [vê-los aqui](https://www.themealdb.com/api.php)


### The CockTailDB API

Bem similar (inclusive mantida pela mesma entidade) a TheMealDB API, só que focado em bebidas.

Os end-points também são bastante ricos, você pode [vê-los aqui](https://www.thecocktaildb.com/api.php)


---
