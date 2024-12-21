'use client';

import { useState } from 'react';
import { Plus, Calendar, Tag as TagIcon, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TodoItem } from '@/components/todo/todo-item';
import { Todo, Tag, Priority } from '@/lib/types';
import { TodoActions } from '@/components/todo/todo-actions';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [tags, setTags] = useState<Tag[]>([
    { id: '1', name: 'Work', color: '#ef4444' },
    { id: '2', name: 'Personal', color: '#3b82f6' },
    { id: '3', name: 'Shopping', color: '#10b981' },
  ]);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    setTodos([
      ...todos,
      {
        id: Math.random().toString(36).substring(7),
        text: newTodo,
        completed: false,
        priority: 'medium',
        tags: [],
      },
    ]);
    setNewTodo('');
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 relative">
          <Input
            placeholder="Add a task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            className="pl-12 h-12 text-lg"
          />
          <Plus className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <TodoActions />
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            tags={tags}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
            onUpdate={(updates) => updateTodo(todo.id, updates)}
          />
        ))}
      </div>
    </div>
  );
}