## 📦 API de Entregas de Encomendas

---

#### Iniciando o projeto

- `npm init -y`

  - Este comando cria um arquivo package.json em seu diretório raiz, que é essencial para gerenciar as dependências e scripts do seu projeto. O flag -y aceita todas as opções padrão, tornando o processo mais rápido.

- `npm i express`

  - Instala o Express.js, um framework web minimalista e flexível para Node.js que fornece um conjunto robusto de recursos para o desenvolvimento de aplicações web e APIs.

- `npm i @types/express`

  - instala as definições de tipo (types) para o Express.js.

- `npm i typescript @types/node -D`

  - Instala o TypeScript, o superset de JavaScript que adiciona tipagem estática, e também as definições de tipo para o Node.js.

- `npm i tsx -D`

  - Instala o tsx, uma ferramenta que permite executar arquivos TypeScript diretamente sem a necessidade de compilá-los previamente para JavaScript

- `npx tsc --init`

  - Este comando cria o arquivo tsconfig.json na raiz do seu projeto. Este arquivo contém todas as opções de configuração para o compilador TypeScript (TSC)

#### tsconfig.json:

```javascript
{
  "compilerOptions": {
    "target": "ES2022", // Define a versão do ECMAScript para a qual o código será compilado. "ES2022" garante suporte a recursos modernos do JavaScript.
    "lib": ["ES2023"], // Especifica as bibliotecas que estarão disponíveis no ambiente de execução. "ES2023" inclui features mais recentes.

    "paths": {
      // Permite criar aliases para caminhos de módulos, facilitando importações absolutas.
      // Por exemplo, "@/*": ["./src/*"] permite importar "import { x } from '@/modules/x'" em vez de "import { x } from '../../src/modules/x'".
      "@/*": ["./src/*"]
    },

    "module": "node16", // Define o sistema de módulos a ser usado. "node16" é recomendado para versões modernas do Node.js.
    "esModuleInterop": true, // Habilita a interoperabilidade entre módulos CommonJS e ES Modules, permitindo "import x from 'y'" para módulos CommonJS.
    "forceConsistentCasingInFileNames": true, // Garante que as importações e referências a arquivos sigam a mesma capitalização para evitar problemas em sistemas de arquivos case-sensitive/insensitive.

    "strict": true, // Habilita todas as opções rigorosas de verificação de tipo do TypeScript para garantir um código mais seguro e robusto.
    "skipLibCheck": true // Ignora a verificação de tipo em todos os arquivos de declaração (.d.ts) das bibliotecas, acelerando a compilação e evitando erros de tipo em bibliotecas de terceiros.
  }
}
```

---

#### Tratando exceptions

- `npm i express-async-errors`

  - Este pacote estende o Express para permitir que erros assíncronos (erros lançados dentro de funções async em rotas) sejam capturados pelo middleware de tratamento de erros padrão do Express. Sem ele, esses erros poderiam travar a aplicação, pois não seriam propagados corretamente.

- `npm i zod`
  - Zod é uma biblioteca de validação de esquemas TypeScript-first. Ela permite definir a forma dos seus dados (objetos, strings, números, etc.) e validar se os dados recebidos (por exemplo, no corpo de uma requisição) correspondem a essa forma. Isso é crucial para garantir a integridade dos dados que sua API processa e retorna.

* Criando middleware exemplo (error-handling.ts)

```javascript
import { AppError } from '@/utils/AppError'; // Importa nossa classe de erro personalizada
import { NextFunction, Request, Response } from 'express'; // Tipos do Express para o middleware

import { ZodError } from 'zod'; // Tipo de erro específico do Zod para validação

export function errorHandling(
  error: any, // O erro que foi capturado
  request: Request, // Objeto de requisição do Express
  response: Response, // Objeto de resposta do Express
  next: NextFunction, // Função para passar o controle para o próximo middleware (se houver)
) {
  // Verifica se o erro é uma instância da nossa classe de erro personalizada 'AppError'.
  // Estes são erros de negócio esperados, como "usuário não encontrado" ou "dados inválidos".
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  // Verifica se o erro é uma instância de 'ZodError', indicando um problema de validação de dados.
  // Isso acontece quando os dados de entrada não correspondem ao esquema Zod definido.
  if (error instanceof ZodError) {
    return response.status(400).json({
      message: 'validation error', // Mensagem genérica para erros de validação
      issues: error.format(), // Detalhes formatados do erro de validação fornecidos pelo Zod
    });
  }

  // Se o erro não for nem 'AppError' nem 'ZodError', trata-se de um erro inesperado do servidor.
  // Retorna um status 500 (Internal Server Error) com a mensagem do erro.
  // Em produção, é aconselhável logar o erro completo e retornar uma mensagem mais genérica ao cliente.
  return response.status(500).json({ message: error.message });
}
```

- Class auxiliar para error (AppError.ts)

```javascript
export class AppError {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
```

---

#### Exemplo docker-compose (postgresql)

- docker-compose.yml

```yml
services:
  posgres:
    image: 'bitnami/postgresql:latest'
    ports:
      - '5432:5432'
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: rocketlog
```

---

#### Prisma

- `npm i prisma -D`

  - Instala o prisma em modo dev

- `npx prisma init --datasource-provider postgresql`
  - Inicia as configurações do prisma orm com postgresql

* Após iniciar a config acima é criado a pasta prisma e o file .env
  - Exemplo arquivo .env
    ```javascript
    DATABASE_URL=postgresql://postgres:postgres@localhost:5434/rocketlog?schema=public
    ```
  * Exemplo package.json(script) para garantir carregar o .env
  ```javascript
    "scripts": {
      "dev": "tsx watch --env-file .env ./src/server.ts"
    },
  ```
* Executando a migration com as tabelas

  - `npx prisma migrate dev`

* Executando prisma studio
  - `npx prisma studio`

---

#### Bcrypt

- `npm i bcrypt`
- `npm i @types/bcrypt -D`

Exemplo:

```javascript
const hashPassword = await hash(password, 8);

console.log(hashPassword); // out: $2b$08$WsoacHRifyFpUY0sdhSI3Ov29nGCvsNkcVd8buK7MFJ00KRQTmO96
```

---

#### JWT

- `npm i jsonwebtoken`
- `npm i @types/jsonwebtoken`

Exemplo:

- authConfig:

```javascript
export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '1d',
  },
};
```

- .env
  `JWT_SECRET=mysecret`

---

#### Autenticação / Autorização

- Mesclando a interface Request do express

```javascript
declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}
```

- middleware Autenticação

```javascript
import { authConfig } from '@/configs/auth';
import { AppError } from '@/utils/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  role: string;
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('JWT token not found', 401);
    }

    const [, token] = authHeader.split(' ');
    const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as TokenPayload;

    request.user = {
      id: user_id,
      role,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}
```

- Automatizando token no insomnia

  - ctrl + espaço e escolher `Response Body Attribute`
  - Escolher a Request onde está o 'login' que responde com token
  - Em filter colocar `$` para listar o payload
    - Exemplo `$.token` para retornar apenas o token

- middleware Autorização

```javascript
import { AppError } from '@/utils/AppError';
import { NextFunction, Request, Response } from 'express';

export function verifyUserAuthorization(role: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) {
      throw new AppError('Unauthorized', 401);
    }

    if (!role.includes(request.user.role)) {
      throw new AppError('Unauthorized', 401);
    }

    return next();
  };
}
```

---

#### Testes

- `npm i jest @types/jest ts-jest@ -D`
- `npm i supertest @types/supertest -D `
- `npm i ts-node -D`

- Configurando o Jest
  - `npx jest --init `

---

#### Build

- `npm i tsup -D `

  - O tsup é um empacotador (bundler) de projetos TypeScript e JavaScript. Ele é usado para compilar e empacotar o código de forma rápida e simples

- package.json, exemplo script de build
  - `"build": "tsup src"`
  - `"build": "tsup src --out-dir build"`
    - Alterando o nome padrão de 'dist' para 'build'
