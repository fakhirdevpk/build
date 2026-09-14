// ============================================================
// STARTER.TS — Professional TypeScript Foundation
// Every major TypeScript feature demonstrated & labeled below.
// ============================================================

// ------------------------------------------------------------
// 1. PRIMITIVE TYPES
// ------------------------------------------------------------
const username: string = 'claud';
const age: number = 25;
const isActive: boolean = true;
const nothing: null = null;
const notDefined: undefined = undefined;
const big: bigint = 100n;
const sym: symbol = Symbol('id');


// ------------------------------------------------------------
// 2. ARRAYS & TUPLES
// ------------------------------------------------------------
const tags: string[] = ['landing', 'astro', 'scss'];
const scores: Array<number> = [10, 20, 30];

// Tuple — fixed length, fixed types per position
const point: [number, number] = [10, 20];
const entry: [string, number, boolean] = ['hero', 1, true];


// ------------------------------------------------------------
// 3. OBJECT TYPES & INTERFACES
// ------------------------------------------------------------
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;          // optional property
  readonly createdAt: Date; // can't be reassigned after creation
}

const user: User = {
  id: '1',
  name: 'Claud',
  email: 'claud@example.com',
  createdAt: new Date(),
};

// Interfaces can extend each other
interface Admin extends User {
  permissions: string[];
}


// ------------------------------------------------------------
// 4. TYPE ALIASES — like interfaces, but can alias any type
// ------------------------------------------------------------
type ID = string | number;               // union type
type Status = 'idle' | 'loading' | 'error' | 'success'; // string literal union

type Point = { x: number; y: number };   // object shape via type

// Interface vs type: interfaces are for object shapes and can be
// re-opened/merged; types can alias unions, primitives, tuples, etc.


// ------------------------------------------------------------
// 5. FUNCTIONS — typed params, return types, optional/default
// ------------------------------------------------------------
function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string, greeting: string = 'Hello'): string {
  return `${greeting}, ${name}!`;
}

function log(message: string, code?: number): void {
  console.log(code ? `[${code}] ${message}` : message);
}

// Arrow function with typed signature
const multiply = (a: number, b: number): number => a * b;

// Function type as a variable annotation
type MathOp = (a: number, b: number) => number;
const subtract: MathOp = (a, b) => a - b;


// ------------------------------------------------------------
// 6. GENERICS — reusable, type-safe across multiple types
// ------------------------------------------------------------
function identity<T>(value: T): T {
  return value;
}

interface ApiResponse<T> {
  data: T;
  error: string | null;
  loading: boolean;
}

const userResponse: ApiResponse<User> = {
  data: user,
  error: null,
  loading: false,
};

// Generic with constraint — T must have a "length" property
function logLength<T extends { length: number }>(item: T): void {
  console.log(item.length);
}


// ------------------------------------------------------------
// 7. ENUMS — named constant sets
// ------------------------------------------------------------
enum Role {
  Admin = 'ADMIN',
  Editor = 'EDITOR',
  Viewer = 'VIEWER',
}

const myRole: Role = Role.Admin;

// const enum — inlined at compile time, zero runtime overhead
const enum Direction {
  Up,
  Down,
  Left,
  Right,
}


// ------------------------------------------------------------
// 8. UNION & INTERSECTION TYPES
// ------------------------------------------------------------
type Loading = { status: 'loading' };
type Success = { status: 'success'; data: string };
type Failure = { status: 'error'; message: string };

// Union — discriminated union, narrowed via "status"
type FetchState = Loading | Success | Failure;

function render(state: FetchState) {
  if (state.status === 'success') {
    console.log(state.data); // TS knows "data" exists here
  }
}

// Intersection — combines multiple types into one
type Timestamped = { createdAt: Date };
type UserWithTimestamp = User & Timestamped;


// ------------------------------------------------------------
// 9. TYPE NARROWING — typeof, instanceof, in
// ------------------------------------------------------------
function formatValue(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}


// ------------------------------------------------------------
// 10. UTILITY TYPES — built-in type transformers
// ------------------------------------------------------------
type PartialUser = Partial<User>;        // all props optional
type RequiredUser = Required<User>;      // all props required
type UserPreview = Pick<User, 'id' | 'name'>; // only some props
type UserWithoutEmail = Omit<User, 'email'>;  // exclude some props
type ReadonlyUser = Readonly<User>;      // all props readonly
type UserRecord = Record<string, User>;  // dictionary of Users


// ------------------------------------------------------------
// 11. CLASSES — access modifiers, inheritance
// ------------------------------------------------------------
class Person {
  protected name: string;      // accessible in this class + subclasses
  private id: string;          // accessible only in this class
  public readonly createdAt: Date; // accessible everywhere, immutable

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
    this.createdAt = new Date();
  }

  greet(): string {
    return `Hi, I'm ${this.name}`;
  }
}

class Employee extends Person {
  constructor(name: string, id: string, public role: Role) {
    super(name, id);
  }

  describe(): string {
    return `${this.greet()}, working as ${this.role}`;
  }
}


// ------------------------------------------------------------
// 12. ASYNC / AWAIT — typed promises
// ------------------------------------------------------------
async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}


// ------------------------------------------------------------
// 13. TYPE ASSERTIONS — override inferred type (use sparingly)
// ------------------------------------------------------------
const inputEl = document.getElementById('name') as HTMLInputElement;


// ------------------------------------------------------------
// 14. MODULES — export / import
// ------------------------------------------------------------
export type { User, Admin, FetchState };
export { Role, Person, Employee, fetchUser };