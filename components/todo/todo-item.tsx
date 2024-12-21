'use client';

import { Trash2, MoreHorizontal, Calendar, Flag, Tag as TagIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Todo, Tag } from '@/lib/types';
import { TodoItemMenu } from '@/components/todo/todo-item-menu';
import { format } from 'date-fns';

interface TodoItemProps {
  todo: Todo;
  tags: Tag[];
  onToggle: () => void;
  onDelete: () => void;
  onUpdate: (updates: Partial<Todo>) => void;
}

export function TodoItem({ todo, tags, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const priorityColors = {
    low: 'text-green-500',
    medium: 'text-yellow-500',
    high: 'text-red-500',
  };

  return (
    <div className="group flex items-center gap-3 p-4 rounded-lg bg-card hover:bg-accent/50 transition-colors">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={onToggle}
        className="h-5 w-5"
      />
      <div className="flex-1 space-y-1">
        <span className={todo.completed ? 'line-through text-muted-foreground' : ''}>
          {todo.text}
        </span>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {todo.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(todo.dueDate, 'MMM d')}
            </div>
          )}
          {todo.priority && (
            <div className={`flex items-center gap-1 ${priorityColors[todo.priority]}`}>
              <Flag className="h-3 w-3" />
              {todo.priority}
            </div>
          )}
          {todo.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <TagIcon className="h-3 w-3" />
              {todo.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-1.5 py-0.5 rounded-full text-xs"
                  style={{ backgroundColor: tag.color + '20', color: tag.color }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="h-8 w-8 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <TodoItemMenu todo={todo} tags={tags} onUpdate={onUpdate} />
      </div>
    </div>
  );
}