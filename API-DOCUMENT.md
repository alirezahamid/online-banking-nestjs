### Signup

This route for Registering user through our banking system

POST request >> ``ENDPOINT:3000/auth/signup``

Body should be JSON

```json
{
    "email": "alireza@hamid.com",
    "fullName": "Alireza Hamid" ,
    "address": "1 House, Kingston Upon Thames, KT1 2**" ,
    "phoneNumber": "07700000000" ,
    "password": "123456"
}
```



### Signin

This route for Log in user through our banking system

POST request >> ``ENDPOINT:3000/auth/signin``

Body should be JSON

```json
{
    "email": "alireza@hamid.com",
    "password": "123456"
}
```



### Signout

This route for Sign out user from the banking system

POST request >> ``ENDPOINT:3000/auth/signout``

Body not required



### Transfer Money

This route for transfering money to another account by Account number and SortCode

POST request >> ``ENDPOINT:3000/transaction/transfer``

Body should be JSON

```json
{
    "accNum" : 89736598 ,
    "sortCode" : 736598,
    "amount": 15
}
```



