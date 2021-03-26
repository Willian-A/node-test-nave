# Teste Backend Nave.rs

### Como preparar o ambiente:
  1. Importar o arquivo Database.sql para a criação do Banco de Dados e suas Tabelas no MySQL.
  2. Importar o arquivo Insomnia.json no Insomnia para a criação das Rotas e suas documentações.
### Como fazer os testes no Insomnia:
  1. Cadastre um novo Usuario na rota Users/singup
  2. Faça o login como Usuario na rota Users/login
  * **OBS:** _Um Naver pode ser Cadastrado com ou sem Projetos, porém, caso queria cadastrar ele com Projetos, 
  é necessario cadastrar esse Projeto antes de cadastrar o Naver. Seguirei a Documentação presumindo que deseje cadastrar o Naver com Projetos._ 
  3. Cadastre um novo Projeto na rota Projetos/store.
  4. Cadastre um novo Naver na rota Navers/store.
  * Agora, você tem tudo o que precisa para testar as rotas **Index, Show, Update e Delete**.
  **_A documentação de cada Rota está no proprio Insomnia, caso tenha algum problema entre em contato._**

### Dificuldades 
  Desenvolver o Upadate dos Projetos de cada Naver. Modificar o Projeto em que aquele Naver está foi um problema o qual não consegui solucionar. 
  Um Naver pode estar em _**N**_ Projetos, o código começou a ficar muito extenso e complexo o que começou a causar uma confusão na lógica e quebrar o resto do projeto.
  Por causa dessa dificuldade, fiquei muito tempo tentando resolver o problema e acabei não tendo tempo para fazer a relação de Navers e Usuario 
  onde um Naver só pode ser modificado pelo Usuario que criou ele, mas isso seria feito de forma parecida com a implementação de relação entre Naver e Projeto feita
  no MySQL.
