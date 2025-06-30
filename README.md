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
