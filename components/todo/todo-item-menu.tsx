'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { MoreHorizontal, Calendar as CalendarIcon, Flag, Tag } from 'lucide-react';
import { Todo, Tag as TagType, Priority } from '@/lib/types';

interface TodoItemMenuProps {
  todo: Todo;
  tags: TagType[];
  onUpdate: (updates: Partial<Todo>) => void;
}

export function TodoItemMenu({ todo, tags, onUpdate }: TodoItemMenuProps) {
  const priorities: Priority[] = ['low', 'medium', 'high'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Flag className="mr-2 h-4 w-4" />
            <span>Priority</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={todo.priority}
              onValueChange={(value) => onUpdate({ priority: value as Priority })}
            >
              {priorities.map((priority) => (
                <DropdownMenuRadioItem key={priority} value={priority}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Tag className="mr-2 h-4 w-4" />
            <span>Tags</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {tags.map((tag) => (
              <DropdownMenuItem
                key={tag.id}
                onClick={() => {
                  const newTags = todo.tags.some(t => t.id === tag.id)
                    ? todo.tags.filter(t => t.id !== tag.id)
                    : [...todo.tags, tag];
                  onUpdate({ tags: newTags });
                }}
              >
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: tag.color }}
                />
                {tag.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start pl-2"
              role="menuitem"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Due Date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={todo.dueDate}
              onSelect={(date) => onUpdate({ dueDate: date })}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}