import { useState } from 'react'
import { Star } from 'lucide-react'
import { SlideMenu } from './SlideMenu'
import { menuItems } from '@/data/menuItems'
// import { useLocation } from 'react-router-dom'


export function MenuButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // const location = useLocation() // React Router를 사용하는 경우

  return (
    <>
      <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
      >
        <Star className="w-6 h-6 text-gray-800" />
      </button>

      <SlideMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          menuItems={menuItems}
          currentPath={location.pathname}
      />
    </>
  )
}