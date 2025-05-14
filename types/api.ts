// Базовый интерфейс для всех записей в таблице Books
export interface BaseItem {
  id: number;
  desc: string;
  type: number;
  parent: number | null; // parent может быть null для корневых элементов
}

// Интерфейс для книг и разделов, включая дочерние элементы
export interface Book extends BaseItem {
  children?: Book[]; // children присутствует только в ответах от /api/books/:id
}

// Интерфейс для хадисов (type == 1000)
export interface Hadith extends BaseItem {
  type: 1000; // Хадисы всегда имеют type == 1000
}

// Интерфейс для элементов хлебных крошек
export interface BreadcrumbItem {
  id: number;
  desc: string;
  parent: number | null; // parent может быть null для корневых элементов
}
