import { useEffect, useRef, useState } from 'react'
import { RefreshCw } from 'lucide-react'

interface PullToRefreshProps {
  onRefresh: () => void
  children: React.ReactNode
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const startYRef = useRef<number | null>(null)
  const lastYRef = useRef<number | null>(null)
  const isRefreshingRef = useRef(false)
  const THRESHOLD = 80 // 당기기 임계값

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const handleTouchStart = (e: TouchEvent) => {
      if (element.scrollTop <= 0) {
        startYRef.current = e.touches[0].clientY
        lastYRef.current = e.touches[0].clientY
        setIsPulling(true)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!startYRef.current || !lastYRef.current || isRefreshingRef.current) return

      const currentY = e.touches[0].clientY
      const deltaY = currentY - lastYRef.current
      lastYRef.current = currentY

      if (element.scrollTop <= 0) {
        e.preventDefault()
        const newDistance = Math.max(0, pullDistance + deltaY * 0.5)
        setPullDistance(newDistance)

        // 시각적 피드백 업데이트
        if (element.style) {
          element.style.transform = `translateY(${newDistance}px)`
        }
      }
    }

    const handleTouchEnd = async () => {
      if (!startYRef.current || isRefreshingRef.current) return

      if (pullDistance > THRESHOLD) {
        isRefreshingRef.current = true
        try {
          await onRefresh()
        } finally {
          isRefreshingRef.current = false
        }
      }

      // 리셋
      startYRef.current = null
      lastYRef.current = null
      setPullDistance(0)
      setIsPulling(false)

      // 애니메이션으로 원위치
      if (element.style) {
        element.style.transition = 'transform 0.3s ease-out'
        element.style.transform = 'translateY(0)'
        setTimeout(() => {
          element.style.transition = ''
        }, 300)
      }
    }

    element.addEventListener('touchstart', handleTouchStart, { passive: false })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('touchend', handleTouchEnd)

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onRefresh, pullDistance])

  return (
      <div
          ref={containerRef}
          className="relative min-h-screen overflow-auto"
          style={{
            WebkitOverscrollBehavior: 'none',
            overscrollBehavior: 'none'
          }}
      >
        {/* 리프레시 인디케이터 */}
        {isPulling && (
            <div
                className="absolute left-0 right-0 flex justify-center items-center"
                style={{
                  top: '16px',
                  transform: `translateY(${pullDistance}px)`,
                  opacity: Math.min(pullDistance / THRESHOLD, 1),
                }}
            >
              <RefreshCw
                  className={`w-6 h-6 text-gray-600 ${isRefreshingRef.current ? 'animate-spin' : ''}`}
                  style={{
                    transform: `rotate(${(pullDistance / THRESHOLD) * 360}deg)`
                  }}
              />
            </div>
        )}
        {children}
      </div>
  )
}