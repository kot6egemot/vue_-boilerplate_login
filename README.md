Vue Js Authentication с browser fingerprint.
Реализует 2 роута 
    1) роут /login с формой входа login/password.
    2) роут / корень сайта для аутентифицированных пользователей.

Эндпоинты на серверный стороне
    1) /auth/login, POST
        request => {login, password}
        response = {access_token, refresh_token} 
    2) /auth/refresh_tokens, POST
        request => {refresh_token, fingerprint}
        response = {access_token, refresh_token}   
    3) /auth/logout
        request = {} 
        response = {}

```
npm install
npm run serve
npm run build
npm run lint
```

