
# Saúde Connect

O **Saúde Connect** é um aplicativo desenvolvido em React Native e Django, projetado para ajudar os usuários a encontrar unidades de saúde próximas, reportar faltas e acessar serviços de saúde de forma eficiente.

## Funcionalidades

- **Busca de Unidades de Saúde:** Pesquise e visualize unidades de saúde próximas.
- **Geolocalização:** Acesse um mapa que mostra sua localização e as unidades de saúde nas proximidades.
- **Registro de Faltas:** Informe sobre faltas em unidades de saúde.
- **Interface Amigável:** Navegação intuitiva com design responsivo.

## Tecnologias Utilizadas

- **Frontend:** React Native
- **Backend:** Django
- **Banco de Dados:** -
- **Autenticação:** -
- **Mapas:** react-native-maps

## Pré-requisitos

- Node.js
- Expo CLI
- Python
- Django
- PostgreSQL

## Instalação

1. Clone o repositório do frontend:
   ```bash
   git clone https://github.com/lucascamourao/saude-connect.git
   cd saude-connect
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Clone o repositório do backend:
   ```bash
   git clone https://github.com/augustogpauladev/saude-connect-backend.git
   cd saude-connect-backend
   ```

4. Instale as dependências do backend:
   ```bash
   pip install -r requirements.txt
   ```

5. Execute as migrações do banco de dados:
   ```bash
   python manage.py migrate
   ```

6. Inicie o servidor do backend:
   ```bash
   python manage.py runserver
   ```

7. Inicie o aplicativo React Native:
   ```bash
   npm start
   ```

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Link do Backend

Para mais informações sobre o backend, acesse o repositório: [saude-connect-backend](https://github.com/augustogpauladev/saude-connect-backend)
