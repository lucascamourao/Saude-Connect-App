# Saúde Connect

Saúde Connect é um aplicativo desenvolvido para dispositivos Android e iOS utilizando React Native e Django. O objetivo do aplicativo é auxiliar os usuários a encontrar postos de saúde próximos, relatar faltas de medicamentos ou serviços e acessar informações de saúde de maneira eficiente.

## Funcionalidades

- **Geolocalização:** O aplicativo utiliza a localização do usuário para fornecer informações sobre os postos de saúde mais próximos, agilizando o acesso a serviços de saúde.
- **Relato de Faltas:** Usuários podem relatar a falta de medicamentos ou serviços específicos nos postos de saúde, contribuindo para a melhoria dos serviços de saúde na região.
- **Lista de Postos de Saúde:** Exibe uma lista de postos de saúde com nome, descrição e localização.
- **Busca:** Possui uma barra de busca para facilitar a localização de postos de saúde específicos.

## Tecnologias Utilizadas 💻

- **Front-end:** React Native (Typescript e Javascript)
- **Back-end:** Django
- **Mapa de Geolocalização:** Integração com serviços de mapas para exibição de postos de saúde próximos.

## Instalação

### Pré-requisitos

- Node.js
- Python 3.x
- React Native CLI
- Django

### Passos para Instalação

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/saude-connect.git
    cd saude-connect
    ```

2. **Instale as dependências do front-end:**

    ```bash
    cd frontend
    npm install
    ```

3. **Instale as dependências do back-end:**

    ```bash
    cd ../backend
    pip install -r requirements.txt
    ```

4. **Configure as variáveis de ambiente e o banco de dados no back-end.**

5. **Inicie o servidor Django:**

    ```bash
    python manage.py runserver
    ```

6. **Inicie o aplicativo React Native:**

    ```bash
    cd ../frontend
    npx react-native run-android  # Para Android
    npx react-native run-ios      # Para iOS
    ```

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir com o projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para a sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Apache License 2.0. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
