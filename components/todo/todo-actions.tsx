'use client';

import { Button } from '@/components/ui/button';
import { Calendar, Tag, Flag } from 'lucide-react';

export function TodoActions() {
  return (
    <div className="flex gap-2">
      <Button size="icon" variant="outline">
        <Calendar className="h-5 w-5" />
      </Button>
      <Button size="icon" variant="outline">
        <Tag className="h-5 w-5" />
      </Button>
      <Button size="icon" variant="outline">
        <Flag className="h-5 w-5" />
      </Button>
    </div>
  );
}