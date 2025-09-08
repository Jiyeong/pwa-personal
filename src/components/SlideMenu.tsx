import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import {useLanguage} from "@/contexts/LanguageContext.tsx"
import type { MenuItem } from '@/types/menu'


interface SlideMenuProps {
  isOpen: boolean
  onClose: () => void
  menuItems: MenuItem[]
  currentPath?: string
}

export function SlideMenu({ isOpen, onClose, menuItems, currentPath = '/' }: SlideMenuProps) {
  const { translate } = useLanguage()

  return (
      <>
        {/* 오버레이 */}
        <div
            className={cn(
                "fixed inset-0 bg-black/50 transition-opacity z-[100]", // z-index 증가
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={onClose}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        />

        {/* 슬라이드 메뉴 */}
        <div
            className={cn(
                "fixed top-0 left-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[101]", // z-index 증가
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}
            style={{ position: 'fixed' }}
        >
          {/* 메뉴 헤더 */}
          <div className="sticky top-0 flex items-center justify-between p-4 border-b bg-white">
            <h2 className="text-lg font-semibold flex items-center gap-2">
            <Menu className="w-5 h-5" />
              {translate("메뉴","Menu")}
            </h2>
            <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 메뉴 내용 */}
          <div className="overflow-y-auto h-[calc(100vh-64px)]">
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPath === item.href

                return (
                    <a
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                            isActive
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-700 hover:bg-gray-100"
                        )}
                    >
                      <Icon className={cn(
                          "w-5 h-5",
                          isActive ? "text-blue-600" : "text-gray-500"
                      )} />
                      <span className="font-medium">{item.label}</span>
                    </a>
                )
              })}
{/*              <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                <Star className="w-5 h-5" />
                <span>메뉴 항목 1</span>
              </a>
              <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                <Star className="w-5 h-5" />
                <span>메뉴 항목 2</span>
              </a>
              <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                <Star className="w-5 h-5" />
                <span>메뉴 항목 3</span>
              </a>
              <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                <Star className="w-5 h-5" />
                <span>메뉴 항목 4</span>
              </a>
              <a href="#" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                <Star className="w-5 h-5" />
                <span>메뉴 항목 5</span>
              </a>*/}
            </nav>
          </div>
        </div>
      </>
  )
}