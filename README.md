### endpoints:

> Cadastrar carro
````bash
POST / HTTP/1.1
Host: localhost:3333
Content-Type: application/json
Content-Length: 171

{ 
    "name": "KA", 
    "brand": "Ford", 
    "description": "tipo nacional",
    "daily_rate": 1000, 
    "available": true, 
    "license_plate": "fhtlgkjdhsçsmm456"
}
````

> Listar carros
````bash
GET / HTTP/1.1
Host: localhost:3333
````

