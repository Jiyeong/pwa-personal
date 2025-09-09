// data/menuItems.ts
import { Home, ListTodo, Settings, HelpCircle, Star, LayoutDashboard } from 'lucide-react'
import type { MenuItem } from '@/types/menu'

export const menuItems: MenuItem[] = [
  {
    icon: Home,
    label: '홈',
    href: '/'
  },
  {
    icon: LayoutDashboard,
    label: '대시보드',
    href: '/dashboard'
  },
  {
    icon: ListTodo,
    label: '할 일 목록',
    href: '/todos'
  },
  {
    icon: Star,
    label: '즐겨찾기',
    href: '/favorites'
  },
  {
    icon: Settings,
    label: '설정',
    href: '/settings'
  },
  {
    icon: HelpCircle,
    label: '도움말',
    href: '/help'
  }
]