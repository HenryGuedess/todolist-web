import { TodoList } from '@/components/todo/todo-list';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold">TaskFlow</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="container mx-auto py-8">
        <TodoList />
      </main>
    </div>
  );
}