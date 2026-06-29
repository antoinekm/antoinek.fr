import { Technology } from "src/types";

import {
  ReactLogo,
  SymfonyLogo,
  TypescriptLogo,
  GoLangLogo,
  GraphQLLogo,
  LaravelLogo,
  PythonLogo,
  FastifyLogo,
  NextLogo,
  JavaLogo,
  NestLogo,
  DockerLogo,
  MongoDBLogo,
  RedisLogo,
  MySQLLogo,
  RustLogo,
  AstroLogo,
  McpLogo,
  NostrLogo,
  IpfsLogo,
} from "../components/Icons";

export const technologies: Technology[] = [
  // Languages
  {
    color: "#007acc",
    icon: TypescriptLogo,
    name: "TypeScript",
    type: "JavaScript Framework",
    useCase: "Types for JavaScript, which will save your life when projects expand.",
  },
  {
    color: "#dea584",
    icon: RustLogo,
    name: "Rust",
    type: "Backend, System",
    useCase:
      "A language empowering everyone to build reliable and efficient software.",
  },
  {
    color: "#00acd7",
    icon: GoLangLogo,
    name: "Go",
    type: "Backend, System",
    useCase:
      "It makes it easy to build simple, reliable, and efficient software.",
  },
  {
    color: "#1e2933",
    icon: PythonLogo,
    name: "Python",
    type: "Backend, System",
    useCase: "Work quickly and integrate systems more effectively.",
  },
  {
    color: "#fff",
    icon: JavaLogo,
    name: "Java",
    type: "Backend, System",
    useCase:
      "It makes it easy to build simple, reliable, and efficient software.",
  },
  // Platforms
  {
    color: "#003f8c",
    icon: DockerLogo,
    name: "Docker",
    type: "Containerization",
    useCase:
      "Set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.",
  },
  // Databases
  {
    color: "#023430",
    icon: MongoDBLogo,
    name: "MongoDB",
    type: "Database",
    useCase:
      "Document-based, distributed database built for modern application developers and for the cloud era.",
  },
  {
    color: "#3E6E93",
    icon: MySQLLogo,
    name: "MySQL",
    type: "Database",
    useCase: "Relational database, used for storing data in tables.",
  },
  {
    color: "#161F31",
    icon: RedisLogo,
    name: "Redis",
    type: "Database",
    useCase:
      "In-memory data structure store, used as a database, cache and message broker.",
  },
  // Libraries
  {
    color: "#232340",
    icon: ReactLogo,
    name: "React",
    type: "Frontend library",
    useCase:
      "Constructing stateful and durable frontends for large and interactive web apps.",
  },
  {
    color: "#000",
    icon: FastifyLogo,
    name: "Fastify",
    type: "Backend library",
    useCase: "Extremely fast and simple, low-overhead framework to build APIs.",
  },
  {
    color: "#171e26",
    icon: GraphQLLogo,
    name: "GraphQL",
    type: "Query language",
    useCase:
      "Query language for APIs and a runtime for fulfilling those queries with your existing data.",
  },
  // Frameworks
  {
    color: "#000",
    icon: NextLogo,
    name: "Next.js",
    type: "React Framework",
    useCase:
      "Next.js is a React framework that provides an easy way to build static and server-rendered applications.",
  },
  {
    color: "#881abd",
    icon: AstroLogo,
    name: "Astro",
    type: "Web Framework",
    useCase:
      "A modern framework for building fast, content-focused websites with less client-side JavaScript.",
  },
  {
    color: "#181a1c",
    icon: NestLogo,
    name: "NestJS",
    type: "Node.js Framework",
    useCase:
      "A progressive Node.js framework for building efficient, reliable and scalable server-side applications.",
  },
  {
    color: "#FF2D20",
    icon: LaravelLogo,
    name: "Laravel",
    type: "PHP Framework",
    useCase:
      "PHP Framework for Web Artisans, with expressive and elegant syntax.",
  },
  {
    color: "#18171b",
    icon: SymfonyLogo,
    name: "Symfony",
    type: "PHP Framework",
    useCase: "High Performance PHP Framework for Web Development.",
  },
  {
    color: "#65C2CB",
    icon: IpfsLogo,
    name: "IPFS",
    type: "Protocol",
    useCase:
      "Peer-to-peer distributed file system that aims to make the web faster, safer, and more open.",
  },
  {
    color: "#A915FF",
    icon: NostrLogo,
    name: "Nostr",
    type: "Protocol",
    useCase:
      "Decentralized social networking protocol for censorship-resistant and privacy-focused communications.",
  },
  {
    color: "#5C2D91",
    icon: McpLogo,
    name: "MCP",
    type: "Protocol",
    useCase:
      "Model Context Protocol enabling AI applications to interact with external tools, data sources and systems.",
  },
];
