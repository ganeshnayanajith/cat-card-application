# Cat Card Application

## How to setup

1. Clone source code 


``` 
    git clone https://github.com/ganeshnayanajith/cat-card-application.git
``` 


2. Install project dependencies

```
    npm install
```

3. Start application locally

```
    npm run start 
```

Note - If you are running in DEV mode, you need to install nodemon globally

```
    npm install nodemon -g
```

### Example API request

```
    curl --location 'http://localhost:3000/api/cat/merge' \
    --header 'Content-Type: application/json' \
    --data '{
        "textForImageOne": "My",
        "textForImageTwo": "Kitties",
        "width": 400,
        "height": 500,
        "color": "Pink",
        "size": 500
    }'
```