# 📝 NOTES.md — Atividade CRUD com NestJS

## 👥 Integrantes
- João Marcos Azevedo Cruz – UC23100741 
- João Pedro Tavares – UC23100608
- João Victor Martins - UC23111040

---

## 🎬 Introdução
Aplicação desenvolvida com NestJS para implementar um CRUD completo das entidades **UF**, **Cidade** e **Estudante**, utilizando **TypeORM** com banco de dados **SQLite**. A proposta foi seguir boas práticas REST, implementar validações robustas com `class-validator` e aplicar relacionamentos corretos no banco.

---

## ⚙️ Criando o projeto

```bash
npm i -g @nestjs/cli
nest new nest-crud
cd nest-crud
npm install
npm run start:dev
```

---

## 🔧 Criando a API com o gerador de código

```bash
nest g resource uf --no-spec
nest g resource cidade --no-spec
nest g resource estudante --no-spec
```

> Selecionamos `Yes` para CRUD automático.

---

## ✅ Validação de dados

Habilitada globalmente com:

```ts
app.useGlobalPipes(new ValidationPipe());
```

Utilizamos:
- `@IsString()`, `@IsNotEmpty()` – campos obrigatórios
- `@IsEmail()`, `@IsDateString()` – campos específicos
- `@IsInt()` – números inteiros

---

## 🗃️ TypeORM e SQLite

Configuração no `app.module.ts`:

```ts
TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'banco.sqlite',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
}),
```

Relacionamentos:
- `UF` → `Cidade`: OneToMany
- `Cidade` → `UF`: ManyToOne
- `Cidade` → `Estudante`: OneToMany
- `Estudante` → `Cidade`: ManyToOne

---

## 💉 Injeção de dependência

```ts
constructor(
  @InjectRepository(Uf)
  private readonly ufRepository: Repository<Uf>,
) {}
```

Também aplicamos para `Cidade` e `Estudante`.

---

## 🧠 Lógica nas Services

- `Cidade`: recebe `nomeUf` e busca a UF correspondente
- `Estudante`: recebe `nomeCidade` e busca a cidade correspondente
- Tratamento de duplicidade de matrícula com `ConflictException`
- Busca por `nome` nas 3 entidades

---

## 🧪 Boas práticas REST

- DTOs organizados e validados
- Controllers com separação de responsabilidades
- Retorno de erros amigáveis
- Códigos HTTP adequados (ex: 409, 404)
- Integração com Swagger:

```ts
const config = new DocumentBuilder()
  .setTitle('API de Estudantes, Cidades e UFs')
  .setDescription('Documentação da API')
  .setVersion('1.0')
  .build();
```

---

## 🔜 Próximos passos

- Implementar filtros e paginação nas listagens para melhorar a navegação e performance
- Adicionar funcionalidade de exportação de dados (CSV, Excel, etc.)
- Integrar um banco de dados mais robusto para maior escalabilidade

---

## 🎯 Desafio!

- Adicionar busca por nome em todas as entidades
- Tratar erros de banco com mensagens personalizadas
- Aplicar validações nos dados de entradas
- Melhorar a documentação com o Swagger
